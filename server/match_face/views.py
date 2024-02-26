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
from datetime import datetime

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
                        take_attendance(datetime.today(), req.data["name"], req.data["email"], req.data["latitude"], req.data["longitude"], 1)
                        return Response({"res": "Face matched!"}, status=status.HTTP_200_OK)
                    else:
                        return Response({"res": "Face didn't match!"}, status=status.HTTP_400_BAD_REQUEST)
                else:
                    return Response({"res": "You avatar doesn't contain any face!"}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({"res": "No face detected!"}, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response({"res": "Something went wrong!"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

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
    
    
    
    
