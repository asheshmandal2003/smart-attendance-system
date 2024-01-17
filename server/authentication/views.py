from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSerializer
from django.contrib.auth import authenticate, login

class StudentView(APIView):
    def post(self, req):
        print(req.data)
        serializer = UserSerializer(data=req.data)
        if serializer.is_valid(): 
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print(serializer._errors)
        return Response(serializer._errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    def post(self, req):
        user = authenticate(req, username=req.data['username'], password=req.data['password'])
        if user is not None:
            login(req, user)
            return Response({"user": f"{user}"}, status=status.HTTP_200_OK)
        else:
            return Response({"message": "Access Denied"}, status=status.HTTP_401_UNAUTHORIZED)