from django.db import models
from authentication.models import User

# Create your models here.
class Attendance(models.Model):
    user = models.ForeignKey(User, on_delete= models.CASCADE)
    time = models.DateField(auto_now_add= True)
    is_present = models.BooleanField(default= False)
    latitude = models.FloatField(default=0.0)
    longitude = models.FloatField(default=0.0)