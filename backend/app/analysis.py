import pandas as pd
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from . import crud
from typing import List, Dict, Any
from .ml_models import get_glucose_prediction

def perform_analysis(db: Session, file_id: int, start_date: datetime, end_date: datetime, analysis_type: str) -> Dict[str, Any]:
    bg_data = crud.get_bg_data_by_file_and_date_range(db, file_id, start_date, end_date)
    insulin_data = crud.get_insulin_data_by_file_and_date_range(db, file_id, start_date, end_date)
    
    bg_df = pd.DataFrame([b.__dict__ for b in bg_data])
    insulin_df = pd.DataFrame([i.__dict__ for i in insulin_data])
    
    # Merge data on timestamp
    merged_df = pd.merge(bg_df, insulin_df, on='timestamp', how='outer')
    merged_df.sort_values('timestamp', inplace=True)
    
    if analysis_type == 'hourly':
        analysis_data = hourly_analysis(merged_df)
    elif analysis_type == 'daily':
        analysis_data = daily_analysis(merged_df)
    elif analysis_type == 'weekly':
        analysis_data = weekly_analysis(merged_df)
    else:
        raise ValueError("Invalid analysis type")
    
    # Add predictions
    predictions = get_glucose_prediction(db, file_id, periods=24)
    
    # Calculate additional metrics
    metrics = calculate_metrics(merged_df)
    
    return {
        "analysis_data": analysis_data,
        "predictions": predictions,
        "metrics": metrics
    }

def hourly_analysis(df: pd.DataFrame) -> List[Dict[str, Any]]:
    df['hour'] = df['timestamp'].dt.hour
    hourly_data = df.groupby('hour').agg({
        'bg_value': ['mean', 'min', 'max'],
        'insulin_value': 'mean',
        'timestamp': 'first'
    }).reset_index()
    
    hourly_data.columns = ['hour', 'bg_mean', 'bg_min', 'bg_max', 'insulin_mean', 'timestamp']
    hourly_data['time_in_range'] = calculate_time_in_range(df, 70, 180)
    
    return hourly_data.to_dict('records')

def daily_analysis(df: pd.DataFrame) -> List[Dict[str, Any]]:
    df['date'] = df['timestamp'].dt.date
    daily_data = df.groupby('date').agg({
        'bg_value': ['mean', 'min', 'max'],
        'insulin_value': 'sum',
        'timestamp': 'first'
    }).reset_index()
    
    daily_data.columns = ['date', 'bg_mean', 'bg_min', 'bg_max', 'insulin_total', 'timestamp']
    daily_data['time_in_range'] = df.groupby('date').apply(lambda x: calculate_time_in_range(x, 70, 180)).values
    
    return daily_data.to_dict('records')

def weekly_analysis(df: pd.DataFrame) -> List[Dict[str, Any]]:
    df['week'] = df['timestamp'].dt.to_period('W').astype(str)
    weekly_data = df.groupby('week').agg({
        'bg_value': ['mean', 'min', 'max'],
        'insulin_value': 'sum',
        'timestamp': 'first'
    }).reset_index()
    
    weekly_data.columns = ['week', 'bg_mean', 'bg_min', 'bg_max', 'insulin_total', 'timestamp']
    weekly_data['time_in_range'] = df.groupby('week').apply(lambda x: calculate_time_in_range(x, 70, 180)).values
    
    return weekly_data.to_dict('records')

def calculate_time_in_range(df: pd.DataFrame, lower_bound: int, upper_bound: int) -> float:
    in_range = ((df['bg_value'] >= lower_bound) & (df['bg_value'] <= upper_bound)).sum()
    total_readings = len(df)
    return (in_range / total_readings) * 100 if total_readings > 0 else 0

def calculate_metrics(df: pd.DataFrame) -> Dict[str, Any]:
    return {
        "average_glucose": df['bg_value'].mean(),
        "glucose_variability": df['bg_value'].std(),
        "total_insulin": df['insulin_value'].sum(),
        "glucose_insulin_correlation": df['bg_value'].corr(df['insulin_value']),
        "time_in_range": calculate_time_in_range(df, 70, 180),
        "time_below_range": calculate_time_in_range(df, 0, 70),
        "time_above_range": calculate_time_in_range(df, 180, float('inf')),
        "average_daily_insulin": df.groupby(df['timestamp'].dt.date)['insulin_value'].sum().mean()
    }
