# Použijeme oficiální Python image
FROM python:3.9-slim

# Nastavíme pracovní adresář v kontejneru
WORKDIR /app

# Kopírujeme soubory s požadavky a instalujeme závislosti
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Kopírujeme zbytek aplikace
COPY . .

# Spustíme migraci databáze a pak aplikaci
CMD alembic upgrade head && uvicorn app.main:app --host 0.0.0.0 --port 8000
