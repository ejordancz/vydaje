from datetime import datetime
from decimal import Decimal
from typing import Optional

from pydantic import BaseModel


class LoginRequest(BaseModel):
    password: str


class RecordCreate(BaseModel):
    who: str  # Mira | Bohunka
    amount: Decimal
    currency: str = "CZK"
    rate: Optional[Decimal] = None
    type: str  # jídlo, doprava, ubytování, vstupné, ostatní (nebo splátka při payee)
    date: Optional[datetime] = None
    payee: Optional[str] = None  # když vyplněno: splátka od who komu payee
    note: Optional[str] = None


class RecordUpdate(BaseModel):
    """Editace záznamu – měna a kurz nelze měnit."""
    who: str
    amount: Decimal
    type: str
    date: Optional[datetime] = None
    payee: Optional[str] = None
    note: Optional[str] = None


class RecordResponse(BaseModel):
    id: int
    date: datetime
    who: str
    amount: Decimal
    currency: str
    rate: Optional[Decimal]
    type: str
    amount_czk: Decimal
    payee: Optional[str] = None
    note: Optional[str] = None

    class Config:
        from_attributes = True
