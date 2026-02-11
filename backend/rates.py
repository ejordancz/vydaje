"""Stahování kurzů z https://www.partnersbanka.cz/kurzy"""
import re
import httpx
from bs4 import BeautifulSoup
from decimal import Decimal
from typing import Dict


def parse_czech_number(s: str) -> Decimal:
    """Převede '24,365' nebo '6,295' na Decimal."""
    s = s.strip().replace("\u00a0", "").replace(" ", "")
    s = s.replace(",", ".")
    return Decimal(s)


def fetch_rates() -> Dict[str, Decimal]:
    """
    Stáhne kurzy z partnersbanka.cz.
    Vrací slovník: měna -> kurz (kolik CZK za 1 jednotku měny).
    Pro měny s množstvím (HUF 100) je kurz přepočten na 1 jednotku.
    """
    url = "https://www.partnersbanka.cz/kurzy"
    out: Dict[str, Decimal] = {"CZK": Decimal("1")}

    try:
        with httpx.Client(follow_redirects=True, timeout=15.0) as client:
            resp = client.get(url)
            resp.raise_for_status()
    except Exception:
        return out

    soup = BeautifulSoup(resp.text, "html.parser")
    tables = soup.find_all("table")
    for table in tables:
        rows = table.find_all("tr")
        for row in rows:
            cells = row.find_all(["td", "th"])
            # Tabulka: Datum, Stát, Množství, Měna, Nákup, Střed, Prodej
            if len(cells) < 6:
                continue
            texts = [c.get_text(strip=True).replace("\u00a0", "") for c in cells]
            # Měna je 4. sloupec (index 3), Množství 3. (index 2), Střed 6. (index 5)
            if len(texts) < 6:
                continue
            currency = texts[3]
            if not re.match(r"^[A-Z]{3}$", currency) or currency == "CZK":
                continue
            try:
                amount_str = texts[2]
                rate_str = texts[5]
                rate = parse_czech_number(rate_str)
                amount = Decimal(amount_str or "1")
                out[currency] = (rate / amount).quantize(Decimal("0.000001"))
            except Exception:
                continue

    return out


def get_rate_for_currency(currency: str) -> Decimal | None:
    rates = fetch_rates()
    return rates.get(currency)
