from sqlalchemy.orm import Session
from . import models, schemas

# ... (previous code remains the same)

def create_bg_data(db: Session, bg_data: schemas.BGDataCreate):
    db_bg_data = models.BGData(**bg_data.dict())
    db.add(db_bg_data)
    db.commit()
    db.refresh(db_bg_data)
    return db_bg_data

def create_insulin_data(db: Session, insulin_data: schemas.InsulinDataCreate):
    db_insulin_data = models.InsulinData(**insulin_data.dict())
    db.add(db_insulin_data)
    db.commit()
    db.refresh(db_insulin_data)
    return db_insulin_data

# ... (rest of the code remains the same)
