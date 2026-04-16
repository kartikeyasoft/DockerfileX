# 📜 Productivity Spellbook

A beautiful, dark‑themed task management app that stores everything **locally in your browser** – no backend, no API keys, no database required.  
Built with React, styled‑components, and nginx for static serving.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![React](https://img.shields.io/badge/React-18-61dafb)
![License](https://img.shields.io/badge/license-MIT-green)

---

## ✨ Features

- **🔮 Dark cosmic UI** – neon cyan/blue accents, glassmorphism, smooth animations.
- **✅ Task (spell) management** – add, complete, delete, and filter tasks.
- **⏰ Priority levels** – High (🔴), Medium (🟡), Low (🟢) with colour‑coded borders.
- **📅 Due dates** – set a deadline for each spell.
- **🔍 Search & filter** – filter by All / Pending / Completed, and search by text.
- **💾 100% client‑side** – all data lives in your browser’s `localStorage`.  
  No data leaves your machine, no sign‑up, no cloud.
- **📊 Statistics bar** – shows total, completed, pending, and high‑priority pending tasks.
- **🗑️ Individual deletion** – remove spells you no longer need.
- **🧹 Clear completed** – bulk clean‑up with one click.
- **🐳 Docker‑ready** – serves the static build via nginx, container stays alive with no backend dependency.

---

## 🚀 How It Works (the magic)

1. **You type a task** (e.g., “Finish quarterly report”), choose a priority, and optionally add a due date.
2. **Click “Cast Spell”** – the task appears at the top of the list.
3. **Click any task card** to toggle between *Pending* and *Executed* (completed).
4. **Delete** a task using the 🗑️ button (confirmation pop‑up).
5. **Use filters** to view only pending or only completed spells.
6. **Search** for specific tasks by name.
7. **All data** is automatically saved to `localStorage` – refresh the page or close the browser, your spells remain.
8. **No backend** – the React app is built into static files and served by nginx.  
   The nginx configuration has **no reverse proxy** to any backend service, so the container starts instantly and stays running.

---

## 🛠️ Running Locally (without Docker)

### Prerequisites
- Node.js 18+ and npm

### Steps
```bash
# Clone or download the project
cd frontend

# Install dependencies
npm install

# Start the development server
npm start

The app will open at `http://localhost:3000`.

### Build for production
```bash
npm run build
```
The static files will be in the `build/` folder – you can serve them with any static server (e.g., `serve -s build`).

---

## 📁 Project Structure (relevant files)

```
frontend/
├── src/
│   ├── App.js          # Main React component (the spellbook)
│   └── index.js        # Entry point
├── public/
│   └── index.html
├── Dockerfile          # Multi‑stage build (Node → nginx)
├── package.json
└── README.md
```

## 🐳 Running with Docker (recommended)

The project includes a **two‑stage Dockerfile** that builds the React app and serves it with nginx.  
The nginx configuration contains **no proxy to a backend**, so the container will not crash with `host not found` errors.

### Build the image
```bash
docker build -t productivity-spellbook .
```

### Run the container
```bash
docker run -d -p 8080:80 --name spellbook productivity-spellbook
```

### Access the app
Open your browser and go to `http://localhost:8080`

### Stop and remove
```bash
docker stop spellbook && docker rm spellbook
```



