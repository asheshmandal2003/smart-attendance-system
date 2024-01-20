import face_recognition
import urllib.request as ur

def faceEncoding(base64Img):
    decodeBase64Img = ur.urlopen(base64Img)
    load_img = face_recognition.load_image_file(decodeBase64Img)
    return face_recognition.face_encodings(load_img)[0]
    