from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return jsonify({"project": "CareerForge IQ"})

@app.route("/test")
def test():
    return jsonify({
        "certifications": ["AZ-900", "AZ-104", "AZ-400"],
        "readiness_score": 82
    })

@app.route("/career-plan", methods=["POST"])
def career_plan():

    data = request.get_json()

    target_role = data.get("targetRole", "").lower()

    if "devops" in target_role:
        certs = ["AZ-900", "AZ-104", "AZ-400"]
        score = 82

    elif "cloud" in target_role:
        certs = ["AZ-900", "AZ-104", "AZ-305"]
        score = 78

    elif "data" in target_role:
        certs = ["DP-900", "DP-203"]
        score = 75

    else:
        certs = ["AZ-900"]
        score = 60

    return jsonify({
        "certifications": certs,
        "readiness_score": score
    })

@app.route("/study-plan")
def study_plan():

    return jsonify({
        "plan": [
            "Week 1 - Azure Fundamentals",
            "Week 2 - Azure Administration",
            "Week 3 - CI/CD Pipelines",
            "Week 4 - Monitoring & Security"
        ]
    })

@app.route("/interview-questions")
def interview_questions():

    return jsonify({
        "questions": [
            "What is CI/CD?",
            "What is Docker?",
            "Difference between Docker and Kubernetes?",
            "What is Infrastructure as Code?",
            "Explain Terraform State File."
        ]
    })

if __name__ == "__main__":
    app.run(debug=True)