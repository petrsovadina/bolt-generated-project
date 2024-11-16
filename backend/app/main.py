from fastapi import FastAPI
from .logger import log

app = FastAPI()

@app.get("/")
async def root():
    log.info("Root endpoint was called")
    return {"message": "Hello World"}

# Použijte log.info(), log.error() atd. v dalších částech aplikace
