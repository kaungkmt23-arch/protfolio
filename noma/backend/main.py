from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine
from models import Base
from routers import products, auth, cart, orders, newsletter

Base.metadata.create_all(bind=engine)

app = FastAPI(title="NXY LI API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # tighten this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(products.router)
app.include_router(auth.router)
app.include_router(cart.router)
app.include_router(orders.router)
app.include_router(newsletter.router)


@app.get("/")
def root():
    return {"status": "ok", "docs": "/docs"}
