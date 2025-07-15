# 🛰️ Mini Footfall Monitoring System

A full-stack, Dockerized web application that simulates real-time footfall data using IoT-style sensors. It visualizes analytics in a modern dashboard, manages device statuses, and aggregates traffic data hourly using the MERN stack.

---

## 📌 Project Overview

This project replicates a simplified smart infrastructure monitoring system. It simulates two sensors sending hourly footfall data to a backend server, which aggregates and stores it in MongoDB. A frontend dashboard visualizes the data with charts, device statuses, and a static map showing sensor positions.

---

## 🔧 Features

- 🛰️ **Sensor Simulation**: Two sensors send hourly footfall data using a Node.js simulator.
- 📡 **RESTful API Backend**:
  - `POST /sensor-data` – Ingests sensor data
  - `GET /analytics` – Returns aggregated footfall data by hour/day
  - `GET /devices` – Returns list of devices with active/inactive status
- 📊 **Interactive Dashboard**:
  - Real-time line chart comparing Sensor 1 and Sensor 2
  - Summary of today’s total footfall per sensor
  - Device status cards (Active/Inactive based on last seen)
- 🐳 **Dockerized Deployment** using `docker-compose` for easy local orchestration

---

## 🛠️ Tech Stack

### 💻 Frontend (React.js + Vite)
- `React.js` + `Vite`
- `Recharts` for real-time footfall charts
- `Tailwind CSS` (or utility-first classes) for UI styling
- `axios` for API calls

### 🧠 Backend (Node.js + Express.js)
- `Express.js` REST API
- `MongoDB` with `Mongoose` ODM
- Sensor activity calculated based on last update timestamp

### 📡 Sensor Simulator
- Node.js script that mimics two sensors
- Sends data every simulated hour using random footfall values

### 🐳 Docker & DevOps
- `Dockerfile` for client, server, and sensor-simulator
- `docker-compose.yml` for full local orchestration (includes MongoDB)
- Ports:
  - Frontend: `localhost:5173`
  - Backend: `localhost:8000`
  - MongoDB: `localhost:27017`

---

## 🚀 Getting Started

### Prerequisites:
- Docker & Docker Compose installed
- (Optional) Node.js locally if running without Docker

### 📦 Clone the repository:
```bash
git clone https://github.com/your-username/mini-footfall-monitoring-system.git
cd mini-footfall-monitoring-system
