from fastapi import APIRouter
from config.settings import get_db

router = APIRouter(prefix="/api/categories", tags=["categories"])


@router.get("")
def list_categories():
    conn = get_db()
    cur = conn.cursor()
    cur.execute("SELECT id, name, image, icon FROM categories")
    rows = cur.fetchall()
    cur.close()
    conn.close()
    return [dict(r) for r in rows]
