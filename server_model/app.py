# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import numpy as np
# from tensorflow.keras.models import load_model
# from tensorflow.keras.preprocessing.image import img_to_array
# from PIL import Image
# import io

# app = Flask(__name__)
# CORS(app)  # Allow cross-origin requests (if you're calling from a frontend)

# # Load your trained model (make sure model.h5 is in the same directory or provide the correct path)
# # model = load_model("malocclusion.h5")
# # model = load_model("vgg19_model (1).keras")
# model = load_model("resnet_model.keras")

# # Define the class labels (Only two classes)
# CLASS_LABELS = ["Class 1", "Class 2"]

# @app.route("/")
# def home():
#     return "Malocclusion Classification API Running"

# @app.route("/predict", methods=["POST"])
# def predict():
#     # return jsonify({"prediction": request.files})
#     if "image" not in request.files:
#         return jsonify({"error": "No file uploaded"}), 400

#     file = request.files["image"]

#     try:
#         # Process the image
#         image = Image.open(io.BytesIO(file.read())).convert("RGB").resize((224, 224))
#         img_array = img_to_array(image) / 255.0
#         img_array = np.expand_dims(img_array, axis=0)

#         # Predict
#         prediction = model.predict(img_array)
#         predicted_class = CLASS_LABELS[np.argmax(prediction)]

#         # Return prediction
#         return jsonify({"prediction": predicted_class})
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# if __name__ == "__main__":
#     app.run(debug=True)from flask import Flask, request, jsonify
from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import img_to_array
from PIL import Image
import io

app = Flask(__name__)
CORS(app)  # Enable CORS

# Load the trained model (make sure the path is correct)
model = load_model("updated_resnet_model.keras")

# Update class labels for four categories
CLASS_LABELS = ["glioma tumor", "meningioma tumor", "pituitary tumor", "no tumor"]

@app.route("/")
def home():
    return "Brain Tumor Classification API Running"

@app.route("/predict", methods=["POST"])
def predict():
    if "image" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["image"]

    try:
        # Process image
        image = Image.open(io.BytesIO(file.read())).convert("RGB").resize((128, 128))
        # img_array = img_to_array(image) / 255.0
        img_array = img_to_array(image)
        img_array = np.expand_dims(img_array, axis=0)

        # Prediction
        prediction = model.predict(img_array)
        predicted_class = CLASS_LABELS[np.argmax(prediction)]
        print(np.argmax(prediction))
        print(prediction)

        return jsonify({"prediction": predicted_class})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)




