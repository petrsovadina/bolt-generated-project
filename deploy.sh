#!/bin/bash

# Aktualizace repozitáře
git pull origin main

# Sestavení a spuštění Docker kontejnerů
docker-compose up -d --build

# Čekání na spuštění služeb
sleep 10

# Spuštění migrace databáze
docker-compose exec backend alembic upgrade head

echo "Nasazení dokončeno!"
