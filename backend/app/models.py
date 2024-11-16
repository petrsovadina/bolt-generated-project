from sqlalchemy import Column, Integer, String, DateTime, Float, ForeignKey, JSON
from sqlalchemy.sql import func
from .database import Base

class File(Base):
    __tablename__ = "files"

    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String, nullable=False)
    file_path = Column(String, nullable=False)
    upload_date = Column(DateTime(timezone=True), server_default=func.now())
    file_type = Column(String, nullable=False)  # bg, insulin, alarms, bolus, basal, cgm

class BGData(Base):
    __tablename__ = "bg_data"

    id = Column(Integer, primary_key=True, index=True)
    file_id = Column(Integer, ForeignKey("files.id"))
    timestamp = Column(DateTime, nullable=False)
    bg_value = Column(Float, nullable=False)
    bg_source = Column(String)

class InsulinData(Base):
    __tablename__ = "insulin_data"

    id = Column(Integer, primary_key=True, index=True)
    file_id = Column(Integer, ForeignKey("files.id"))
    timestamp = Column(DateTime, nullable=False)
    insulin_type = Column(String, nullable=False)  # basal, bolus
    insulin_value = Column(Float, nullable=False)

class AlarmData(Base):
    __tablename__ = "alarm_data"

    id = Column(Integer, primary_key=True, index=True)
    file_id = Column(Integer, ForeignKey("files.id"))
    timestamp = Column(DateTime, nullable=False)
    alarm_type = Column(String, nullable=False)
    alarm_description = Column(String)

class BolusData(Base):
    __tablename__ = "bolus_data"

    id = Column(Integer, primary_key=True, index=True)
    file_id = Column(Integer, ForeignKey("files.id"))
    timestamp = Column(DateTime, nullable=False)
    bolus_type = Column(String, nullable=False)  # normal, extended, multiwave
    bolus_volume = Column(Float, nullable=False)
    duration = Column(Integer)  # for extended and multiwave boluses

class BasalData(Base):
    __tablename__ = "basal_data"

    id = Column(Integer, primary_key=True, index=True)
    file_id = Column(Integer, ForeignKey("files.id"))
    timestamp = Column(DateTime, nullable=False)
    basal_rate = Column(Float, nullable=False)
    temp_basal_percent = Column(Integer)

class CGMData(Base):
    __tablename__ = "cgm_data"

    id = Column(Integer, primary_key=True, index=True)
    file_id = Column(Integer, ForeignKey("files.id"))
    timestamp = Column(DateTime, nullable=False)
    glucose_value = Column(Float, nullable=False)
    trend_arrow = Column(String)

class AnalysisResult(Base):
    __tablename__ = "analysis_results"

    id = Column(Integer, primary_key=True, index=True)
    file_id = Column(Integer, ForeignKey("files.id"))
    analysis_type = Column(String, nullable=False)
    result = Column(JSON, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
