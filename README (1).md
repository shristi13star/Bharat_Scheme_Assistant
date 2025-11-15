# 🇮🇳 Bharat Scheme Assistant
### *India’s AI-powered Guide to Government Schemes*
Voice-enabled • Multilingual • Personalized Recommendations

## 📌 Overview
The Bharat Scheme Assistant is a Generative AI–powered chatbot designed to help Indian citizens discover relevant government welfare schemes (Sarkari Yojnas) based on their profile. It supports Hinglish, Hindi, and English, accepts voice-based queries, and provides personalized scheme recommendations.

## 🚀 Key Features
- 🎙 Voice Input using Web Speech API
- 🌐 Multilingual Support – Hinglish, Hindi, English
- 🤖 AI-based Recommendations using Gemini 1.5 Flash
- 🎯 Personalized Filters (state, gender, goal)
- 📄 Scheme Details (eligibility, documents, process, links)
- 💾 Downloadable Output (PDF planned)
- 📱 WhatsApp Sharing
- ⚡ Lightweight Interface (HTML/CSS/JS + Flask)

## 🧠 How It Works
1. User enters a query or voice input.
2. Backend generates a dynamic prompt using filters.
3. Gemini 1.5 Flash provides scheme recommendations.
4. Frontend displays structured scheme cards.

## 🛠 Tech Stack
### Frontend
- HTML, CSS, JavaScript
- Web Speech API

### Backend
- Flask (Python)
- Flask-CORS

### AI Model
- Gemini 1.5 Flash (Zero-shot prompting)

## 📁 Project Structure
```
Bharat-Scheme-Assistant/
│
├── frontend/
│   ├── index.html
│   ├── styles.css
│   └── script.js
│
├── backend/
│   ├── app.py
│   ├── prompt_templates.py
│   └── requirements.txt
│
├── data/
│   └── schemes_dataset.csv
│
└── README.md
```

## 🧪 Testing & Evaluation
- Tested with multiple user personas
- 85% relevant scheme recommendations
- High clarity in Hinglish responses

## 🔮 Future Enhancements
- API integration for real-time scheme updates
- Regional language support
- Application form assistance
- Deadline reminders
- Offline access

## 👥 Team Members
- Shristi Singh – Prompt Engineering, Backend
- Anjali Dwivedi – Backend, Filter Logic
- Shruti Chauhan – Frontend UI, Voice
- Banothu Anjali – Frontend Responsiveness
- Sakshi Shroff – Data Curation
- Swadha Bhatnagar – Testing, Report

Faculty Advisor: Dr. Kamal Kumar
