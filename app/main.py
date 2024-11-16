from fastapi import FastAPI
from .models import Base
from .database import engine

app = FastAPI()

# Create database tables
Base.metadata.create_all(bind=engine)

@app.get("/")
async def root():
    return {"message": "Welcome to PumpPerfect API"}

# TODO: Add more routes and endpoints here
