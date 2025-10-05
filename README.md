
# 🧠 TeraAI

**TeraAI** is a personal project — a minimalist, friendly AI assistant built for learning and experimentation.
It’s designed to provide clean, simple interactions through a lightweight front-end and a secure Node.js backend.

Currently, **TeraAI** uses a **free API key**, which may result in **slower response times** at times.
Upgrades and optimizations are planned in future releases to improve performance and reliability.

> 💬 *Built with simplicity, curiosity, and a vision for smarter assistance.*

---

## ⚙️ Tech Stack

### 🖥️ **Frontend**

* HTML5
* Bootstrap 4 (CDN)
* Vanilla JavaScript
* Marked.js for Markdown rendering

### ⚡ **Backend**

* Node.js + Express
* CORS
* dotenv
* node-fetch

### 🤖 **AI API**

* OpenRouter Chat Completions
* Model: `deepseek/deepseek-r1:free`
* Accessed securely via a server-side proxy

### 🔐 **Configuration**

`.env` file contains:

```
OPENROUTER_API_KEY=
HTTP_REFERER=
X_TITLE=
PORT=
```

### 🧩 **Runtime**

* Local Node.js server
* PowerShell used to export environment variables

---

## 🚀 Features

* Minimal, responsive chat UI
* Markdown message rendering (via Marked.js)
* Secure server-side API requests
* Friendly and lightweight design
* Works locally with .env configuration

---

## 🧱 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/<your-username>/TeraAI.git
   cd TeraAI
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create a `.env` file**
   Add your environment variables:

   ```bash
   OPENROUTER_API_KEY=your_api_key_here
   HTTP_REFERER=your_project_url
   X_TITLE=TeraAI
   PORT=3000
   ```

4. **Run the local server**

   ```bash
   node server.js
   ```

   or

   ```bash
   npm start
   ```

5. **Access the app**
   Open your browser and go to:

   ```
   http://localhost:3000
   ```

---

## 💡 Future Plans

* Upgrade to a premium API key for faster, more stable responses
* Add typing animations and smoother UI transitions
* Implement conversation history and localStorage caching
* Explore voice input/output integration
* Add dark/light mode toggle

---

## 🧑‍💻 Author

**Julian Villete**

> Passionate about simplicity, code, and creative learning.

---

## 🪪 License

This project is released under the **MIT License**.
Feel free to explore, modify, and build upon it — just credit the original author.

---

