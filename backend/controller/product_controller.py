from typing import Optional
from fastapi import HTTPException
from config.settings import get_db


def get_all_products(category: Optional[str] = None, sort: Optional[str] = None):
    conn = get_db()
    cur = conn.cursor()

    query = """SELECT id, name, category, price, image, unit, description, "inStock" FROM products"""
    params = []

    if category and category != "all":
        query += " WHERE category = %s"
        params.append(category)

    if sort == "price-low":
        query += " ORDER BY price ASC"
    elif sort == "price-high":
        query += " ORDER BY price DESC"
    else:
        query += " ORDER BY name ASC"

    cur.execute(query, params)
    rows = cur.fetchall()
    cur.close()
    conn.close()
    return [dict(r) for r in rows]


def get_product_by_id(product_id: str):
    conn = get_db()
    cur = conn.cursor()
    cur.execute("""SELECT id, name, category, price, image, unit, description, "inStock" FROM products WHERE id = %s""", (product_id,))
    row = cur.fetchone()
    cur.close()
    conn.close()
    if not row:
        raise HTTPException(status_code=404, detail="Product not found")
    return dict(row)
