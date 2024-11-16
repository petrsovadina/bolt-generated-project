# PumpPerfect

PumpPerfect je komplexní webová aplikace pro analýzu a vizualizaci dat z inzulinových pump a systémů kontinuálního monitorování glukózy (CGM).

## Požadavky

- Docker
- Docker Compose

## Instalace a spuštění

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

## Nasazení

Pro nasazení nové verze použijte skript `deploy.sh`:

```
./deploy.sh
```

Tento skript provede následující kroky:
1. Stáhne nejnovější změny z Git repozitáře
2. Sestaví a spustí Docker kontejnery
3. Spustí databázové migrace

## Vývoj

Pro lokální vývoj můžete spustit jednotlivé části aplikace samostatně. Podrobné instrukce najdete v dokumentaci v adresáři `docs/`.

## Testování

Spuštění testů pro backend:
```
docker-compose run backend pytest
```

Spuštění testů pro frontend:
```
docker-compose run frontend npm test
```

## Přispívání

Příspěvky jsou vítány! Prosím, přečtěte si `CONTRIBUTING.md` pro detaily o našem procesu pro odesílání pull requestů.

## Licence

Tento projekt je licencován pod MIT licencí - viz soubor `LICENSE` pro detaily.
