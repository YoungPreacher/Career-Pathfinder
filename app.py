from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests from React

@app.route('/api/recommend', methods=['POST'])
def recommend():
    data = request.json
    # Example logic: use assessment data to recommend careers
    # Replace this with your own logic/model
    recommendations = [
        {
            "title": "Software Engineer",
            "description": "Designs and builds software applications.",
            "insights": [
                "You enjoy problem-solving.",
                "You prefer a balanced work style.",
                "Your desired salary range matches this field."
            ]
        },
        {
            "title": "Data Analyst",
            "description": "Interprets data to help companies make decisions.",
            "insights": [
                "Strong analytical skills.",
                "Enjoys independent work.",
                "Good work-life balance."
            ]
        }
    ]
    return jsonify(recommendations)

if __name__ == '__main__':
    app.run(debug=True)