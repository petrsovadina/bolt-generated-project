from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class File(Base):
    __tablename__ = "files"

    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String, index=True)
    upload_date = Column(DateTime)

class BGData(Base):
    __tablename__ = "bg_data"

    id = Column(Integer, primary_key=True, index=True)
    file_id = Column(Integer, ForeignKey("files.id"))
    timestamp = Column(DateTime)
    bg_value = Column(Float)

class InsulinData(Base):
    __tablename__ = "insulin_data"

    id = Column(Integer, primary_key=True, index=True)
    file_id = Column(Integer, ForeignKey("files.id"))
    timestamp = Column(DateTime)
    insulin_value = Column(Float)

class AlarmData(Base):
    __tablename__ = "alarm_data"

    id = Column(Integer, primary_key=True, index=True)
    file_id = Column(Integer, ForeignKey("files.id"))
    timestamp = Column(DateTime)
    alarm_type = Column(String)
    description = Column(String)

class BolusData(Base):
    __tablename__ = "bolus_data"

    id = Column(Integer, primary_key=True, index=True)
    file_id = Column(Integer, ForeignKey("files.id"))
    timestamp = Column(DateTime)
    bolus_value = Column(Float)

class BasalData(Base):
    __tablename__ = "basal_data"

    id = Column(Integer, primary_key=True, index=True)
    file_id = Column(Integer, ForeignKey("files.id"))
    timestamp = Column(DateTime)
    basal_rate = Column(Float)

class CGMData(Base):
    __tablename__ = "cgm_data"

    id = Column(Integer, primary_key=True, index=True)
    file_id = Column(Integer, ForeignKey("files.id"))
    timestamp = Column(DateTime)
    cgm_value = Column(Float)

class AnalysisResult(Base):
    __tablename__ = "analysis_results"

    id = Column(Integer, primary_key=True, index=True)
    file_id = Column(Integer, ForeignKey("files.id"))
    analysis_type = Column(String)
    result = Column(String)
    timestamp = Column(DateTime)
