const API_KEY = "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";

const sendBtn = document.getElementById("sendBtn");
const responseBox = document.getElementById("response");
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

// ✅ Toggle menu on small screens
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// ✅ Send question to Groq API
sendBtn.addEventListener("click", async () => {
  const question = document.getElementById("question").value.trim();
  if (!question) {
    responseBox.innerText = "⚠️ Please enter a question!";
    return;
  }

  responseBox.innerText = "⏳ Thinking...";

  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          { role: "system", content: "You are an assistant helping farmers with crops, market prices, and farming tips." },
          { role: "user", content: question }
        ],
        temperature: 0.7
      })
    });

    const data = await res.json();
    responseBox.innerText = data.choices?.[0]?.message?.content || "⚠️ No answer received.";
  } catch (error) {
    console.error(error);
    responseBox.innerText = "❌ Error connecting to the server.";
  }
});
