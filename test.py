import requests

# Step 1: Path to your image (update the name if your image is named differently)
image_path = 'testimg3.jpg'  # <-- Replace with your own image file name

# Step 2: Open the image in binary read mode
with open(image_path, 'rb') as img_file:
    # Step 3: Send the POST request to the local Flask API
    response = requests.post(
        'http://127.0.0.1:5000/predict',
        files={'image': img_file}
    )

# Step 4: Print the response (emotion and confidence)
print(response.json())
