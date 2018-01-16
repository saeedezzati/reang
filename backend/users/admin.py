from django import forms
from django.contrib import admin
from users.models import User

from django.contrib.auth.models import Group as UserGroup
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin


class UserAdmin(BaseUserAdmin):
    # The forms to add and change user instances
    fieldsets = [
        ('User Info', {'fields': ['username', 'password', 'first_name', 'last_name', 'email', 'birthdate', 'is_superuser', 'is_staff', 'is_active', 'avatar', 'user_permissions', 'groups']}),
        ('Date information', {'fields': ['date_joined', 'last_login' ]}),
        ('games', {'fields': [ 'role']}),
    ]
    # inlines = [ChoiceInline]
    list_display = ('username', 'email', 'is_superuser')
    list_filter = ['is_superuser', 'is_staff']
    search_fields = ['username']

    # def get_teams(self, obj):
    #     # return "\n".join(["1","2","3","4"])
    #     return "\n".join([g.username for g in obj.teams.all()])
admin.site.register(User, UserAdmin)
admin.site.unregister(UserGroup)
