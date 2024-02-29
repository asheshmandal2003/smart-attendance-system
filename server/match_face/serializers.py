from rest_framework import serializers
from .models import Attendance

class AttendanceDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendance
        fields = [ 'time', 'longitude', 'latitude']