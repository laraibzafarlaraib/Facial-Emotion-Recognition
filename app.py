from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
from flask_cors import CORS
import numpy as np
from PIL import Image
import io
import traceback

app = Flask(__name__)
CORS(app)  # ✅ Allow frontend to access backend

# Load your trained model
print("🔄 Loading model...")
model = load_model('best_model.h5')
print("✅ Model loaded successfully!")

emotion_labels = ['Angry', 'Disgust', 'Fear', 'Happy', 'Sad', 'Surprise', 'Neutral']

# Preprocess function
def preprocess_image(image_bytes):
    img = Image.open(io.BytesIO(image_bytes)).convert('L')  # Convert to grayscale
    img = img.resize((48, 48))  # Resize for model
    img = np.array(img) / 255.0
    img = np.expand_dims(img, axis=0)
    img = np.expand_dims(img, axis=-1)
    return img

@app.route('/predict', methods=['POST'])
def predict():
    print("🔄 Prediction request received")
    
    try:
        # Check if image is in request
        if 'image' not in request.files:
            print("❌ No image in request files")
            return jsonify({'error': 'No image uploaded'}), 400
        
        print("📁 Image found in request")
        
        # Read and preprocess image
        image = request.files['image'].read()
        print(f"📏 Image size: {len(image)} bytes")
        
        processed = preprocess_image(image)
        print(f"🔧 Image preprocessed: shape {processed.shape}")
        
        # Make prediction
        prediction = model.predict(processed)
        print(f"🎯 Raw prediction shape: {prediction.shape}")
        print(f"🎯 Raw prediction values: {prediction[0]}")
        
        # Convert to the format expected by frontend
        # Frontend expects: {'emotions': {'Happy': 0.85, 'Sad': 0.12, ...}}
        emotions = {}
        for i, label in enumerate(emotion_labels):
            emotions[label.lower()] = float(prediction[0][i])  # Convert to lowercase to match frontend
        
        print(f"✅ Formatted emotions: {emotions}")
        
        # Return in the format expected by frontend
        return jsonify({'emotions': emotions})
    
    except Exception as e:
        print(f"💥 Error in predict: {str(e)}")
        print(f"📋 Traceback: {traceback.format_exc()}")
        return jsonify({'error': str(e)}), 500

# ✅ Health check endpoint
@app.route('/health', methods=['GET'])
def health_check():
    print("✅ Health check requested")
    return jsonify({'status': 'healthy', 'message': 'Flask API is running'})

if __name__ == '__main__':
    print("🚀 Starting Flask API on http://127.0.0.1:5000")
    print("📝 Debug mode enabled - check console for detailed logs")
    app.run(host='127.0.0.1', port=5000, debug=True)