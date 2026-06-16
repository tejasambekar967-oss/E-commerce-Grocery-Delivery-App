from typing import Optional
from fastapi import HTTPException
from pydantic import BaseModel
from config.settings import get_db


class ProductCreate(BaseModel):
    id: Optional[str] = None
    name: str
    category: str
    price: float
    image: Optional[str] = ""
    unit: Optional[str] = ""
    description: Optional[str] = ""
    inStock: bool = True


class ProductUpdate(BaseModel):
    name: Optional[str] = None
    category: Optional[str] = None
    price: Optional[float] = None
    image: Optional[str] = None
    unit: Optional[str] = None
    description: Optional[str] = None
    inStock: Optional[bool] = None


def admin_get_all_products():
    conn = get_db()
    cur = conn.cursor()
    cur.execute("""SELECT id, name, category, price, image, unit, description, "inStock" FROM products ORDER BY name ASC""")
    rows = cur.fetchall()
    cur.close()
    conn.close()
    return [dict(r) for r in rows]


def admin_create_product(data: ProductCreate):
    import uuid
    conn = get_db()
    cur = conn.cursor()

    product_id = data.id or str(uuid.uuid4())[:8]

    cur.execute("SELECT id FROM products WHERE id = %s", (product_id,))
    if cur.fetchone():
        cur.close()
        conn.close()
        raise HTTPException(status_code=400, detail=f"Product with id '{product_id}' already exists")

    cur.execute(
        """INSERT INTO products (id, name, category, price, image, unit, description, "inStock")
           VALUES (%s, %s, %s, %s, %s, %s, %s, %s) RETURNING *""",
        (product_id, data.name, data.category, data.price,
         data.image, data.unit, data.description, data.inStock)
    )
    row = dict(cur.fetchone())
    conn.commit()
    cur.close()
    conn.close()
    return row


def admin_update_product(product_id: str, data: ProductUpdate):
    conn = get_db()
    cur = conn.cursor()

    cur.execute("SELECT id FROM products WHERE id = %s", (product_id,))
    if not cur.fetchone():
        cur.close()
        conn.close()
        raise HTTPException(status_code=404, detail="Product not found")

    fields = {k: v for k, v in data.model_dump().items() if v is not None}
    if not fields:
        cur.close()
        conn.close()
        raise HTTPException(status_code=400, detail="No fields to update")

    # Handle inStock separately (quoted column)
    set_parts = []
    values = []
    for key, value in fields.items():
        if key == "inStock":
            set_parts.append('"inStock" = %s')
        else:
            set_parts.append(f"{key} = %s")
        values.append(value)

    values.append(product_id)
    query = f'UPDATE products SET {", ".join(set_parts)} WHERE id = %s RETURNING *'
    cur.execute(query, values)
    row = dict(cur.fetchone())
    conn.commit()
    cur.close()
    conn.close()
    return row


def admin_delete_product(product_id: str):
    conn = get_db()
    cur = conn.cursor()

    cur.execute("SELECT id FROM products WHERE id = %s", (product_id,))
    if not cur.fetchone():
        cur.close()
        conn.close()
        raise HTTPException(status_code=404, detail="Product not found")

    cur.execute("DELETE FROM products WHERE id = %s", (product_id,))
    conn.commit()
    cur.close()
    conn.close()
    return {"message": f"Product '{product_id}' deleted"}


def admin_get_all_categories():
    conn = get_db()
    cur = conn.cursor()
    cur.execute("SELECT id, name, image, icon FROM categories ORDER BY name ASC")
    rows = cur.fetchall()
    cur.close()
    conn.close()
    return [dict(r) for r in rows]
