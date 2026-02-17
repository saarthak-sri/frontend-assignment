# Taskflow — Full-Stack SaaS Task Dashboard

A production-ready, scalable monorepo with a Next.js frontend and Node.js/Express backend. Built for technical review as a full-stack engineer submission.

## Architecture

```
root/
├── client/   # Next.js 14 (App Router) + Tailwind + TypeScript
└── server/   # Node.js + Express + MongoDB + TypeScript
```

- **Backend**: MVC-style structure with services layer, centralized error handling, JWT auth, rate limiting, and input validation.
- **Frontend**: Feature-based folders, API abstraction (Axios), Context API for auth, protected routes, optimistic UI where appropriate.

## Setup

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- npm or yarn

### 1. Install dependencies

From the repo root:

```bash
npm install
```

This installs root and workspace dependencies (client + server).

### 2. Environment variables

**Server** — copy and edit:

```bash
cp server/.env.example server/.env
```

Required:

| Variable       | Description                    | Example                          |
|----------------|--------------------------------|----------------------------------|
| `MONGODB_URI`  | MongoDB connection string      | `mongodb://localhost:27017/saas-tasks` |
| `JWT_SECRET`   | Secret for signing JWTs        | Long random string (e.g. 32+ chars)   |
| `PORT`         | Server port (optional)         | `4000`                            |
| `CORS_ORIGIN`  | Allowed frontend origin        | `http://localhost:3000`           |
| `JWT_EXPIRES_IN` | Token expiry (optional)      | `7d`                              |

**Client** — optional, for non-default API URL:

```bash
cp client/.env.example client/.env.local
```

Set `NEXT_PUBLIC_API_URL` if the API is not at `http://localhost:4000/api`.

### 3. Run development

From the repo root:

```bash
npm run dev
```

- **Client**: [http://localhost:3000](http://localhost:3000)
- **Server**: [http://localhost:4000](http://localhost:4000)

Or run separately:

- `npm run dev:client` — Next.js (port 3000)
- `npm run dev:server` — Express (port 4000)

Ensure MongoDB is running before starting the server.

## Development workflow

1. **Backend**: Edit under `server/src/`. Restart not required when using `npm run dev` (tsx watch).
2. **Frontend**: Edit under `client/`. Next.js hot-reloads.
3. **API**: All server routes are under `/api` (e.g. `/api/auth/login`, `/api/tasks`).
4. **Auth**: Register or log in via the UI; JWT is stored in `localStorage` and sent via `Authorization: Bearer <token>`.

## API Endpoints

| Method | Path                    | Description        | Auth   |
|--------|-------------------------|--------------------|--------|
| POST   | `/api/auth/register`    | Register           | No     |
| POST   | `/api/auth/login`       | Login              | No     |
| GET    | `/api/auth/me`          | Current user       | Yes    |
| PUT    | `/api/users/profile`    | Update profile     | Yes    |
| GET    | `/api/tasks`            | List tasks (paginated, filter, search) | Yes |
| POST   | `/api/tasks`            | Create task        | Yes    |
| GET    | `/api/tasks/:id`        | Get one task       | Yes    |
| PUT    | `/api/tasks/:id`        | Update task        | Yes    |
| DELETE | `/api/tasks/:id`        | Delete task        | Yes    |

Tasks are scoped to the authenticated user; users cannot access others’ tasks.

## Production deployment

### Build

```bash
npm run build
```

- Client: `next build` (output in `client/.next`).
- Server: `tsc` (output in `server/dist`).

### Run production

1. Set `NODE_ENV=production` and production env vars for the server.
2. Serve the client with Next.js or a static export (if applicable):

   ```bash
   cd client && npm run start
   ```

3. Start the API:

   ```bash
   cd server && npm run start
   ```

4. Use a process manager (e.g. PM2) and reverse proxy (e.g. Nginx) in front of both apps. Point the client’s `NEXT_PUBLIC_API_URL` to the public API URL.

### Scaling

- **Stateless API**: JWT in Authorization header; no server-side session store. You can run multiple server instances behind a load balancer.
- **Database**: Use MongoDB replica set / Atlas for availability. Add indexes as needed (e.g. `userId` + `createdAt` on tasks is already in place).
- **Future**: Auth and tasks can be split into separate services; shared JWT validation and user context allow gradual extraction.

## Security notes

- Passwords are hashed with **bcrypt** (12 rounds).
- **JWT** is used for auth; set a strong `JWT_SECRET` and rotate it if compromised.
- **Helmet** is used for security headers.
- **CORS** is restricted via `CORS_ORIGIN` (no wildcard in production).
- **Rate limiting** is applied on `/api` (e.g. 100 requests per 15 minutes per IP).
- **express-validator** is used for input validation and sanitization.
- **No secrets** in code; all config via environment variables.
- **Task access**: Every task query and mutation filters by `userId`; users only see and modify their own tasks.

## Project structure (summary)

**Server**

- `src/config` — env and app config
- `src/models` — Mongoose schemas (User, Task)
- `src/services` — business logic (auth, user, task)
- `src/controllers` — HTTP handlers
- `src/routes` — route definitions + auth middleware
- `src/middleware` — auth, validation, error handler
- `src/utils` — AppError, validators

**Client**

- `app/` — App Router pages (landing, login, register, dashboard)
- `components/` — shared UI (Card, Skeleton, Sidebar, ThemeToggle, ProtectedRoute)
- `features/auth` — auth forms and layout
- `features/profile` — profile form and section
- `features/tasks` — task list, filters, form, empty state, pagination
- `lib/api/` — Axios client, auth/user/task API
- `context/` — AuthContext
- `hooks/` — useTheme
- `types/` — shared TypeScript types

## Quality and conventions

- No placeholder logic; all features are wired end-to-end.
- Async/await used throughout; errors surfaced via toast and API error responses.
- Consistent naming (camelCase in TS/JS, kebab for routes).
- Linting: run `npm run lint` in `client` for Next.js ESLint.
