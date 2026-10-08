# 🚀 Nexus — Full-Stack Project Management Platform

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![React Native](https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)

Nexus is an enterprise-grade Project and Task Management platform designed to streamline team collaboration. Built as a unified monorepo, Nexus provides a seamless, real-time experience across both a **Web Dashboard** and a **Mobile Application**, sharing a single source of truth via a robust **RESTful API backend**.

---

## ✨ Key Features

- **Unified Authentication:** Secure JWT-based authentication system shared across Web and Mobile platforms.
- **Cross-Platform Sync:** Any task created, updated, or completed on the web immediately syncs to the mobile app and vice-versa.
- **Command Center Dashboard:** Dynamic, timezone-aware dashboard offering real-time metric aggregations (Total Projects, Pending Tasks, Completion Rates).
- **Project Workspaces:** Organize tasks into dedicated project environments with lifecycle tracking (Start Date, End Date, Status).
- **Task Management:** Granular task control including priority sorting, deadline management, and status workflows.
- **Premium UI/UX:** A calm, minimal, and highly professional design language utilizing modern aesthetics and micro-interactions.

---

## 🏗️ System Architecture

Nexus is structured as a modern Monorepo with three distinct applications communicating seamlessly:

### 1. Web Application (`apps/web`)
- **Framework:** Next.js (React)
- **Styling:** Tailwind CSS + Shadcn UI
- **State Management:** React Hooks & Context API
- **Focus:** High-density data visualization, project administration, and enterprise productivity.

### 2. Mobile Application (`apps/mobile`)
- **Framework:** React Native + Expo
- **Language:** TypeScript
- **Icons:** Expo Vector Icons (Feather)
- **Focus:** Optimized for one-handed use, fast task creation, and on-the-go progress tracking.

### 3. Backend API (`apps/backend`)
- **Framework:** NestJS (Node.js)
- **Database ORM:** Prisma
- **Database:** SQLite (Easily swappable to PostgreSQL)
- **Security:** Passport JWT, bcrypt password hashing.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Jana-Reddy/Nexus.git
   cd Nexus
   ```

2. **Install dependencies across the monorepo**
   ```bash
   npm install
   ```

3. **Initialize the Database**
   ```bash
   cd apps/backend
   npx prisma generate
   npx prisma db push
   ```

### Running Locally

Nexus requires the backend, web, and mobile environments to run concurrently for full cross-platform functionality.

**Start the Backend API (Port 3000):**
```bash
npm run start:dev --workspace=backend
```

**Start the Web Dashboard (Port 3001):**
```bash
npm run dev --workspace=web
```

**Start the Mobile Expo App (Port 8081):**
```bash
npm run web --workspace=mobile
# Or use `npm run android` / `npm run ios` for native emulators
```

---

## 🗄️ Database Schema

The database architecture is built for scalability and strict relational integrity. Key entities include `User`, `Project`, and `Task`. 
- View the full Entity Relationship Diagram and definitions in [SCHEMA.md](./SCHEMA.md).

---

## 🛡️ Security & Authentication

- Passwords are never stored in plain text (Bcrypt hashing).
- API endpoints are protected using `@UseGuards(JwtAuthGuard)` in NestJS.
- Mobile sessions are persisted securely using `expo-secure-store`.
- Unauthenticated requests safely return `401 Unauthorized` causing elegant client-side redirects to the login portal.

---

## 👨‍💻 Author

**Jana Reddy**
- GitHub: [@Jana-Reddy](https://github.com/Jana-Reddy)

*Designed and developed as a comprehensive demonstration of Full-Stack Architecture, RESTful API design, and cross-platform UI engineering.*