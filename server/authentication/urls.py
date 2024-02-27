from django.urls import path
from .views import UserSignupView, LoginView, deleteUser

urlpatterns = [
    path('auth/signup', UserSignupView.as_view(), name="signup"),
    path('auth/signin', LoginView.as_view(), name="signin"),
    path('auth/delete', deleteUser)
]
