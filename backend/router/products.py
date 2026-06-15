from fastapi import APIRouter, Query
from typing import Optional
from controller.product_controller import get_all_products, get_product_by_id

router = APIRouter(prefix="/api/products", tags=["products"])


@router.get("")
def list_products(
    category: Optional[str] = Query(None),
    sort: Optional[str] = Query(None),
):
    return get_all_products(category, sort)


@router.get("/{product_id}")
def retrieve_product(product_id: str):
    return get_product_by_id(product_id)
