# Brain Tumor Classification using Deep Learning Models

This project presents a **comparative analysis** of pre-trained deep learning models for the classification of brain tumors using MRI images. We evaluate the performance of **EfficientNetB3, ResNet50, Xception, and VGG16** on a curated dataset of 20,000 brain MRI images collected from various online sources, including Kaggle.

## 📌 Overview

Brain tumor diagnosis through MRI is a critical yet challenging task that can benefit immensely from deep learning techniques. In this study, we leverage the feature extraction power of state-of-the-art pre-trained CNN architectures to classify brain tumors into four categories:

- **Glioma Tumor**
- **Meningioma Tumor**
- **Pituitary Tumor**
- **No Tumor**

## 🧠 Models Used

The following pre-trained convolutional neural networks (CNNs) were fine-tuned and evaluated:

- ✅ **VGG16**
- ✅ **ResNet50**
- ✅ **Xception**
- ✅ **EfficientNetB3**

Each model was trained and validated using consistent preprocessing steps and augmentation techniques.

## 📊 Dataset

- **Total Images:** 20,000 MRI scans  
- **Classes:** 4 (Glioma, Meningioma, Pituitary, No Tumor)  
- **Sources:** Kaggle and other publicly available MRI datasets  

> All images were resized, normalized, and augmented to ensure robust training and reduce overfitting.

## 🧪 Results

Below is the classification accuracy achieved by each model:

| Model           | Accuracy (%) |
|------------------|---------------|
| VGG16            | 97.15%        |
| EfficientNetB3   | **97.62%**    |
| ResNet50         | 96.93%        |
| Xception         | 97.57%        |

> 🚀 **EfficientNetB3** outperformed other models, achieving the highest classification accuracy.

## 📈 Visualizations

The project includes:
- Confusion matrices
- Accuracy and loss curves
  

  ## 🖥️ Tech Stack / Technologies Used

- **Platform**: Google Colab
- **Programming Language**: Python
- **Deep Learning Framework**: TensorFlow / Keras
- **Data Handling**: NumPy, Pandas
- **Visualization**: Matplotlib, Seaborn
- **Model Evaluation**: Scikit-learn (metrics, confusion matrix)
- **Image Processing**: OpenCV
- **Storage Bucket**: Google Drive 
