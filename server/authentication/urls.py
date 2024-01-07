from django.urls import path
from .views import StudentView

urlpatterns = [
    path('signup/', StudentView.as_view(), name="signup")
]
