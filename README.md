# MediQueuePro

MediQueuePro is a modern medical cabinet management platform that combines a premium web interface with a
scalable backend. The monorepo hosts a **Next.js + Tailwind CSS** frontend and a **Node.js + Express + Prisma**
backend, all written in TypeScript with a shared domain model. The project ships with Docker and
GitHub Actions ready configuration hooks, enabling rapid local development and production-grade
deployments.

## Features

### Frontend
- Next.js App Router with responsive dashboards for patients, doctors, nurses, and administrators.
- Tailwind CSS design system inspired by Material Design 3 and shadcn/ui primitives.
- Queue tracker, doctor availability calendar, appointment booking wizard, and notification center.
- Light and dark themes with persistent preference.
- Integrated REST client for talking to the MediQueuePro API.

### Backend
- Express.js server with modular routing, Prisma ORM, and PostgreSQL storage.
- JWT authentication with refresh-token rotation and role-based access control (RBAC).
- REST endpoints for appointments, schedules, queue entries, prescriptions, notifications, and analytics.
- Swagger/OpenAPI documentation hosted at `/docs`.
- Seed script for generating demo users, doctors, patients, and appointments.

## Monorepo Layout

```
.
├── packages
│   ├── backend      # Express + Prisma API
│   ├── frontend     # Next.js application
│   └── shared       # Reusable TypeScript types
├── docker-compose.yml
├── Dockerfile
├── package.json
└── tsconfig.base.json
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+
- Docker Desktop (optional, for containerised development)

### Install dependencies

```bash
npm install
```

### Environment variables

Copy the sample environment files and adjust the values for your local setup.

```bash
cp packages/backend/.env.example packages/backend/.env
cp packages/frontend/.env.example packages/frontend/.env.local
```

### Database

The backend expects a PostgreSQL instance. The included `docker-compose.yml` defines a development
PostgreSQL service and the API/backend.

```bash
docker compose up --build
```

With Docker running, apply the migrations and seed data:

```bash
npm --workspace @mediqueuepro/backend run prisma:migrate
npm --workspace @mediqueuepro/backend run prisma:seed
```

### Development servers

Start both applications in watch mode:

```bash
npm run dev
```

- Frontend is available at http://localhost:3000
- Backend API is available at http://localhost:4000
- Swagger UI is available at http://localhost:4000/docs

### Production build

```bash
npm run build
```

The backend emits compiled JavaScript to `packages/backend/dist` and the frontend outputs a static
Next.js production build.

## Testing & Linting

```bash
npm run lint
```

## License

This project is provided as-is for educational purposes.
