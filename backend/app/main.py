from fastapi import FastAPI
from sqlalchemy import text

from app.db.session import engine

app = FastAPI()


@app.get("/health")
def health_check():
    return {"status": "ok"}


@app.get("/health/db")
def db_health_check():
    with engine.connect() as conn:
        conn.execute(text("SELECT 1"))

    return {"database": "ok"}