from django.urls import path
from .views import UserSignupView, LoginView

urlpatterns = [
    path('auth/signup', UserSignupView.as_view(), name="signup"),
    path('auth/signin', LoginView.as_view(), name="signin")
]
