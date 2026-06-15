from fastapi import APIRouter
from controller.order_controller import OrderRequest, place_order

router = APIRouter(prefix="/api/orders", tags=["orders"])


@router.post("")
def create_order(order: OrderRequest):
    return place_order(order)
