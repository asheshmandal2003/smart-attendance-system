from django.shortcuts import render
import face_recognition
from django.http import JsonResponse

# Create your views here.
def matchFace(req):
    known_image = face_recognition.load_image_file("./photos/pic1.jpg")
    unknown_image = face_recognition.load_image_file("./photos/pic2.jpg")

    biden_encoding = face_recognition.face_encodings(known_image)[0]
    print(biden_encoding)
    unknown_encoding = face_recognition.face_encodings(unknown_image)[0]
    print("******************************")
    print(unknown_encoding)

    results = face_recognition.compare_faces([biden_encoding], unknown_encoding)
    return JsonResponse({"res": f"{results}"})

