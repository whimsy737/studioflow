from fastapi import FastAPI
from sqlalchemy import text

from app.api.projects import router as projects_router
from app.db.session import engine

app = FastAPI()

app.include_router(projects_router, prefix="/api/v1")


@app.get("/health")
def health_check():
    return {"status": "ok"}


@app.get("/health/db")
def db_health_check():
    with engine.connect() as conn:
        conn.execute(text("SELECT 1"))

    return {"database": "ok"}