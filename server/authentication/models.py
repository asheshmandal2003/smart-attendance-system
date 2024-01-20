from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinLengthValidator

# Create your models here.
class User(AbstractUser):
    first_name = models.CharField("Firstname", max_length=50)
    last_name = models.CharField("Lastname", max_length=50)
    username = models.CharField("Username", max_length=50)
    face_encoding = models.CharField("Firstname")
    email = models.EmailField("Email", unique=True, blank=False)
    password = models.CharField("Password", blank=False, max_length=50, validators=[MinLengthValidator(4)])
