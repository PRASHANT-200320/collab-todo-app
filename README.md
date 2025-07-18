# 🧠 Collab ToDo App – Real-Time Task Board

A real-time collaborative Kanban task board built using **React**, **Node.js**, **Express**, **MongoDB**, and **Socket.IO**. Inspired by Trello, it enables multiple users to manage tasks with live sync, smart assignment, and activity logs.

---

## 🔗 Live Demo

- 🔹 Frontend: [collab-todo-app-iota.vercel.app](https://collab-todo-app-iota.vercel.app/)
- 🔹 Backend API: [collab-todo-app-o89g.onrender.com](https://collab-todo-app-o89g.onrender.com)

---

## 🚀 Features

- 🔐 JWT-based User Authentication
- 👥 Role-based task assignment
- ✅ Create, update, drag-and-drop task status
- 📅 Due date and priority management
- 🔄 Real-time updates via **Socket.IO**
- 🧠 Smart assignment to the user with least workload
- 📬 Email notifications (Nodemailer ready)
- 📜 Activity log with timestamps
- 🔎 Task filtering and search

---

## 📁 Folder Structure

📦collab-todo-app
┣ 📂client (React frontend)
┃ ┣ 📂components
┃ ┣ 📂context
┃ ┣ 📜App.js
┃ ┗ ...
┣ 📂server (Node.js backend)
┃ ┣ 📂controllers
┃ ┣ 📂models
┃ ┣ 📂routes
┃ ┣ 📂middleware
┃ ┣ 📜socket.js
┃ ┗ 📜server.js
┣ 📜README.md
┗ ...


---

## 🛠️ Tech Stack

- **Frontend:** React, Axios, Socket.IO Client, CSS
- **Backend:** Node.js, Express.js, Socket.IO, Mongoose
- **Database:** MongoDB Atlas
- **Auth:** JWT
- **Deployment:** Vercel (Frontend), Render (Backend)
- **Email Service:** Nodemailer (Optional)

---

## 📦 Installation

1. **Clone the repo**

```bash
git clone https://github.com/PRASHANT-200320/collab-todo-app.git
cd collab-todo-app

2 Backend setup

cd server
npm install
cp .env.example .env   # add your Mongo URI and JWT secret
npm run dev

3 Frontend setup

cd client
npm install
npm start

🤝 Contributing
Pull requests are welcome. For major changes, open an issue first to discuss what you'd like to change.


