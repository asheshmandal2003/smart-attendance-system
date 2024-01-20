import face_recognition
import urllib.request as ur
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

# Create your views here.
def decodeImg(img):
    return ur.urlopen(img)


class MatchFace(APIView):
    def post(self, req):
        decodedImg = decodeImg(req.data["img"])
        unknown_image = face_recognition.load_image_file(decodedImg)
        known_image = face_recognition.load_image_file("./photos/pic3.jpg")
        try:
            biden_encoding = face_recognition.face_encodings(known_image)[0]
            unknown_encoding = face_recognition.face_encodings(unknown_image)[0]

            results = face_recognition.compare_faces([biden_encoding], unknown_encoding)
            return Response({"res": f"{results}"}, status=status.HTTP_200_OK)
        except IndexError as e:
            print(e)
            return Response({"res": "No face found!"}, status=status.HTTP_400_BAD_REQUEST)
    
