from django.contrib.auth.models import Permission
from django.shortcuts import get_object_or_404

from users.serializers import PermissionSerializer, UserSerializer, UserVisitorSerializer, UserSocialSerializer
from users.permissions import IsAdminUserOrReadOnly, IsSelfOrReadOnly
from users.models import User
# from users.forms import CreateGameForm
from social_django.models import UserSocialAuth

from rest_framework import permissions, viewsets, generics, renderers, status
from rest_framework.response import Response
from rest_framework.decorators import  detail_route, list_route

class PermissionViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows permissions to be viewed or edited.
    """
    queryset = Permission.objects.all()
    serializer_class = PermissionSerializer

class UserViewSet(viewsets.ReadOnlyModelViewSet):
    """
    This viewset automatically provides `list` and `detail` actions.
    """
    queryset = User.objects.filter(is_active=True).order_by('id')
    serializer_class = UserVisitorSerializer
    permission_classes = [permissions.IsAuthenticated, IsSelfOrReadOnly] 
    # permission_classes = (IsAdminUserOrReadOnly,)
    # renderer_classes = (renderers.AdminRenderer)
    # lookup_field = 'id'

    def get_serializer_class(self):
        # user = self.get_object()
        # print(self.get_object())
        if(self.request.user.is_superuser):
            return UserSerializer
        if (self.action not in ['list', 'create']) :
            user = self.get_object()
            if (self.request.user.id == user.id):
                return UserSerializer
        return UserVisitorSerializer 
        
    def get_object(self):
        queryset = self.get_queryset() 
        filter = {}
        if 'f' in self.request.query_params:
            f = self.request.query_params['f']
            if f=='s':
                filter['social_auth__uid'] = self.kwargs['pk']
                obj = get_object_or_404(queryset, **filter)  # Lookup the object
                return obj
            else :
                filter['id'] = self.kwargs['pk']
                obj = get_object_or_404(queryset, **filter)  # Lookup the object
                return obj
        filter['id'] = self.kwargs['pk']
        obj = get_object_or_404(queryset, **filter)  # Lookup the object
        # self.check_object_permissions(self.request, obj)
        return obj


    @list_route(methods=['get'], permission_classes=[permissions.IsAuthenticated, IsSelfOrReadOnly])
    def sid(self, request):
        user = request.user
        try:
            facebook_login = user.social_auth.get(provider='facebook')
        except UserSocialAuth.DoesNotExist:
            facebook_login = None
        try:
            twitter_login = user.social_auth.get(provider='twitter')
        except UserSocialAuth.DoesNotExist:
            twitter_login = None
        try:
            github_login = user.social_auth.get(provider='github')
        except UserSocialAuth.DoesNotExist:
            github_login = None
        return Response({
            'facebook': UserSocialSerializer(facebook_login).data,
            'twitter': UserSocialSerializer(twitter_login).data,
            'github': UserSocialSerializer(github_login).data,
        })
