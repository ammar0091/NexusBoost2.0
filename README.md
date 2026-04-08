# NexusBoost

Full-stack setup with:
- `frontend/` React + Vite marketing site
- `backend/` Node.js + Express + MongoDB API

## Backend setup

1. In `backend`, create `.env` from `.env.example`.
2. Start MongoDB locally or point `MONGO_URI` to your hosted database.
3. Install and run:

```bash
cd backend
npm install
npm run dev
```

Example `backend/.env`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/nexusboost
JWT_SECRET=replace_with_a_strong_secret_key
ADMIN_EMAIL=admin@nexusboost.local
ADMIN_PASSWORD=replace_with_a_strong_admin_password
CORS_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
NODE_ENV=development
```

Notes:
- In production, set a strong `JWT_SECRET`.
- In production, set explicit `ADMIN_EMAIL` and `ADMIN_PASSWORD`.
- Login, contact, and newsletter routes include basic rate limiting.
- Health endpoints available:
  - `GET /api/health`
  - `GET /api/health/live`
  - `GET /api/health/ready`

## Frontend setup

1. In `frontend`, create `.env` from `.env.example`.
2. Install and run:

```bash
cd frontend
npm install
npm run dev
```

Example `frontend/.env`:

```env
VITE_API_BASE_URL=
VITE_DEV_API_PROXY=http://localhost:5000
VITE_API_TIMEOUT_MS=15000
VITE_SITE_URL=https://nexusboost.com
VITE_ENABLE_CONTENT_FALLBACK=false
```

Notes:
- Keep `VITE_API_BASE_URL` empty for same-domain `/api` usage.
- Use `VITE_ENABLE_CONTENT_FALLBACK=true` only for demo/dev content mode.

## Quality checks

Backend:

```bash
cd backend
npm run test
npm run check
```

Frontend:

```bash
cd frontend
npm run lint
npm run build
npm run check
```

## Docker deployment

A dockerized setup is available using root `docker-compose.yml`.

```bash
docker compose up --build
```

Services:
- Frontend: `http://localhost:8080`
- Backend API: `http://localhost:5000`
- MongoDB: `mongodb://localhost:27017`

Before production deployment, update secrets in `docker-compose.yml` or inject env values from your platform secret manager.

## Admin panel

- Login URL: `http://localhost:5173/admin/login`
- Route is protected on the frontend.
- Token expiry is checked before admin access is allowed.

Admin panel currently supports:
- Blog CRUD
- Project CRUD
- Client CRUD
- Team CRUD
- Contact lead status management
- Newsletter subscriber listing

## Public API used by frontend

- `GET /api/blogs`
- `GET /api/blogs/slug/:slug`
- `GET /api/projects`
- `GET /api/clients`
- `GET /api/teams`
- `POST /api/contact`
- `POST /api/newsletter`

## Production notes

- Reverse proxy `/api` to the backend if frontend and backend share one domain.
- If backend is on a separate domain, set:

```env
VITE_API_BASE_URL=https://your-backend-domain.com/api
```

- Add production frontend domains to backend `CORS_ORIGINS`.
- Disable demo fallback content in production.
