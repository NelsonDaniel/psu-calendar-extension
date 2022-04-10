import pandas as pd
import googlemaps
from itertools import tee
import requests
from datetime import datetime
import simplejson, urllib

orig = "http://www.google.com/maps/place/40.8004449,-77.8605032"
dest = "http://www.google.com/maps/place/40.7913296,-77.8698712"
arr = orig.split("/")
arr2 = dest.split("/")
orig_lat = arr[5].split(",")[0]
orig_lng = arr[5].split(",")[1]
dest_lat = arr2[5].split(",")[0]
dest_lng = arr2[5].split(",")[1]

orig_coord = "40.8004449,-77.8605032"
dest_coord = "40.7913296,-77.8698712"
url = "https://maps.googleapis.com/maps/api/distancematrix/json?origins={0}&destinations={1}&units=imperial&key=AIzaSyBuO04v4aMRoAc-Isu1NTARjgHbwvcFtnk".format(orig_coord, dest_coord)

payload={}
headers = {}

response = requests.request("GET", url, headers=headers, data=payload)
result = response.json()
time = result['rows'][0]['elements'][0]['duration']['text']
print(result)
print(time)

