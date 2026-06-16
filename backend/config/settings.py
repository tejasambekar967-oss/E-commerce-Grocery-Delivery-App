from dotenv import load_dotenv
import os
import psycopg2
from psycopg2.extras import RealDictCursor

load_dotenv()

FRONTEND_ORIGIN = os.getenv("FRONTEND_ORIGIN", "http://localhost:5173")
DATABASE_URL = os.getenv("DATABASE_URL", "").strip()
ADMIN_SECRET = os.getenv("ADMIN_SECRET", "freshmart-admin-secret")

if not DATABASE_URL:
    raise RuntimeError("DATABASE_URL must be set in .env")


def get_db():
    conn = psycopg2.connect(DATABASE_URL, cursor_factory=RealDictCursor)
    return conn
