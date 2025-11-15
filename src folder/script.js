function toggleAuth(mode) {
  document.querySelector(".auth-box button").innerText = mode === "login" ? "Login" : "Sign Up";
}

function handleAuth() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const isSignup = document.querySelector('input[name="auth"]:checked').nextSibling.textContent.trim().toLowerCase() === "sign up";
  const messageBox = document.getElementById("authMessage");

  if (!username || !password) {
    messageBox.innerText = "⚠ Please enter both username and password.";
    return;
  }

  const savedUsers = JSON.parse(localStorage.getItem("users") || "{}");

  if (isSignup) {
    if (savedUsers[username]) {
      messageBox.innerText = "🚫 User already exists.";
    } else {
      savedUsers[username] = password;
      localStorage.setItem("users", JSON.stringify(savedUsers));
      messageBox.innerText = "✅ Signup successful. Now login.";
    }
  } else {
    if (savedUsers[username] === password) {
      document.getElementById("authBox").classList.add("hidden");
      document.getElementById("chatBox").classList.remove("hidden");
      document.getElementById("logoutFooter").classList.remove("hidden");
      document.getElementById("filterWrapper").classList.remove("hidden");

      document.getElementById("responseBox").style.display = "block";
      messageBox.textContent = "";
    } else {
      messageBox.innerText = "❌ Invalid username or password.";
    }
  }
}

function logout() {
  document.getElementById("chatBox").classList.add("hidden");
  document.getElementById("authBox").classList.remove("hidden");
  document.getElementById("logoutFooter").classList.add("hidden");
  document.getElementById("filterWrapper").classList.add("hidden");
  document.getElementById("exportButtons").classList.add("hidden");
  document.getElementById("responseBox").innerHTML = "";
  document.getElementById("userInput").value = "";
}

function sendQuery() {
  const input = document.getElementById("userInput").value.trim();
  const state = document.getElementById("stateSelect").value;
  const gender = document.querySelector('input[name="gender"]:checked').value;
  const goal = document.getElementById("goalSelect").value;
  const language = document.getElementById("languageSelect").value;

  const box = document.getElementById("responseBox");
  const exportDiv = document.getElementById("exportButtons");

  if (!input) return;

  box.innerHTML = `🔍 Searching schemes for: <strong>${input}</strong>...`;
  exportDiv.classList.add("hidden");

  fetch("http://localhost:5000/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: input, state, gender, goal, language })
  })
    .then(res => res.json())
    .then(data => {
      if (data.response) {
        box.innerHTML = data.response.replace(/\n/g, "<br>");
        exportDiv.classList.remove("hidden");
      } else {
        box.innerHTML = "❌ Error: " + (data.error || "Something went wrong");
      }
    })
    .catch(err => {
      console.error(err);
      box.innerHTML = "🚨 Server error. Please try again later.";
    });
}

function fillSample(text) {
  const inputBox = document.getElementById("userInput");
  inputBox.value = text;
  inputBox.focus();
}

function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const container = document.querySelector(".container");
  sidebar.classList.toggle("open");
  container.classList.toggle("shifted");
}

function startVoiceInput() {
  const micButton = document.getElementById("micButton");
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "en-IN";

  recognition.start();
  micButton.classList.add("recording");
  document.getElementById("userInput").placeholder = "🎙 Listening...";

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    document.getElementById("userInput").value = transcript;
  };

  recognition.onerror = (event) => {
    alert("Voice input failed: " + event.error);
  };

  recognition.onend = () => {
    micButton.classList.remove("recording");
    document.getElementById("userInput").placeholder = "Apna sawaal likhiye (Hindi, Hinglish)...";
  };
}

function downloadPDF() {
  const responseElement = document.getElementById("responseBox");

  if (!responseElement || !responseElement.innerText.trim()) {
    alert("⚠ No response available to download.");
    return;
  }

  // Create a visible temporary div for html2pdf to capture
  const tempDiv = document.createElement("div");
  tempDiv.style.background = "#fff";
  tempDiv.style.color = "#000";
  tempDiv.style.padding = "20px";
  tempDiv.innerHTML = `
    <h2 style="text-align: center;">Bharat Scheme Assistant - Recommendation</h2>
    <div style="font-size: 14px; line-height: 1.6;">${responseElement.innerHTML}</div>
  `;

  document.body.appendChild(tempDiv); // attach to DOM

  const opt = {
    margin: 0.5,
    filename: 'bharat_yojna_recommendation.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  };

  html2pdf().set(opt).from(tempDiv).save().then(() => {
    document.body.removeChild(tempDiv); // clean up
  });
}


function shareWhatsApp() {
  const responseText = document.getElementById("responseBox").innerText.trim();
  if (!responseText) {
    alert("⚠ Nothing to share yet!");
    return;
  }
  const message = encodeURIComponent(responseText);
  const whatsappURL = `https://wa.me/?text=${message}`;
  window.open(whatsappURL, "_blank");
}
