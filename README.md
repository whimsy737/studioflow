# StudioFlow

アニメ・映像制作会社での社内SE経験および現職での業務改善経験をもとに企画・開発している個人プロジェクトです。

## Tech Stack

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS

### Backend

* FastAPI
* SQLAlchemy
* Alembic
* Pydantic

### Database

* PostgreSQL

### Infrastructure

* Docker
* Docker Compose

## Current Progress

Implemented

* Docker development environment
* PostgreSQL integration
* FastAPI backend setup
* SQLAlchemy configuration
* Alembic migration setup
* JWT authentication
* Login API
* Login page
* Database health check endpoint

In Progress

* Project management
* Task management
* Dashboard

## Architecture

```text
Browser
    │
    ▼
Next.js
    │
    ▼
FastAPI
    │
    ▼
PostgreSQL
```

## Project Structure

```text
studioflow/
├── backend/
│   ├── app/
│   ├── alembic/
│   └── pyproject.toml
│
├── frontend/
│   ├── app/
│   ├── components/
│   └── package.json
│
└── infra/
    └── docker-compose.yml
```

## Local Development

### Start PostgreSQL

```bash
docker compose -f infra/docker-compose.yml up -d
```

### Start Backend

```bash
cd backend

uv sync

uv run uvicorn app.main:app --reload
```

Backend:

```text
http://127.0.0.1:8000
```

Swagger UI:

```text
http://127.0.0.1:8000/docs
```

### Start Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend:

```text
http://localhost:3000
```

## License

MIT
