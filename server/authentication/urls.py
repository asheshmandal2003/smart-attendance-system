from django.urls import path
from .views import StudentView, LoginView

urlpatterns = [
    path('auth/signup', StudentView.as_view(), name="signup"),
    path('auth/signin', LoginView.as_view(), name="signin")
]
