from django.urls import path
from .views import MatchFace, AttendanceDetailsView

urlpatterns = [
    path("match-face", MatchFace.as_view(), name="match-face"),
    path("api/v1/user/<int:id>/attendance", AttendanceDetailsView.as_view(), name="attendance-data")
]
