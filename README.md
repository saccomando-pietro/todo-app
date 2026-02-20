# Todo App

Applicazione full-stack per la gestione di task, composta da:

- `todo-app-be`
- `todo-app-fe`

## Stack

- **Backend**: Koa, TypeScript, Mongoose, JWT, bcrypt
- **Frontend**: React, TypeScript, React Router, Vite
- **Database**: MongoDB (via Docker)

## Struttura progetto

```text
todo-app/
├─ todo-app-be/
└─ todo-app-fe/
```

## Prerequisiti

- Node.js 18+
- npm
- Docker Desktop (per MongoDB)

## Avvio rapido

### 1) Avvia MongoDB

Dalla cartella backend:

```bash
cd todo-app-be
docker compose up -d
```

MongoDB sarà disponibile su `mongodb://localhost:27017`.

### 2) Avvia backend

### Configurazione ambiente backend

Nel file `todo-app-be/.env` sono previste queste variabili:

```env
BACKEND_DOMAIN=http://localhost
BACKEND_PORT=3000
DB_URI=mongodb://localhost:27017/todo-app
FRONTEND_DOMAIN=http://localhost:5173
JWT_SECRET=<la_tua_chiave>
```

poi:

```bash
cd todo-app-be
npm install
npm run dev
```

Il backend parte su `http://localhost:3000` (in base a `.env`).

### 3) Avvia frontend

In un altro terminale:

```bash
cd todo-app-fe
npm install
npm run dev
```

Il frontend parte su `http://localhost:5173`.
