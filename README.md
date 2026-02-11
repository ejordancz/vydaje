# Výdaje a příjmy

Aplikace pro ukládání výdajů a příjmů (Mira, Bohunka). Běží v jednom Docker kontejneru.

## Požadavky

- Docker (nebo lokálně: Node 20+, Python 3.12+)

## Spuštění v Dockeru

```bash
docker build -t vydaje .
docker run -p 8000:8000 vydaje
```

Aplikace: http://localhost:8000

## Lokální vývoj

**Backend:**

```bash
cd backend
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

**Frontend** (v druhém terminálu):

```bash
cd frontend
npm install
npm run dev
```

Frontend: http://localhost:5173 (proxy na API na portu 8000)

## Funkce

- **Záznam:** datum (automaticky), kdo (Mira / Bohunka), částka, měna (CZK nebo kurzy z partnersbanka.cz), typ (jídlo, doprava, ubytování, ostatní).
- U ne-CZK měn se kurz stahuje z https://www.partnersbanka.cz/kurzy.
- Přehledná tabulka všech záznamů s možností smazat.

## Databáze

SQLite, soubor `backend/vydaje.db` (v Dockeru uvnitř kontejneru; pro trvalá data připojte volume).
