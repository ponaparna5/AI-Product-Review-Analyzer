from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib

app = Flask(__name__)
CORS(app)

model = joblib.load("sentiment_model.pkl")
vectorizer = joblib.load("tfidf_vectorizer.pkl")

@app.route("/")
def home():
    return "AI Product Review Analyzer API is running!"

@app.route("/analyze", methods=["POST"])
def analyze_review():

    data = request.get_json()

    if not data or "review" not in data:
        return jsonify({
            "error": "Please provide a review."
        }), 400

    review = data["review"].strip()

    if review == "":
        return jsonify({
            "error": "Review cannot be empty."
        }), 400

    # Convert review into TF-IDF numbers
    review_vector = vectorizer.transform([review])

    # Predict sentiment
    prediction = model.predict(review_vector)[0]

    # Get confidence
    if hasattr(model, "predict_proba"):
        probabilities = model.predict_proba(review_vector)[0]
        confidence = round(max(probabilities) * 100, 2)
    else:
        confidence = 0

    # Detect product category
    text = review.lower()

    if any(word in text for word in [
        "phone", "mobile", "smartphone", "charger", "camera"
    ]):
        category = "Mobile"

    elif any(word in text for word in [
        "tv", "television", "smart tv", "screen", "display", "remote"
    ]):
        category = "Smart TV"

    elif any(word in text for word in [
        "book", "novel", "author", "chapter", "reading", "pages"
    ]):
        category = "Books"

    else:
        category = "Other"

    return jsonify({
        "sentiment": str(prediction),
        "confidence": confidence,
        "category": category,
        "review": review
    })

if __name__ == "__main__":
    app.run(debug=True)
