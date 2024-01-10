from django.urls import path
from . import views

urlpatterns = [
    path("", views.matchFace, name="match face")
]
