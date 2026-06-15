import uuid
from datetime import datetime, timezone
from pydantic import BaseModel
from typing import List
from fastapi import HTTPException
from config.settings import get_db


class OrderItem(BaseModel):
    id: str
    name: str
    price: float
    quantity: int
    unit: str


class OrderRequest(BaseModel):
    firstName: str
    lastName: str
    email: str
    phone: str
    address: str
    city: str
    state: str
    zip: str
    deliveryMethod: str
    items: List[OrderItem]
    subtotal: float
    tax: float
    deliveryFee: float
    total: float


def place_order(order: OrderRequest):
    order_id = str(uuid.uuid4())[:8].upper()
    conn = get_db()
    cur = conn.cursor()

    try:
        cur.execute(
            """INSERT INTO orders
               (order_id, first_name, last_name, email, phone, address, city, state, zip,
                delivery_method, subtotal, tax, delivery_fee, total, created_at)
               VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
               RETURNING id""",
            (order_id, order.firstName, order.lastName, order.email, order.phone,
             order.address, order.city, order.state, order.zip, order.deliveryMethod,
             order.subtotal, order.tax, order.deliveryFee, order.total,
             datetime.now(timezone.utc))
        )
        db_order_id = cur.fetchone()["id"]

        for item in order.items:
            cur.execute(
                """INSERT INTO order_items (order_id, product_id, name, price, quantity, unit)
                   VALUES (%s,%s,%s,%s,%s,%s)""",
                (db_order_id, item.id, item.name, item.price, item.quantity, item.unit)
            )

        conn.commit()
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cur.close()
        conn.close()

    return {"orderId": order_id, "message": "Order placed successfully"}
