from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser


from django.core.files.storage import FileSystemStorage
import os

fs = FileSystemStorage(location=settings.PRIVATE_MEDIA_ROOT)


class User(AbstractUser):       
    def get_uplaod_file_name(user, filename):
        filename, file_extension = os.path.splitext(filename)
        return u'images/users/%s/%s_%s%s' % (str(user.id),
                                    str(time()).replace('.', '_'),
                                    "avatar", file_extension) 
    birthdate = models.DateField(null=True, blank=True)
    avatar = models.ImageField(storage=fs, upload_to=get_uplaod_file_name, null=True, blank=True)
