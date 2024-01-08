from django.urls import path
from .views import StudentView, LoginView

urlpatterns = [
    path('signup/', StudentView.as_view(), name="signup"),
    path('signin/', LoginView.as_view(), name="signin")
]
