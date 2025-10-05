#### Feel free to contact me through the following profiles:

#### 🔗 [Linkedin](https://www.linkedin.com/in/andrespds/) | 💻 [GitHub](https://github.com/tobproject) | 📸 [Instagram](https://www.instagram.com/tob_project/)

---

# 🚀 Real-Time Mini Chat v0.2

![Node.js](https://img.shields.io/badge/Node.js-18+-green) ![npm](https://img.shields.io/badge/npm-latest-blue) ![Build](https://img.shields.io/badge/build-passing-brightgreen) ![Version](https://img.shields.io/badge/version-v0.2-yellow)

A **real-time chat** allowing multiple users to communicate simultaneously, with login system, online users list, notifications, and optional MongoDB storage.

---

## ✅ Features

* 🟢 User login system (unique username per connection)
* 💬 Real-time messaging with Socket.io
* 📜 Auto-scroll messages
* 👥 List of online users
* 🔔 Notifications for user joined/left
* 💾 Optional MongoDB storage
* 🛠️ Local fallback if MongoDB fails
* 🔢 Maximum 50 messages retained
* 🌐 Multiple tabs support
* 🎨 Responsive interface (HTML/CSS)
* ⚡ Future: emojis/reactions and enhanced UI

---
	
## 📷 Screenshots / GIFs

<div align="center">

| Login / Chat | Online Users & Messages |
|---:|:---|
| <img src="assets/screenshots/Login_Chat_screenshot.png" alt="Login / Chat GUI" width="420"/> | <img src="assets/screenshots/Online_Users_Messages_screenshot.png" alt="Online Users & Messages GUI" width="420"/> |
| *Figure 1 — Login / Chat GUI* | *Figure 2 — Online Users & Messages GU* |
</div>

---

## 📌 Roadmap

| Feature                | Status     | Version |
| ---------------------- | ---------- | ------- |
| User login system      | ✅ Done     | v0.2    |
| Real-time messaging    | ✅ Done     | v0.2    |
| Online users list      | ✅ Done     | v0.2    |
| Notifications          | ✅ Done     | v0.2    |
| MongoDB storage        | ✅ Done     | v0.2    |
| Local fallback         | ✅ Done     | v0.2    |
| Limit last 50 messages | ✅ Done     | v0.2    |
| Multiple tabs support  | ✅ Done     | v0.2    |
| Emojis / Reactions     | 🚧 Pending | v0.3    |
| Enhanced UI/UX         | 🚧 Pending | v0.3    |

---

## 🔧 Requirements

* **Node.js 18+**
* **npm** (Node Package Manager)
* **MongoDB** (optional for message persistence)

### Node.js Packages

* `express` → Web server
* `socket.io` → Real-time communication
* `mongoose` → MongoDB connection
* `dotenv` → Environment variable loader
* `nodemon` → Dev hot-reload (optional)

Install dependencies:

```bash
install_dependencies.cmd
```

---

## ⚡ How to Run Locally

1. Clone repository:

```bash
git clone https://github.com/tobproject/mini_chat.git
cd mini-chat-v0.2
```

2. Create `.env`:

```env
MONGO_URI=mongodb+srv://usuario:password@cluster.mongodb.net/chat
STORAGE=mongo
PORT=3000
```

3. Install dependencies:

```bash
install_dependencies.cmd
```

4. Run server:

```bash
npm run dev
```

5. Open browser:

```
http://localhost:3000
```

6. Enter your username and chat!

   * Open multiple tabs to test multiple users.

---

## 🌐 Deployment

* **Render**: Create Web Service → Connect GitHub → Deploy → Get URL
* **Railway**: New Project → Deploy from GitHub → Select `index.js` as entry point
* Public Access URL: `[insert URL]`

---

## 📂 Project Structure

```
mini-chat-v0.2/
├── index.js
├── package.json
├── package-lock.json
├── .env
├── install_dependencies.cmd
├── README.md
└── public/
    ├── index.html
    ├── style.css
    └── script.js
```

---

## 📝 Notes

* `STORAGE=local` allows testing without MongoDB.
* `socket.id` ensures unique users per tab/browser.
* Notifications use 🔔 icon.
* Last 50 messages stored in memory/local DB.
* Future updates: emojis, reactions, enhanced UI/UX.
