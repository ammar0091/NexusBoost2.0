# NexusBoost

Full-stack setup:
- `frontend/` React + Vite marketing site
- `backend/` Node.js + Express + MongoDB API

## Local setup

### Backend

1. In `backend`, create `.env` from `.env.example`.
2. Start MongoDB locally or point `MONGO_URI` to Atlas.
3. Run:

```bash
cd backend
npm install
npm run dev
```

### Frontend

1. In `frontend`, create `.env` from `.env.example`.
2. Run:

```bash
cd frontend
npm install
npm run dev
```

## Production checks

Backend:

```bash
cd backend
npm run check
```

Frontend:

```bash
cd frontend
npm run check
```

## Vercel deployment (recommended)

Deploy `frontend` and `backend` as two separate Vercel projects.

### 1) Backend project (`nexusboost/backend`)

- Framework preset: `Other`
- Uses `backend/vercel.json` and `backend/api/index.js` (serverless entrypoint)
- Required env vars:

```env
NODE_ENV=production
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_strong_secret
ADMIN_EMAIL=admin@yourdomain.com
ADMIN_PASSWORD=your_strong_admin_password
CORS_ORIGINS=https://your-frontend-domain.vercel.app
ALLOW_VERCEL_PREVIEW_ORIGINS=true
JSON_BODY_LIMIT=2mb
MONGO_MAX_POOL_SIZE=10
```

### 2) Frontend project (`nexusboost/frontend`)

- Framework preset: `Vite`
- Uses `frontend/vercel.json` for SPA rewrites + security/caching headers
- Required env vars:

```env
VITE_API_BASE_URL=https://your-backend-domain.vercel.app/api
VITE_API_TIMEOUT_MS=15000
VITE_SITE_URL=https://your-frontend-domain.vercel.app
VITE_ENABLE_CONTENT_FALLBACK=false
```

## Security and performance hardening included

- Helmet headers + compression enabled on backend
- `x-powered-by` disabled, trust proxy enabled for production infra
- Route rate limiting with cleanup and rate-limit headers
- Public API cache headers for read endpoints
- No-store policy for auth/admin/form endpoints
- Static uploads served with long cache headers
- Frontend static assets shipped with immutable cache headers on Vercel

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
