import os
from pathlib import Path
from fastapi import FastAPI, Depends, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from decimal import Decimal

from database import get_db, init_db
from models import Record
from schemas import RecordCreate, RecordUpdate, RecordResponse
from rates import fetch_rates, get_rate_for_currency

app = FastAPI(title="Výdaje a příjmy")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Cesta k frontendu (Docker vs. lokálně)
FRONTEND_DIST = Path("/frontend/dist") if Path("/frontend/dist").exists() else Path(__file__).resolve().parent.parent / "frontend" / "dist"


@app.on_event("startup")
def startup():
    init_db()


@app.get("/api/records", response_model=list[RecordResponse])
def list_records(db: Session = Depends(get_db)):
    records = db.query(Record).order_by(Record.date.desc()).all()
    return [RecordResponse.model_validate(r) for r in records]


@app.post("/api/records", response_model=RecordResponse)
def create_record(data: RecordCreate, db: Session = Depends(get_db)):
    rate = data.rate
    if data.currency != "CZK" and (rate is None or rate == 0):
        rate = get_rate_for_currency(data.currency)
        if rate is None:
            raise HTTPException(
                status_code=400,
                detail=f"Kurz pro měnu {data.currency} se nepodařilo získat.",
            )
    record = Record(
        who=data.who,
        amount=data.amount,
        currency=data.currency,
        rate=rate if data.currency != "CZK" else None,
        type_="splátka" if data.payee else data.type,
        payee=data.payee,
        note=data.note,
    )
    if data.date is not None:
        record.date = data.date
    db.add(record)
    db.commit()
    db.refresh(record)
    return RecordResponse.model_validate(record)


@app.put("/api/records/{record_id}", response_model=RecordResponse)
def update_record(record_id: int, data: RecordUpdate, db: Session = Depends(get_db)):
    record = db.get(Record, record_id)
    if not record:
        raise HTTPException(status_code=404, detail="Záznam nenalezen")
    record.who = data.who
    record.amount = data.amount
    record.type_ = data.type
    record.note = data.note
    if data.date is not None:
        record.date = data.date
    db.commit()
    db.refresh(record)
    return RecordResponse.model_validate(record)


@app.delete("/api/records/{record_id}")
def delete_record(record_id: int, db: Session = Depends(get_db)):
    record = db.get(Record, record_id)
    if not record:
        raise HTTPException(status_code=404, detail="Záznam nenalezen")
    db.delete(record)
    db.commit()
    return {"ok": True}


@app.get("/api/rates")
def list_rates():
    """Vrátí kurzy z partnersbanka.cz (pro výběr měny a zobrazení kurzu)."""
    return fetch_rates()


# SPA a statické soubory až na konec – API routy musí být registrované dříve
if FRONTEND_DIST.exists():
    app.mount("/assets", StaticFiles(directory=FRONTEND_DIST / "assets"), name="assets")

    @app.get("/")
    def index():
        return FileResponse(FRONTEND_DIST / "index.html")

    @app.get("/{path:path}")
    def catch_all(path: str):
        return FileResponse(FRONTEND_DIST / "index.html")
