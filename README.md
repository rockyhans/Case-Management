<div align="center">

<br />

 <p align="center">
  <img src="./Preview Image" alt="Preview Image" width="700"/>
</p>


### Case Intake & Hearing Readiness Module
**Full Stack Legal Operations Platform · MERN + TypeScript**

<br />

![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-7.x-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.x-000000?style=for-the-badge&logo=express&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.x-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

<br />
</div>

---

## ✦ Overview

**Legixo** is a production-aware legal case management module that enables legal teams to:

- **Create & manage** case intake records with full CRUD operations
- **Track hearing preparation** tasks under each case with priority and status management
- **Monitor readiness** via a live dashboard with key metrics
- **Search and filter** cases by title, client, stage, or hearing date range
- **Control access** via Admin / Intern role switching

> Built as a take-home assignment for Legixo Thinklabs — Full Stack Intern role (MERN + TypeScript).

---

## ✦ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, TypeScript, Vite, Tailwind CSS |
| Backend | Node.js, Express 4, TypeScript |
| Database | MongoDB via Mongoose 7 |
| API Style | REST |
| Fonts | Playfair Display + DM Sans |
| HTTP Client | Axios |
| Routing | React Router v6 |

---

## ✦ Features

### Core
- ✅ **Case Intake CRUD** — Create, view, edit, delete cases with full validation
- ✅ **Hearing Task Tracker** — Tasks linked to cases; toggle Pending ↔ Completed
- ✅ **Dashboard Summary** — Live metrics: total cases, upcoming hearings (7 days), pending/completed tasks
- ✅ **Search & Filter** — Case-insensitive search by title or client; filter by stage & date range
- ✅ **Validation** — Frontend + backend validation with clear user-facing error messages
- ✅ **Error Handling** — Correct HTTP status codes (400, 404, 500); no crashes on failed calls
- ✅ **Cascade Delete** — Deleting a case removes all associated tasks

### Bonus
- ✅ **Role Handling** — Admin can delete; Intern can view, create, and edit only
- ✅ **UX Polish** — Shimmer skeletons, stagger animations, toast notifications, empty states, responsive layout

---

## ✦ Project Structure
```
legixo/
├── server/                         # Backend — Node + Express + TypeScript
│   ├── src/
│   │   ├── config/
│   │   │   └── db.ts               # MongoDB connection
│   │   ├── controllers/
│   │   │   ├── case.controller.ts
│   │   │   ├── task.controller.ts
│   │   │   └── dashboard.controller.ts
│   │   ├── models/
│   │   │   ├── case.model.ts
│   │   │   └── task.model.ts
│   │   ├── routes/
│   │   │   ├── case.routes.ts
│   │   │   ├── task.routes.ts
│   │   │   └── dashboard.routes.ts
│   │   ├── middlewares/
│   │   │   ├── error.middleware.ts
│   │   │   └── role.middleware.ts
│   │   ├── utils/
│   │   │   └── asyncHandler.ts
│   │   ├── app.ts
│   │   └── server.ts
│   ├── .env                        # ← env file lives here only
│   ├── package.json
│   └── tsconfig.json
│
└── client/                         # Frontend — React + TypeScript + Vite
    ├── src/
    │   ├── api/                    # Axios instances per resource
    │   ├── components/
    │   │   ├── ui/                 # Atoms: Button, Input, Modal, Badge…
    │   │   └── common/             # Molecules: PageHeader, Toast, EmptyState…
    │   ├── hooks/                  # useCases, useTasks, useDashboard, useToast
    │   ├── layouts/                # MainLayout with sidebar & topbar
    │   ├── pages/                  # Dashboard, Cases, CaseDetails
    │   ├── types/                  # Shared TypeScript interfaces
    │   └── utils/                  # formatDate, color maps
    ├── package.json
    └── vite.config.ts
```

---

## ✦ Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **MongoDB** running locally on port `27017`
  - [Install MongoDB Community](https://www.mongodb.com/try/download/community)
  - Or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (free tier)

---

### 1 · Clone the repository
```bash
git clone https://github.com/rockyhans/Case-Management.git
cd Case-Management
```

---

### 2 · Start the Backend (server)
```bash
cd server
npm install
```

Create the environment file:
```bash
# server/.env
```
```dotenv
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/application
```

Start the dev server:
```bash
npm run dev
```

> Backend runs at **http://localhost:5000**
> You should see: `MongoDB Connected` and `Server running on http://localhost:5000`

---

### 3 · Start the Frontend (client)

Open a **new terminal tab**:
```bash
cd client
npm install
npm run dev
```

> Frontend runs at **http://localhost:5173**

---

### 4 · Open in browser
```
http://localhost:5173
```

---

## ✦ API Reference

Base URL: `http://localhost:5000/api`

### Cases

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/cases` | Create a new case |
| `GET` | `/cases` | List all cases (supports `?search=`, `?stage=`, `?dateFrom=`, `?dateTo=`) |
| `GET` | `/cases/:id` | Get a single case |
| `PUT` | `/cases/:id` | Update a case |
| `DELETE` | `/cases/:id` | Delete a case + cascade delete tasks *(Admin only)* |

### Tasks

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/cases/:id/tasks` | Create a task under a case |
| `GET` | `/cases/:id/tasks` | Get all tasks for a case |
| `PUT` | `/tasks/:id` | Update a task |
| `DELETE` | `/tasks/:id` | Delete a task *(Admin only)* |
| `PATCH` | `/tasks/:id/status` | Toggle task status (Pending ↔ Completed) |

### Dashboard

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/dashboard/summary` | Returns totalCases, upcomingHearings, pendingTasks, completedTasks |

### Role Header

All mutating requests respect the `x-user-role` header:
```
x-user-role: admin    ← full access
x-user-role: intern   ← no delete
```

---

## ✦ Role-Based Access

| Action | Admin | Intern |
|---|:---:|:---:|
| View cases | ✅ | ✅ |
| Create case | ✅ | ✅ |
| Edit case | ✅ | ✅ |
| **Delete case** | ✅ | ❌ |
| View tasks | ✅ | ✅ |
| Add / edit task | ✅ | ✅ |
| Toggle task status | ✅ | ✅ |
| **Delete task** | ✅ | ❌ |

> Switch roles via the **sidebar toggle** in the bottom-left of the app. Role is stored in `localStorage` and sent as a request header on every API call.

---

## ✦ Data Models

### Case
```ts
{
  caseTitle:        string   // required, min 3 chars
  clientName:       string   // required
  courtName:        string   // required
  caseType:         string   // required
  nextHearingDate:  Date     // required
  stage:            "Filing" | "Evidence" | "Arguments" | "Order Reserved"
  notes?:           string   // optional, max 1000 chars
}
```

### Task
```ts
{
  caseId:     ObjectId  // references Case
  title:      string    // required
  dueDate:    Date      // required
  ownerName:  string    // required
  priority:   "Low" | "Medium" | "High"
  status:     "Pending" | "Completed"
}
```

---

## ✦ Assumptions & Known Limitations

- **Authentication is simulated** — role is passed via request header (`x-user-role`). In production this would come from a JWT or session token.
- **Single-tenant** — no multi-user or workspace separation.
- **No file uploads** — document attachments are out of scope per assignment spec.
- **No notifications** — email/SMS/WhatsApp integrations are excluded.
- **No deployment pipeline** — project is configured for local development only.
- **MongoDB must run locally** or a valid Atlas URI must be provided in `.env`.

---

## ✦ AI Usage Log *(Bonus)*

This project was developed with AI assistance (Claude). Here's an honest breakdown:

- **Generated with AI**: Initial boilerplate for controllers, Mongoose models, Tailwind component structure, and hook patterns.
- **Manually corrected**: 
  - Fixed async error propagation in `asyncHandler` — AI version swallowed Mongoose validation errors silently.
  - Corrected cascade delete logic — AI initially didn't await `Task.deleteMany` before deleting the case, causing a race condition.
  - Adjusted Tailwind stagger animation classes — AI used `animation-delay` inline styles which don't work with the Tailwind purge; replaced with pre-defined `stagger-N` utility classes in `index.css`.
- **Bug fixed**: The `toggleTaskStatus` controller initially returned the old status before save — fixed by calling `task.save()` and returning the result of `.save()` rather than re-querying.

> All code has been reviewed, understood, and can be explained end-to-end including data flow, API contracts, and architectural decisions.

---

<div align="left">
👤 Contributors
<table> <tr> <td align="center"> <img src="https://avatars.githubusercontent.com/u/164065390?v=4" width="80px;" alt="Danish Rizwan"/> <br /><sub><b>Danish Rizwan</b></sub><br /> <sub>Full-Stack Developer</sub> </td> </tr> </table>
📬 Contact
<br>
📧 Email: rdanishrizwan@example.com
<br>
</div>
<div align="center">

Built with precision for **Legixo Thinklabs** · Full Stack Intern Assignment

</div>
