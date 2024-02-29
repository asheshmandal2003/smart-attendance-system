from django.urls import path
from .views import MatchFace, AttendanceDetails

urlpatterns = [
    path("match-face", MatchFace.as_view(), name="match-face"),
    path("api/v1/user/<int:id>/attendance", AttendanceDetails.as_view(), name="attendance-data")
]
