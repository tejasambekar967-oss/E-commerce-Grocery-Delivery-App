from pydantic import BaseModel
from typing import List


class Product(BaseModel):
    id: str
    name: str
    category: str
    price: float
    image: str
    unit: str
    description: str
    inStock: bool


class Category(BaseModel):
    id: str
    name: str
    image: str
    icon: str
