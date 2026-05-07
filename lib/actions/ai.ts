"use server";

export async function askAssistant(userMessage: string) {
  try {
    const response = await fetch("http://127.0.0.1:8000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: userMessage }),
    });

    if (!response.ok) throw new Error("Backend is offline");

    const data = await response.json();
    return data.reply; // This is the string from your Python code
  } catch (error) {
    console.error("AI Error:", error);
    return "Sorry, the Brain is resting right now.";
  }
}
export async function studyMyCV() {
  try {
    const response = await fetch("http://127.0.0.1:8000/study-my-cv", {
      method: "POST", // This matches the @app.post in Python
    });
    
    const data = await response.json();
    return data.reply; // This will be "I have studied your CV, Kevin..."
  } catch (error) {
    console.error("Error studying CV:", error);
    return "Failed to connect to the Python Brain.";
  }
}