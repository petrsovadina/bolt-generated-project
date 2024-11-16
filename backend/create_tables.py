from app.database import engine
from app import models

def create_tables():
    models.Base.metadata.create_all(bind=engine)

if __name__ == "__main__":
    create_tables()
