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
from pathlib import Path
import openpyxl
from .models import Attendance
from django.utils import timezone
from .serializers import AttendanceDetailsSerializer

def decodeImg(img):
    return ur.urlopen(img)

def load_img_from_cloudinary(url):
    response = requests.get(url=url)
    response.raise_for_status()
    image = Image.open(BytesIO(response.content))
    return image

def IsSameDate(last_attendance_taken):
    today = timezone.now().date()
    if last_attendance_taken == today:
        raise Exception("Attendance already taken!")
    
class MatchFace(APIView):
    def post(self, req):
        try:  
            user = User.objects.get(email=req.data["email"])
            IsSameDate(user.last_attendance_taken)
            decodedImg = decodeImg(req.data["img"])
            unknown_image = face_recognition.load_image_file(decodedImg)
            unknown_image_face_location = face_recognition.face_locations(unknown_image)
            
            if(unknown_image_face_location):
                userAvatar = load_img_from_cloudinary(user.img_path)
                userAvatar_np = np.array(userAvatar)
                
                known_image_face_location = face_recognition.face_locations(userAvatar_np)
                
                if known_image_face_location:
                    known_image_encoding = face_recognition.face_encodings(face_image=userAvatar_np, known_face_locations=known_image_face_location)[0]
                    unknown_image_encoding = face_recognition.face_encodings(face_image=unknown_image, known_face_locations=unknown_image_face_location)[0]
                        
                    results = face_recognition.compare_faces([known_image_encoding], unknown_image_encoding)
                    if results[0] == True:
                        user.last_attendance_taken = timezone.now()
                        user.save()
                        mark_as_present(user=user, latitude= req.data["latitude"], longitude= req.data["longitude"])
                        return Response({"res": "Face matched!"}, status=status.HTTP_200_OK)
                    
                    else:
                        return Response({"res": "Face didn't match!"}, status=status.HTTP_400_BAD_REQUEST)
                else:
                    return Response({"res": "You avatar doesn't contain any face!"}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({"res": "No face detected!"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"res": f"{e}"}, status=status.HTTP_400_BAD_REQUEST)
        

def mark_as_present(user, latitude, longitude): 
    try:
        Attendance.objects.create(user= user, latitude= latitude, longitude= longitude)
    except Exception as e:
        print(e)

def create_sheet(month, year):
    if not Path(f"sheets/Attendance_sheet_{month}_{year}.xlsx").is_file():
            workbook = openpyxl.Workbook()
            sheet = workbook.active
            sheet.title = f"Attendance_sheet_{month}_{year}"
            sheet["A1"] = "Date"
            sheet["B1"] = "Name"
            sheet["C1"] = "Email"
            sheet["D1"] = "Latitude"
            sheet["E1"] = "Longitude"
            sheet["F1"] = "Attendance"
        
            workbook.save(f"sheets/Attendance_sheet_{month}_{year}.xlsx")
            return workbook, sheet
    else:
        workbook = openpyxl.load_workbook(f"sheets/Attendance_sheet_{month}_{year}.xlsx")
        if workbook:
            sheet = workbook.active
            return workbook, sheet
    
def take_attendance(date, name, email, latitude, longitude, user_data):
        workbook, sheet = create_sheet(date.month, date.year)
        sheet.append([date.strftime('%Y-%m-%d'), name, email, latitude, longitude, user_data])
        
        workbook.save(f"sheets/Attendance_sheet_{date.month}_{date.year}.xlsx")
        
class AttendanceDetails(APIView):
    def get(self, req, id, format=None):
        try:
            if id:
                attendance_data = Attendance.objects.filter(user=id);
                if attendance_data:
                    serializer = AttendanceDetailsSerializer(attendance_data, many=True)
                    return Response(data=serializer.data, status=status.HTTP_200_OK)
                else:
                    raise Exception("User doesn't exists!")
                
            else:
                raise Exception("Cannot find your user id!")
        except Exception as e:
            print(e)
            return Response(data={"msg": f"{e}"}, status=status.HTTP_400_BAD_REQUEST)
        
        
        
    
