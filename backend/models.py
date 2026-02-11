from datetime import datetime
from decimal import Decimal
from sqlalchemy import Column, Integer, String, DateTime, Numeric, Enum
import enum

from database import Base


class Who(str, enum.Enum):
    MIRA = "Mira"
    BOHUNKA = "Bohunka"


class RecordType(str, enum.Enum):
    JIDLO = "jídlo"
    DOPRAVA = "doprava"
    UBYTOVANI = "ubytování"
    OSTATNI = "ostatní"


class Record(Base):
    __tablename__ = "records"

    id = Column(Integer, primary_key=True, index=True)
    date = Column(DateTime, default=datetime.utcnow, nullable=False)
    who = Column(String(20), nullable=False)  # Mira | Bohunka
    amount = Column(Numeric(15, 2), nullable=False)  # částka platby
    currency = Column(String(10), nullable=False, default="CZK")
    rate = Column(Numeric(15, 6), nullable=True)  # kurz (pro ne-CZK)
    type_ = Column("type", String(20), nullable=False)  # jídlo, doprava, ubytování, vstupné, ostatní, splátka
    payee = Column(String(20), nullable=True)  # když vyplněno: splátka od who komu payee
    note = Column(String(255), nullable=True)

    @property
    def amount_czk(self) -> Decimal:
        """Částka v CZK (pro CZK = amount, jinak amount * rate)."""
        if self.currency == "CZK" or self.rate is None:
            return self.amount
        return (self.amount * self.rate).quantize(Decimal("0.01"))

    @property
    def type(self) -> str:
        """Alias pro API (sloupec je type_)."""
        return self.type_
