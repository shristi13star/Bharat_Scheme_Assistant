from flask import Flask, request, jsonify
from flask_cors import CORS
from prompt_templates import generate_prompt
import google.generativeai as genai

from dotenv import load_dotenv
import os


app = Flask(__name__)
CORS(app)  # Allow frontend to access backend

# 🔑 Set your OpenAI key
load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))  # Replace with your key or use dotenv

model= genai.GenerativeModel("gemini-2.5-flash")

@app.route("/ask", methods=["POST"])
def ask_gemini():
    data = request.get_json()
    user_input = data.get("query", "").strip()
    state = data.get("state", "").strip()
    gender = data.get("gender", "").strip()
    goal = data.get("goal", "").strip()
    language = data.get("language", "Hinglish").strip()


    if not user_input:
        return jsonify({"error": "Empty input"}), 400

    try:
        prompt = generate_prompt(user_input,state,gender,goal,language)

        response = model.generate_content(prompt)
        reply = response.text
        return jsonify({"response": reply})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route("/list_models", methods=["GET"])
def list_models():
    # returns only models that support generateContent()
    names = []
    for m in genai.list_models():
        if "generateContent" in getattr(m, "supported_generation_methods", []):
            # m.name looks like "models/gemini-1.5-flash-002"
            # but GenerativeModel() can take the short ID too.
            names.append(m.name)
    return jsonify(names)    

if __name__ == "__main__":
    app.run(port=5000)

