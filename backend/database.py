import os
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker, declarative_base

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATABASE_URL = os.environ.get(
    "DATABASE_URL",
    f"sqlite:///{os.path.join(BASE_DIR, 'vydaje.db')}"
)

engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False} if "sqlite" in DATABASE_URL else {}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def init_db():
    Base.metadata.create_all(bind=engine)
    # Migrace: přidat sloupec note pokud chybí (SQLite)
    if "sqlite" in DATABASE_URL:
        # payee už typicky existuje z předchozí verze, řešíme hlavně nový sloupec note
        try:
            with engine.connect() as conn:
                conn.execute(text("SELECT note FROM records LIMIT 1"))
        except Exception:
            try:
                with engine.connect() as conn:
                    conn.execute(text("ALTER TABLE records ADD COLUMN note VARCHAR(255)"))
                    conn.commit()
            except Exception:
                # pokud sloupec už existuje nebo ALTER selže, aplikaci to nesmí shodit
                pass
