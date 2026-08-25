import os

from fastapi import FastAPI
from sqlalchemy import create_engine, text

app = FastAPI()

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql+psycopg://postgres:postgres@localhost:5432/c216",
)

engine = create_engine(DATABASE_URL)


@app.get("/")
def read_root():
    return {"message": "C216 - Sistemas Distribuídos"}


@app.get("/health")
def health_check():
    try:
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))
        return {"status": "ok", "database": "connected"}
    except Exception as error:
        return {"status": "error", "database": "disconnected", "detail": str(error)}