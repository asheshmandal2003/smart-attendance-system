import face_recognition
import urllib.request as ur
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from authentication.models import User
import requests
from PIL import Image
from io import BytesIO
import numpy as np

def decodeImg(img):
    return ur.urlopen(img)

def load_img_from_cloudinary(url):
    response = requests.get(url=url)
    response.raise_for_status()
    image = Image.open(BytesIO(response.content))
    return image

def face_encoding(image):
    face_locations = face_recognition.face_locations(image)
    encoding = face_recognition.face_encodings(image, face_locations)[0]
    return encoding, face_locations
    

class MatchFace(APIView):
    def post(self, req):
        try:
            decodedImg = decodeImg(req.data["img"])
            unknown_image = face_recognition.load_image_file(decodedImg)
            unknown_image_encoding, unknown_image_face_location = face_encoding(unknown_image)
            
            if(unknown_image_face_location):
                userImgPathQuerySet = User.objects.values_list("img_path", flat=True)
            
                for img_path in list(userImgPathQuerySet):
                    userAvatar = load_img_from_cloudinary(img_path)
                    userAvatar_np = np.array(userAvatar)
                    
                    known_image_encoding, known_image_face_location = face_encoding(userAvatar_np)
                    
                    results = face_recognition.compare_faces([known_image_encoding], unknown_image_encoding)
                    return Response({"res": results}, status=status.HTTP_200_OK)
            else:
                return Response({"res": "No face found!"}, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response({"res": "Something went wrong!"}, status=status.HTTP_400_BAD_REQUEST)
    
