# 📊 Financial Dashboard App

A modern stock tracking dashboard built with **Next.js**, **Prisma**, and **Recharts**. Authenticated users can search, view, and save their favorite stock symbols with real-time charts.

---

## 🚀 Features

### ✅ Authentication
- Sign up with email and password
- Sign in with credentials or **GitHub OAuth**
- User session handled via **NextAuth**
- User data persisted with **PostgreSQL + Prisma**

### 📈 Stock Dashboard
- Search for any stock symbol (e.g., `AAPL`)
- View daily historical stock chart via **Polygon.io**
- Save favorite symbols to your personal dashboard
- Realtime stock charts rendered with **Recharts**

### 🧠 State Management
- **Redux Toolkit** for global state:
  - User session
  - Saved symbols
  - Alerts

### 🔔 Alert System
- Global alerts for user actions (e.g. login, logout, fetch errors)
- Alerts auto-dismiss after a few seconds or can be closed manually

### 🛡️ Route Protection
- Auth-required pages are protected via a **Redirector** component
- Unauthorized users are redirected and shown alert messages

---

## 🛠️ Tech Stack

### Frontend
- [Next.js 14 (App Router)](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Recharts](https://recharts.org/) for charting
- [Redux Toolkit](https://redux-toolkit.js.org/)

### Backend
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/router-handlers)
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Polygon.io API](https://polygon.io/) for stock data

---

## 📦 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
