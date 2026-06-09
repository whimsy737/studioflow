# StudioFlow

Creative production management dashboard built with Next.js, FastAPI, PostgreSQL, and Docker.

## Features

- Project CRUD
- Kanban board
- Status management
- Deadline tracking
- Search / filter / sort
- Dashboard metrics

## Live Demo

https://xxxx.vercel.app

## Tech Stack

### Frontend
- Next.js
- TypeScript
- Tailwind CSS

### Backend
- FastAPI
- SQLAlchemy
- Alembic
- PostgreSQL

### Infrastructure
- Docker
- Docker Compose

## Local Development

### 1. Start database

```bash
docker compose -f infra/docker-compose.yml up -d