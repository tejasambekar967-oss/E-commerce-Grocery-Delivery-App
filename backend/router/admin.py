from fastapi import APIRouter, Header, HTTPException
from config.settings import ADMIN_SECRET
from controller.admin_controller import (
    ProductCreate, ProductUpdate,
    admin_get_all_products, admin_create_product,
    admin_update_product, admin_delete_product,
    admin_get_all_categories,
)

router = APIRouter(prefix="/api/admin", tags=["admin"])


def verify_admin(x_admin_secret: str = Header(...)):
    if x_admin_secret != ADMIN_SECRET:
        raise HTTPException(status_code=403, detail="Invalid admin secret")


@router.get("/products")
def list_products(x_admin_secret: str = Header(...)):
    verify_admin(x_admin_secret)
    return admin_get_all_products()


@router.post("/products")
def create_product(data: ProductCreate, x_admin_secret: str = Header(...)):
    verify_admin(x_admin_secret)
    return admin_create_product(data)


@router.put("/products/{product_id}")
def update_product(product_id: str, data: ProductUpdate, x_admin_secret: str = Header(...)):
    verify_admin(x_admin_secret)
    return admin_update_product(product_id, data)


@router.delete("/products/{product_id}")
def delete_product(product_id: str, x_admin_secret: str = Header(...)):
    verify_admin(x_admin_secret)
    return admin_delete_product(product_id)


@router.get("/categories")
def list_categories(x_admin_secret: str = Header(...)):
    verify_admin(x_admin_secret)
    return admin_get_all_categories()
