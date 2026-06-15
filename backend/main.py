from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from config.settings import FRONTEND_ORIGIN
from router import products, categories, orders, auth

app = FastAPI(title="FreshMart API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(products.router)
app.include_router(categories.router)
app.include_router(orders.router)
app.include_router(auth.router)


@app.get("/")
def root():
    return {"status": "FreshMart API running"}
