from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from PIL import Image
from PIL.ExifTags import TAGS
import json
import traceback


def request(request):

    if request.method == "POST":

        # Result code => 0 : No File Selected, -1 : More than 1 file, -2 : File Size Exceeded, -3 : Wrong File Type

        Result = {}

        if len(request.FILES) == 0:
            print("Fail: No File Selected")
            Result["Result Code"] = 0
            Result["Message"] = "No File Selected"
            return JsonResponse(Result)

        upload_file = request.FILES["file"]

        print(request.FILES)
        print(len(request.FILES)) 

        if len(request.FILES) > 1:
            print("Fail: More than 1 file")
            Result["Result Code"] = -1
            Result["Message"] = "More than 1 file"
            return JsonResponse(Result)

        if upload_file.size > 52428800:
            print("Fail: File Size Exceeded")
            Result["Result Code"] = -2
            Result["Message"] = "File Size Exceeded"
            return JsonResponse(Result)
      
        try: 
            image = Image.open(upload_file)
            info = image._getexif()
            image.close()
        except:
            print("Fail: Wrong File Type")
            Result["Result Code"] = -3
            Result["Message"] = "Wrong File Type"
            return JsonResponse(Result)

        if info == None:
            print("Fail: Wrong File Type")
            Result["Result Code"] = -3
            Result["Message"] = "Wrong File Type"
            return JsonResponse(Result)

        image_info = {}

        for key, value in info.items():
            try:
                decode = TAGS.get(key, key)
                if type(value) == bytes:
                    continue
                image_info[decode] = value
                #print(decode)
            except:
                traceback.print_exe()

        if "GPSInfo" in image_info.keys():
            
            #print(json.dumps(image_info))
        
            # Latitude Calculation

            latDeg = image_info["GPSInfo"][2][0]
            latMin = image_info["GPSInfo"][2][1]
            latSec = image_info["GPSInfo"][2][2]

            Lat = (latDeg + (latMin + latSec / 60.0) / 60.0)
            if image_info["GPSInfo"][1] == "S":
                Lat = Lat * -1

            # Longitude Calculation

            lonDeg = image_info["GPSInfo"][4][0]
            lonMin = image_info["GPSInfo"][4][1]
            lonSec = image_info["GPSInfo"][4][2]

            Lon = (lonDeg + (lonMin + lonSec / 60.0) / 60.0)
            if image_info["GPSInfo"][3] == "W":
                Lon = Lon * -1

            image_info["Latitude"] = Lat
            image_info["Longitude"] = Lon
        
        image_info["Result Code"] = 1
        image_info["Message"] = "Success"
         
        for key, value in info.items():
            try:
                decode = TAGS.get(key, key)
                if type(value) == bytes:
                    continue
                image_info[decode] = str(value)
            except:
                traceback.print_exe()

        return JsonResponse(image_info)

    else:
        print("Method incorrect")

        return HttpResponse("Fail")


def uploadpage(request):

    if request.method == "GET":
        
        return render(request, "upload.html")



# Create your views here.
