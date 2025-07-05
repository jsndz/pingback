# 📣 Pingback — Lightweight Embedded Feedback for Indie Makers

> ✅ Collect anonymous product feedback with **zero friction**.
> 🔌 Add one JS snippet to your website, SaaS, or project → start receiving feedback instantly.
> 🔒 Built for indie hackers, open-source maintainers, and small teams.

---

## 🚀 Live Demo

[👉 Try the demo](https://pingback.example.com)

---

## 🎯 Why?

Most product feedback tools are:

- ❌ Overkill for small projects (Canny, Hotjar)
- ❌ Require user accounts
- ❌ Hard to integrate

**Pingback** solves this with:

- ✅ 1-click embed
- ✅ Anonymous submissions
- ✅ Lightweight dashboard
- ✅ Open-source (optional self-hosting)

---

## 🔧 Features

### ✅ Core Features:

- Anonymous user feedback submission.
- Auto-generated shareable or embeddable widget.
- Simple admin dashboard to view/manage feedback.
- REST API to retrieve feedback.

### 💡 Optional Paid (Pro) Features (Future):

- Email / Slack notifications.
- Public feedback board.
- Team accounts.
- Advanced analytics.

---

## ⚙️ Tech Stack

| Layer    | Tech                                                            |
| -------- | --------------------------------------------------------------- |
| Frontend | Next.js + TailwindCSS (Dashboard)                               |
| Backend  | Go + Fiber + GORM                                               |
| DB       | PostgreSQL                                                      |
| Widget   | Vanilla JS, served via CDN                                      |
| Auth     | JWT                                                             |
| DevOps   | Railway (API + DB), Vercel (Next.js), GitHub Pages (widget CDN) |
| Payments | Stripe Checkout (for Pro plans)                                 |

---

## 🌐 Architecture Overview

```
┌────────────────────┐       ┌────────────────────┐
│   Website Owner    │       │    Anonymous User  │
└────────┬───────────┘       └────────┬───────────┘
         │ Embed JS snippet                    │
         ├─────────────────────────────────────►│
         │                           Submit feedback
         │◄────────────────────────────────────┤
         │                            (no login needed)
         ▼
┌────────────────────────────────────────────────┐
│              Feedbacky Backend (Go + Fiber)   │
│  - Store in PostgreSQL                        │
│  - JWT Auth for Dashboard                     │
│  - Expose feedback to dashboard               │
└────────────────────────────────────────────────┘
         │
         ▼
┌────────────────────────────────────────────────┐
│            Next.js Dashboard (Vercel)         │
└────────────────────────────────────────────────┘
```

---

## 🚀 Quickstart (Local Dev)

### 📦 Backend (Go + Gin)

```bash
cd backend
cp .env.example .env
go mod tidy
go run main.go
```

Environment variables in `.env`:

```
PORT=8080
DB_URL=postgresql://user:pass@localhost:5432/feedbacky
JWT_SECRET=supersecret
```

### 🌐 Frontend (Next.js)

```bash
cd frontend
cp .env.local.example .env.local
npm install
npm run dev
```

Frontend env:

```
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

### 🛠️ Database

- Dev: Run a local PostgreSQL instance
- Prod: Use Railway Free Tier PostgreSQL

### ⚙️ Run Full Stack

- API → [http://localhost:8080](http://localhost:8080)
- Dashboard → [http://localhost:3000](http://localhost:3000)

---

## 🧑‍💻 Example Widget Integration

Paste this in your website’s `<body>`:

```html
<script
  src="https://cdn.example.com/feedback.js"
  data-project="abc123"
></script>
```

You’ll get a floating button:

> 💬 "Send Feedback"

---

## 🛡️ API Endpoints (Summary)

| Method | Endpoint           | Description                      |
| ------ | ------------------ | -------------------------------- |
| POST   | `/api/feedback`    | Submit feedback (anonymous)      |
| GET    | `/api/feedback`    | Get all feedback (auth required) |
| POST   | `/api/auth/signup` | Signup for dashboard             |
| POST   | `/api/auth/login`  | Login to get JWT token           |

---

## 🧳 Deployment

### Free Hosting Stack:

| Service                 | Usage            |
| ----------------------- | ---------------- |
| Railway                 | API + PostgreSQL |
| Vercel                  | Next.js frontend |
| GitHub Pages / jsDelivr | Serve widget.js  |

---

## 📈 Future Roadmap

- 🔜 Stripe payments for Pro plans
- 🔜 Slack / Discord integration
- 🔜 Public feedback boards
- 🔜 Multi-project support
- 🔜 Sentiment tagging (optional AI)

---

## 🤝 Contributing

PRs & issues welcome! Star the repo to support ❤️
If you use the product → tell us how you found it useful.

---

## ⚖️ License

MIT License © 2025 Jaison Dsouza

---

### Crafted for indie makers who just want user feedback without the noise.

---

    ➤ User creates a Project → creates a Widget → configures template, theme, colors, allowed origins, fields.

    ➤ Frontend embeds:

<script src="https://cdn.pingback.io/widget.js" data-widget-id="abc123"></script>

    ➤ widget.js calls:
    GET /api/widgets/abc123

    ➤ Renders form based on fields/theme from DB.

    ➤ On submit → POST to /api/feedback, saves as a Feedback row.
