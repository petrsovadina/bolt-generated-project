from pydantic import BaseModel
from datetime import datetime
from typing import Optional, Any

class FileBase(BaseModel):
    filename: str
    file_path: str
    file_type: str

class FileCreate(FileBase):
    pass

class File(FileBase):
    id: int
    upload_date: datetime

    class Config:
        orm_mode = True

class BGDataBase(BaseModel):
    timestamp: datetime
    bg_value: float
    bg_source: Optional[str] = None

class BGDataCreate(BGDataBase):
    pass

class BGData(BGDataBase):
    id: int
    file_id: int

    class Config:
        orm_mode = True

class InsulinDataBase(BaseModel):
    timestamp: datetime
    insulin_type: str
    insulin_value: float

class InsulinDataCreate(InsulinDataBase):
    pass

class InsulinData(InsulinDataBase):
    id: int
    file_id: int

    class Config:
        orm_mode = True

class AnalysisResultBase(BaseModel):
    file_id: int
    analysis_type: str
    result: Any

class AnalysisResultCreate(AnalysisResultBase):
    pass

class AnalysisResult(AnalysisResultBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True

# Přidejte další Pydantic modely pro ostatní databázové tabulky podle potřeby
