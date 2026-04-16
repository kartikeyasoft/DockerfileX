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

### 1. Install Nginx and Node.js 
```bash
sudo apt update
sudo apt install -y nginx curl
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
```

### 2. Build the React app
```bash
cd /path/to/DockerfileX
npm install
npm run build
```
This creates a `build/` directory with static files.

### 3. Copy the build to Nginx web root
```bash
sudo rm -rf /var/www/html/*
sudo cp -r build/* /var/www/html/
```

### 4. Configure Nginx as reverse proxy (to forward `/api` to your backend)
Create a new Nginx configuration file:
```bash
sudo tee /etc/nginx/sites-available/magic-hub-frontend > /dev/null << 'EOF'
server {
    listen 80;
    server_name _;

    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:5000;   # Replace with actual backend IP <BACKEND_IP>
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF
```
**Important**: Replace `<BACKEND_IP>` with the actual IP address of your backend VM (e.g., `192.168.29.38`).

### 5. Enable the site and restart Nginx
```bash
sudo ln -sf /etc/nginx/sites-available/magic-hub-frontend /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl restart nginx
```

### 6. Allow HTTP in firewall (if enabled)
```bash
sudo ufw allow 80/tcp
```

### 8. Access the frontend
Open a browser and go to `http://<vm-ip>`.  
You should see the **Productivity Spellbook** UI.


