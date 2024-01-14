import face_recognition
from django.http import JsonResponse, HttpResponse
import urllib.request as ur
from rest_framework.views import APIView

# Create your views here.
def decodeImg(img):
    return ur.urlopen(img)


class MatchFace(APIView):
    def post(self, req):
        decodedImg = decodeImg(req.data["img"])
        unknown_image = face_recognition.load_image_file(decodedImg)
        known_image = face_recognition.load_image_file("./photos/pic3.jpg")
        print(type(unknown_image))

        if len(unknown_image) != 0:
            unknown_encoding = face_recognition.face_encodings(unknown_image)[0]
            biden_encoding = face_recognition.face_encodings(known_image)[0]

            results = face_recognition.compare_faces([biden_encoding], unknown_encoding)
            return JsonResponse({"res": f"{results}"})
        return JsonResponse({"res": "No face is captured!"})
    
