from flask import Flask, request, jsonify
from flask_cors import CORS
import json
from PIL import Image
import imghdr
from io import BytesIO
import boto3
import os
import time
import uuid
import requests
from concurrent.futures import ThreadPoolExecutor

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

def fetch_image(url):
    response = requests.get(url)
    image_type = imghdr.what("", response.content)
    if image_type == "gif":
        return Image.open(BytesIO(response.content)).convert("RGB")
    else:
        return Image.open(BytesIO(response.content))

@app.route("/", methods=["GET"])
def index():
    return "Hello degen!"

@app.route("/banner", methods=["POST"])
def banner():
    body = request.get_data()
    decoded_data = body.decode('utf-8')
    json_data = json.loads(decoded_data)
    images = []
    print("fetching images")
    with ThreadPoolExecutor() as executor:
        futures = [executor.submit(fetch_image, url) for url in json_data["items"]]
        for future in futures:
            image = future.result()
            images.append(image)

    wallet = json_data["wallet"]
    for url in json_data["items"]:
        response = requests.get(url)
        image_type = imghdr.what("", response.content)
        if image_type == "gif":
            images.append(Image.open(BytesIO(response.content)).convert("RGB"))
        else:
            images.append(Image.open(BytesIO(response.content)))
    
    print("creating banner")
    width = 3000
    height = 1000
    num_cols = 6
    num_rows = 2
    col_width = width // num_cols
    row_height = height // num_rows

    banner = Image.new('RGB', (width, height), color=(255, 255, 255))

    # Fit images into grid
    for i in range(num_rows):
        for j in range(num_cols):
            if len(images) > 0:
                image = images.pop()
                image = image.resize((500, 500))
                x = j * col_width
                y = i * row_height
                banner.paste(image, (x, y))
    
    print("uploading banner")
    s3 = boto3.client('s3', aws_access_key_id=os.environ['aws_key'], aws_secret_access_key=os.environ['aws_secret'])

    timestamp = int(time.time() * 1000)
    unique_id = uuid.uuid4().hex[:6]
    key = f"{wallet}/{timestamp}-{unique_id}.png"
    buffer = BytesIO()
    banner.save(buffer, format="PNG")
    buffer.seek(0)
    s3.upload_fileobj(buffer, os.environ["AWS_S3_BUCKET_IMAGES"], key, ExtraArgs={'ContentDisposition': 'inline', 'ContentType': 'image/png'})
    banner_url = f"https://{os.environ['AWS_S3_BUCKET_IMAGES']}.s3.amazonaws.com/{key}"
    response = jsonify({'url': banner_url})
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    response.status_code = 200
    return response


    

    
