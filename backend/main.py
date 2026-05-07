from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import PyPDF2
import os

app = FastAPI()

# 1. Setup CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# 2. Memory Storage
chat_history = []

class ChatRequest(BaseModel):
    message: str

# --- HELPER FUNCTIONS ---
def get_pdf_text(filename):
    # This was indented incorrectly in your draft
    path = os.path.join(os.getcwd(), filename)
    if not os.path.exists(path):
        return None
    
    text = ""
    try:
        with open(path, "rb") as f:
            reader = PyPDF2.PdfReader(f)
            for page in reader.pages:
                text += page.extract_text()
        return text
    except Exception as e:
        print(f"Error reading PDF: {e}")
        return None

# --- ENDPOINTS ---

@app.post("/chat")
async def chat_with_ai(request: ChatRequest):
    user_message = request.message
    chat_history.append({"role": "user", "content": user_message})
    
    session_length = len(chat_history)
    
    # Placeholder for the real OpenAI call (we will plug that in next)
    ai_reply = f"I've noted that, Kevin. This is our {session_length} message. How does this relate to your previous point about '{chat_history[-2]['content'] if session_length > 1 else 'starting out'}'?"

    chat_history.append({"role": "assistant", "content": ai_reply})
    return {"reply": ai_reply}

@app.post("/study-my-cv")
async def study_cv():
    # Make sure your file is named exactly 'my_cv.pdf' in the backend folder
    cv_text = get_pdf_text("KevinCV2026.pdf")
    
    if not cv_text:
        raise HTTPException(status_code=404, detail="CV file (my_cv.pdf) not found in backend folder")
    
    instruction = {
        "role": "system", 
        "content": f"You have just read Kevin's CV: {cv_text}. Provide career advice tailored to his experience."
    }
    chat_history.append(instruction)
    return {"reply": "I have studied your CV, Kevin. I'm ready to help you level up your career!"}

@app.post("/reset")
def reset_session():
    global chat_history
    chat_history = []
    return {"message": "Memory cleared!"}