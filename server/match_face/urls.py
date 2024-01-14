from django.urls import path
from .views import MatchFace

urlpatterns = [
    path("match-face", MatchFace.as_view(), name="matchFace")
]
