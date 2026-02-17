# Výdaje a příjmy

Aplikace pro ukládání výdajů a příjmů (Mira, Bohunka). Běží v jednom Docker kontejneru.

## Požadavky

- Docker (nebo lokálně: Node 20+, Python 3.12+)

## Spuštění v Dockeru

1. Vytvořte soubor `.env` (např. zkopírujte `.env.example`) a nastavte heslo pro přihlášení:

   ```
   APP_PASSWORD=vas_bezpecne_heslo
   ```

2. Spusťte:

```bash
docker compose up --build
```

Aplikace: http://localhost:8000 — nejdřív se přihlaste heslem z `.env`.

## Lokální vývoj

V adresáři projektu vytvořte `.env` s `APP_PASSWORD=...`.

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

## Zabezpečení

- Přihlášení je jen heslem (bez uživatelského jména). Heslo se nastavuje v `.env` jako `APP_PASSWORD`.
- API je chráněné JWT tokenem: po přihlášení se token posílá v hlavičce `Authorization: Bearer <token>`.
- Pro provoz na internetu doporučujeme běh za HTTPS (reverse proxy s TLS, např. Caddy nebo nginx s Let's Encrypt).

## Databáze

SQLite, soubor `backend/vydaje.db` (v Dockeru uvnitř kontejneru; pro trvalá data připojte volume).
