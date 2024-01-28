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
    
class MatchFace(APIView):
    def post(self, req):
        try:
            decodedImg = decodeImg(req.data["img"])
            unknown_image = face_recognition.load_image_file(decodedImg)
            unknown_image_face_location = face_recognition.face_locations(unknown_image)
            
            if(unknown_image_face_location):
                user = User.objects.filter(email=req.data["email"]).values("img_path").first()
            
                userAvatar = load_img_from_cloudinary(user["img_path"])
                userAvatar_np = np.array(userAvatar)
                
                known_image_face_location = face_recognition.face_locations(userAvatar_np)
                
                if known_image_face_location:
                    known_image_encoding = face_recognition.face_encodings(face_image=userAvatar_np, known_face_locations=known_image_face_location)[0]
                    unknown_image_encoding = face_recognition.face_encodings(face_image=unknown_image,  known_face_locations=unknown_image_face_location)[0]
                        
                    results = face_recognition.compare_faces([known_image_encoding], unknown_image_encoding)
                    if results[0] == True:
                        return Response({"res": "Face matched!"}, status=status.HTTP_200_OK)
                    else:
                        return Response({"res": "Face didn't match!"}, status=status.HTTP_400_BAD_REQUEST)
                else:
                    return Response({"res": "You avatar doesn't contain any face!"}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({"res": "No face detected!"}, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response({"res": "Something went wrong!"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
