# PumpPerfect - Dokumentace

## Obsah

1. [Úvod](#úvod)
2. [Architektura](#architektura)
3. [Instalace a nasazení](#instalace-a-nasazení)
4. [Konfigurace](#konfigurace)
5. [Vývoj](#vývoj)
6. [Testování](#testování)
7. [Logování](#logování)
8. [API](#api)
9. [Frontend](#frontend)
10. [Databáze](#databáze)
11. [Řešení problémů](#řešení-problémů)

## Úvod

PumpPerfect je komplexní webová aplikace pro analýzu a vizualizaci dat z inzulinových pump a systémů kontinuálního monitorování glukózy (CGM). Aplikace poskytuje uživatelům nástroje pro lepší porozumění a správu jejich diabetu pomocí pokročilých analytických funkcí a interaktivního dashboardu.

## Architektura

PumpPerfect využívá moderní architekturu klient-server s následujícími klíčovými komponenty:

- **Backend**: FastAPI aplikace sloužící jako API server
- **Frontend**: Next.js aplikace poskytující uživatelské rozhraní
- **Databáze**: PostgreSQL pro ukládání dat
- **Kontejnerizace**: Docker a Docker Compose pro snadné nasazení

## Instalace a nasazení

### Požadavky

- Docker
- Docker Compose

### Kroky instalace

1. Naklonujte repozitář:
   ```
   git clone https://github.com/vas-uzivatelske-jmeno/pumpperfect.git
   cd pumpperfect
   ```

2. Vytvořte soubory `.env` v adresářích `backend` a `frontend` podle příkladů v `.env.example`.

3. Sestavte a spusťte Docker kontejnery:
   ```
   docker-compose up -d --build
   ```

4. Aplikace bude dostupná na:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API dokumentace: http://localhost:8000/docs

### Nasazení nové verze

Pro nasazení nové verze použijte skript `deploy.sh`:

```
./deploy.sh
```

Tento skript provede následující kroky:
1. Stáhne nejnovější změny z Git repozitáře
2. Sestaví a spustí Docker kontejnery
3. Spustí databázové migrace

## Konfigurace

Konfigurace aplikace je řízena pomocí souborů `.env` v adresářích `backend` a `frontend`. Příklady konfiguračních proměnných najdete v souborech `.env.example`.

### Backend konfigurace

- `DATABASE_URL`: URL pro připojení k PostgreSQL databázi
- `SECRET_KEY`: Tajný klíč pro zabezpečení aplikace
- `DEBUG`: Zapnutí/vypnutí debug módu
- `ALLOWED_HOSTS`: Seznam povolených hostů

### Frontend konfigurace

- `NEXT_PUBLIC_API_URL`: URL backendu API

## Vývoj

Pro lokální vývoj můžete spustit jednotlivé části aplikace samostatně:

### Backend

1. Přejděte do adresáře `backend`
2. Vytvořte a aktivujte virtuální prostředí
3. Nainstalujte závislosti: `pip install -r requirements.txt`
4. Spusťte aplikaci: `uvicorn app.main:app --reload`

### Frontend

1. Přejděte do adresáře `frontend`
2. Nainstalujte závislosti: `npm install`
3. Spusťte vývojový server: `npm run dev`

## Testování

### Backend testy

Spuštění testů pro backend:
```
docker-compose run backend pytest
```

### Frontend testy

Spuštění testů pro frontend:
```
docker-compose run frontend npm test
```

## Logování

### Backend logování

Backend používá knihovnu `loguru` pro pokročilé logování. Logy jsou konfigurovány v souboru `backend/app/logger.py` a jsou ukládány do souboru `logs/app.log`.

Použití loggeru v kódu:

```python
from app.logger import log

log.info("Toto je informační zpráva")
log.error("Toto je chybová zpráva")
```

### Frontend logování

Frontend používá vlastní jednoduchý logger, který je v produkčním prostředí automaticky deaktivován. Logger je definován v souboru `frontend/lib/logger.ts`.

Použití loggeru v kódu:

```typescript
import { logger } from '../lib/logger'

logger.info('Toto je informační zpráva')
logger.error('Toto je chybová zpráva')
```

## API

Backend poskytuje RESTful API pro komunikaci s frontendem. Hlavní endpointy zahrnují:

- `POST /upload/`: Nahrání nového souboru s daty
- `GET /analysis/{file_id}`: Získání výsledků analýzy pro konkrétní soubor
- `POST /predict/{file_id}`: Predikce budoucích hodnot glukózy

Podrobná dokumentace API je dostupná po spuštění backendu na `/docs`.

## Frontend

Frontend aplikace je vytvořen pomocí Next.js a poskytuje interaktivní uživatelské rozhraní pro vizualizaci a analýzu dat. Hlavní komponenty zahrnují:

- Dashboard s různými typy grafů
- Formulář pro nahrávání dat
- Stránky s detailními analýzami

## Databáze

PumpPerfect používá PostgreSQL databázi pro ukládání dat. Schéma databáze je definováno v `backend/app/models.py`. Migrace databáze jsou řízeny pomocí Alembic.

Pro spuštění migrací manuálně použijte:

```
docker-compose run backend alembic upgrade head
```

## Řešení problémů

Pokud narazíte na problémy při používání PumpPerfect, zkuste následující:

1. Zkontrolujte logy aplikace:
   - Backend: `docker-compose logs backend`
   - Frontend: `docker-compose logs frontend`
2. Ověřte, že všechny kontejnery běží: `docker-compose ps`
3. Zkontrolujte konfiguraci v souborech `.env`

Pokud problém přetrvává, vytvořte issue v GitHub repozitáři s podrobným popisem problému a kroky k jeho reprodukci.

---

Tato dokumentace poskytuje přehled projektu PumpPerfect a pokyny pro jeho instalaci, konfiguraci a používání. Pro další dotazy nebo podporu se obraťte na vývojový tým nebo komunitu uživatelů.
