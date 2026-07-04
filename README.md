# Pingback — Lightweight Embedded Feedback for Indie Makers

> Collect anonymous product feedback with **zero friction**.
> Add one JS snippet to your website, SaaS, or project and start receiving feedback instantly.
> Built for indie hackers, open-source maintainers, and small teams.

---

## Live Demo

[Try the demo](https://pingback.example.com)

---

## Why?

Most product feedback tools are:

- Overkill for small projects (Canny, Hotjar)
- Require user accounts
- Hard to integrate

**Pingback** solves this with:

- 1-click embed
- Anonymous submissions
- Lightweight dashboard
- Open-source (optional self-hosting)

---

## Features

### Core Features

- Anonymous user feedback submission.
- Auto-generated shareable or embeddable widget.
- Simple admin dashboard to view and manage feedback.
- REST API to retrieve feedback.

### Optional Paid (Pro) Features (Future)

- Email / Slack notifications.
- Public feedback board.
- Team accounts.
- Advanced analytics.

---

## Tech Stack

| Layer | Tech |
|--------|------|
| Frontend | Next.js + TailwindCSS (Dashboard) |
| Backend | Go + Fiber + GORM |
| DB | PostgreSQL |
| Widget | Vanilla JS, served via CDN |
| Auth | JWT |
| DevOps | Railway (API + DB), Vercel (Next.js), GitHub Pages (widget CDN) |
| Payments | Stripe Checkout (for Pro plans) |

---

## Architecture Overview

```text
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
│              Pingback Backend (Go + Fiber)     │
│  - Store in PostgreSQL                         │
│  - JWT Auth for Dashboard                      │
│  - Expose feedback to dashboard                │
└────────────────────────────────────────────────┘
         │
         ▼
┌────────────────────────────────────────────────┐
│            Next.js Dashboard (Vercel)          │
└────────────────────────────────────────────────┘
```

---

## Quickstart (Local Development)

### Backend (Go + Fiber)

```bash
cd backend
cp .env.example .env
go mod tidy
go run main.go
```

Environment variables in `.env`:

```env
PORT=8080
DB_URL=postgresql://user:pass@localhost:5432/feedbacky
JWT_SECRET=supersecret
```

### Frontend (Next.js)

```bash
cd frontend
cp .env.local.example .env.local
npm install
npm run dev
```

Frontend environment variables:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

### Database

- Development: Run a local PostgreSQL instance.
- Production: Use Railway PostgreSQL.

### Run the Full Stack

- API → http://localhost:8080
- Dashboard → http://localhost:3000

---

## Widget Integration

Paste this into your website's `<body>`:

```html
<script
  src="https://cdn.example.com/feedback.js"
  data-project="abc123"
></script>
```

This adds a floating **"Send Feedback"** button.

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/feedback` | Submit anonymous feedback |
| GET | `/api/feedback` | Get all feedback (authentication required) |
| POST | `/api/auth/signup` | Create a dashboard account |
| POST | `/api/auth/login` | Login and receive a JWT |

---

## Deployment

### Free Hosting Stack

| Service | Usage |
|---------|-------|
| Railway | API + PostgreSQL |
| Vercel | Next.js frontend |
| GitHub Pages / jsDelivr | Serve `widget.js` |

---

## Roadmap

- Stripe payments for Pro plans
- Slack / Discord integration
- Public feedback boards
- Multi-project support
- Optional AI-powered sentiment tagging

---

## Contributing

Pull requests and issues are welcome.

If you use Pingback, we'd appreciate your feedback.

---

## License

MIT License © 2025 Jaison Dsouza

---

Crafted for indie makers who just want user feedback without the noise.

---

### Flow

1. User creates a Project.
2. User creates a Widget.
3. User configures template, theme, colors, allowed origins, and fields.
4. Frontend embeds:

```html
<script src="https://cdn.pingback.io/widget.js" data-widget-id="abc123"></script>
```

5. `widget.js` calls:

```
GET /api/widgets/abc123
```

6. The widget renders the form based on fields and theme stored in the database.
7. On submission, it sends:

```
POST /api/feedback
```

which stores a new `Feedback` record.