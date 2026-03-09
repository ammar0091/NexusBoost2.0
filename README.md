# NexusBoost

Full-stack setup with:
- `frontend/` React + Vite site
- `backend/` Node.js + Express + MongoDB API

## 1. Backend setup (MongoDB Compass local)

1. Install and run local MongoDB service.
2. Open MongoDB Compass and connect with:
   - `mongodb://127.0.0.1:27017`
3. In `backend`, create `.env` from `.env.example`.

Example `backend/.env`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/nexusboost
JWT_SECRET=replace_with_strong_secret
ADMIN_EMAIL=admin@nexusboost.local
ADMIN_PASSWORD=Admin@12345
CORS_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
```

4. Start backend:

```bash
cd backend
npm install
npm run dev
```

Default admin user is auto-seeded on first run from `ADMIN_EMAIL` and `ADMIN_PASSWORD`.

## 2. Frontend setup

1. In `frontend`, create `.env` from `.env.example`.

Example `frontend/.env`:

```env
VITE_API_BASE_URL=
VITE_DEV_API_PROXY=http://localhost:5000
VITE_API_TIMEOUT_MS=15000
```
`VITE_API_BASE_URL` empty chhodne par frontend `/api` use karega (dev me Vite proxy, prod me same-domain API).

2. Start frontend:

```bash
cd frontend
npm install
npm run dev
```

## 3. Admin panel

- Login URL: `http://localhost:5173/admin/login`
- Default creds (if unchanged):
  - Email: `admin@nexusboost.local`
  - Password: `Admin@12345`

Admin panel supports:
- Blog CRUD
- Project CRUD
- Client CRUD
- Contact lead status management
- Newsletter subscriber listing

## 4. Public API used by frontend

- `GET /api/blogs`
- `GET /api/projects`
- `GET /api/clients`
- `POST /api/contact`
- `POST /api/newsletter`

## 5. Production notes

- Agar frontend aur backend same domain pe deploy ho rahe hain, reverse proxy se `/api` backend app pe route karo.
- Agar backend alag domain pe hai, frontend build env me set karo:
  - `VITE_API_BASE_URL=https://your-backend-domain.com/api`
- Backend env me production frontend domains `CORS_ORIGINS` me comma-separated add karo.
