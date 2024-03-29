from rest_framework.views import APIView
from django.contrib.auth import authenticate, login
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from .models import User
from .serializers import UserSignupSerializer, UserProfileSerializer

class UserSignupView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSignupSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid(): 
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer._errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    def post(self, req):
        user = authenticate(request=req, username=req.data['email'], password=req.data['password'])
        if user is not None:
            login(req, user)
            userDetails = User.objects.get(email=user)
            serializer = UserProfileSerializer(userDetails)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({"message": "User doesn't exist!"}, status=status.HTTP_401_UNAUTHORIZED)
