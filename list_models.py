import os
from dotenv import load_dotenv
import google.generativeai as genai


load_dotenv()

# Your Gemini API Key
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# List and print all available models
for m in genai.list_models():
    if "generateContent" in getattr(m, "supported_generation_methods", []):
        print("✅", m.name)