from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from config.settings import FRONTEND_ORIGIN
from router import products, categories, orders, auth
import traceback

app = FastAPI(title="FreshMart API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={"detail": str(exc), "trace": traceback.format_exc()},
    )

app.include_router(products.router)
app.include_router(categories.router)
app.include_router(orders.router)
app.include_router(auth.router)


@app.get("/")
def root():
    return {"status": "FreshMart API running"}
