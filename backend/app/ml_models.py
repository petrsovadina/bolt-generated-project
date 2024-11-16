import pandas as pd
import numpy as np
from prophet import Prophet
from typing import List, Dict, Any
from sqlalchemy.orm import Session
from . import crud
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor

def train_prophet_model(db: Session, file_id: int) -> Prophet:
    bg_data = crud.get_bg_data_by_file(db, file_id)
    insulin_data = crud.get_insulin_data_by_file(db, file_id)
    
    bg_df = pd.DataFrame([(b.timestamp, b.bg_value) for b in bg_data], columns=['ds', 'y'])
    insulin_df = pd.DataFrame([(i.timestamp, i.insulin_value) for i in insulin_data], columns=['ds', 'insulin'])
    
    df = pd.merge(bg_df, insulin_df, on='ds', how='outer')
    df = df.sort_values('ds').fillna(method='ffill')
    
    model = Prophet()
    model.add_regressor('insulin')
    model.fit(df)
    
    return model

def predict_glucose(model: Prophet, periods: int = 24) -> List[Dict[str, Any]]:
    future = model.make_future_dataframe(periods=periods, freq='H')
    future['insulin'] = future['insulin'].fillna(future['insulin'].mean())  # Předpokládáme průměrnou hodnotu inzulínu pro budoucí předpovědi
    
    forecast = model.predict(future)
    
    predictions = forecast[['ds', 'yhat', 'yhat_lower', 'yhat_upper']].tail(periods)
    return predictions.to_dict('records')

def get_glucose_prediction(db: Session, file_id: int, periods: int = 24) -> List[Dict[str, Any]]:
    model = train_prophet_model(db, file_id)
    predictions = predict_glucose(model, periods)
    return predictions

def train_random_forest_model(db: Session, file_id: int) -> RandomForestRegressor:
    bg_data = crud.get_bg_data_by_file(db, file_id)
    insulin_data = crud.get_insulin_data_by_file(db, file_id)
    
    bg_df = pd.DataFrame([(b.timestamp, b.bg_value) for b in bg_data], columns=['timestamp', 'bg_value'])
    insulin_df = pd.DataFrame([(i.timestamp, i.insulin_value) for i in insulin_data], columns=['timestamp', 'insulin_value'])
    
    df = pd.merge(bg_df, insulin_df, on='timestamp', how='outer')
    df = df.sort_values('timestamp').fillna(method='ffill')
    
    df['hour'] = df['timestamp'].dt.hour
    df['day_of_week'] = df['timestamp'].dt.dayofweek
    
    X = df[['hour', 'day_of_week', 'insulin_value']]
    y = df['bg_value']
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    model = RandomForestRegressor(n_estimators=100, random_state=42)
    model.fit(X_train_scaled, y_train)
    
    return model, scaler

def predict_glucose_rf(model: RandomForestRegressor, scaler: StandardScaler, future_data: pd.DataFrame) -> np.ndarray:
    future_data_scaled = scaler.transform(future_data)
    predictions = model.predict(future_data_scaled)
    return predictions

def get_glucose_prediction_rf(db: Session, file_id: int, periods: int = 24) -> List[Dict[str, Any]]:
    model, scaler = train_random_forest_model(db, file_id)
    
    last_data = crud.get_last_bg_and_insulin_data(db, file_id)
    last_timestamp = last_data['timestamp']
    
    future_timestamps = [last_timestamp + timedelta(hours=i) for i in range(1, periods+1)]
    future_data = pd.DataFrame({
        'timestamp': future_timestamps,
        'hour': [t.hour for t in future_timestamps],
        'day_of_week': [t.dayofweek for t in future_timestamps],
        'insulin_value': [last_data['insulin_value']] * periods  # Předpokládáme konstantní hodnotu inzulínu pro jednoduchost
    })
    
    predictions = predict_glucose_rf(model, scaler, future_data[['hour', 'day_of_week', 'insulin_value']])
    
    return [{'timestamp': t, 'predicted_value': v} for t, v in zip(future_timestamps, predictions)]
