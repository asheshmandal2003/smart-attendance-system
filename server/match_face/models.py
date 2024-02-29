from django.db import models
from authentication.models import User

# Create your models here.
class Attendance(models.Model):
    user = models.ForeignKey(User, on_delete= models.CASCADE)
    time = models.DateField(auto_now_add= True)
    latitude = models.FloatField(default=0.0)
    longitude = models.FloatField(default=0.0)