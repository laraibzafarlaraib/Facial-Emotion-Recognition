# Emotion Recognition from Facial Expressions Using Deep Learning

**Team Members**  
👩‍💻 BSDSF22M022 – Mubashra Iftikhar  
👩‍💻 BSDSF22M012 – Laraib Zafar

---

## 💡 Overview

In this project, we developed a deep learning-based system that recognizes **human emotions from facial expressions** using the FER-2013 dataset. The system classifies expressions into seven categories and provides real-time predictions via a web interface and webcam-based emotion detection.

This project was completed as part of our coursework for **Data Mining & Machine Learning**.

---

## 🎯 What We Did

- ✅ **Preprocessed the FER-2013 dataset** (resizing, normalization, class analysis)
- ✅ **Built deep learning models (CNNs)** to classify facial expressions
- ✅ **Evaluated model performance** using multiple metrics and visualizations
- ✅ **Integrated the trained model with a Flask API**
- ✅ **Developed a responsive frontend using React + Node.js**
- ✅ **Implemented real-time emotion recognition using live webcam feed**
- ✅ **Deployed a complete end-to-end interactive system**

---

## 📊 Dataset: FER-2013

- **Source**: [Kaggle - FER-2013](https://www.kaggle.com/datasets/msambare/fer2013)
- **Type**: 48x48 grayscale images of human faces
- **Train Set**: 28,709 images  
- **Test Set**: 3,589 images  
- **Labels**:  
  - 0 – Angry 😠  
  - 1 – Disgust 🤢  
  - 2 – Fear 😨  
  - 3 – Happy 😄  
  - 4 – Sad 😢  
  - 5 – Surprise 😲  
  - 6 – Neutral 😐

---

## 🧠 Model Architecture

We experimented with:
- 🧱 A **Simple CNN** (3 convolutional layers)
- 🏛️ A **VGG-style CNN** for deeper feature extraction

**Techniques used:**
- Data Augmentation (Rotation, Flipping, Zooming)
- Categorical Cross-Entropy Loss
- ReLU Activations and Softmax Output
- Evaluation with Accuracy, Precision, Recall, F1-Score
- Confusion Matrix Analysis

---

## 🖥️ Full Stack Integration

We built a complete pipeline from model training to user interface:

| Layer | Tech Stack |
|-------|------------|
| 🧠 **Model Backend** | Python + TensorFlow/Keras |
| 🔌 **API** | Flask REST API |
| 🌐 **Frontend** | React.js |
| 🌍 **Integration Layer** | Node.js + Axios for API calls |

---

## 🎥 Real-Time Emotion Recognition

We extended our system to support **real-time facial emotion recognition** using a webcam.  

- 🖼️ OpenCV was used to capture frames and detect faces.
- 🤖 Each detected face is passed through the trained model for emotion prediction.
- ⏱️ Results are displayed live on the video stream.

This makes the system suitable for **interactive applications** in education, healthcare, and user experience testing.

---

## 🔍 Results

- ✅ High validation accuracy on FER-2013
- ✅ Successfully identified dominant emotions in real-time
- 🔬 Noted challenge in predicting **Disgust** and **Fear** due to dataset imbalance
- 🖥️ Fully functional web and webcam-based emotion recognition system

---

## 🧪 Tech Stack Summary

- **Languages**: Python, JavaScript (React.js), HTML/CSS
- **Libraries**: TensorFlow, Keras, NumPy, OpenCV, Flask
- **Frontend**: React.js, Axios, Bootstrap
- **Backend API**: Flask (Python)
- **Server Layer**: Node.js + Express

---

## 📦 Future Improvements

- 📸 Add multi-face recognition in real-time
- 🚀 Improve accuracy for underrepresented emotions using synthetic data
- 🐳 Containerize backend with Docker for easy deployment
- 🌍 Deploy full system on cloud (e.g., Render, Vercel, or Hugging Face Spaces)

---

## 🧾 License

This project is developed for academic purposes. FER-2013 dataset credits belong to the original contributors on Kaggle.

---

> Made with ❤️ by Mubashra & Laraib  
