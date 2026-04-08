# 🌸 AI Smart Mom & Baby Super App

A fullstack SaaS application for mothers to track baby growth, manage daily routines, and receive AI-powered insights.

## 🚀 Tech Stack

### Backend
- NestJS (TypeScript)
- PostgreSQL + TypeORM
- Redis + BullMQ
- JWT Authentication
- WebSockets

### Frontend
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Zustand

### Cloud & Tools
- AWS S3 (file storage)
- AWS SES (email service)
- Docker
- GitHub Actions (CI/CD)

---

## ✨ Features

- 🔐 Authentication (JWT + Refresh tokens)
- 👶 Baby tracking (sleep, food, growth)
- 📊 Smart dashboard (charts & analytics)
- 🤖 AI recommendations (meal, sleep)
- 🔔 Real-time notifications (WebSockets)
- ⚙️ Background jobs (BullMQ)
- ☁️ File upload (S3)
- 📧 Email system (SES)
- 📄 PDF & Excel reports
- 📸 Screenshot generator
- 💳 Subscription system (optional)

---

## 📦 Project Structure

/apps
/backend (NestJS)
/frontend (Next.js)
/packages (shared types)

---

## 🧠 Architecture

- Modular monolith (can scale to microservices)
- Clean architecture (services, modules, DTOs)
- Event-driven jobs (queues)

---

## 🛠️ Getting Started

### Install pnpm
npm install -g pnpm

---

### Backend
cd backend
pnpm install
pnpm start:dev

---

### Frontend
cd frontend
pnpm install
pnpm dev
