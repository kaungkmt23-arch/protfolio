from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import Optional
from database import get_db
from models import Product
from schemas import ProductOut

router = APIRouter(prefix="/api/products", tags=["products"])


@router.get("", response_model=list[ProductOut])
def list_products(
    q: Optional[str] = Query(None, description="Search by name or category"),
    cat: Optional[str] = Query(None, description="Filter by category"),
    min_price: Optional[int] = Query(None),
    max_price: Optional[int] = Query(None),
    db: Session = Depends(get_db),
):
    query = db.query(Product)
    if q:
        query = query.filter(
            Product.name.ilike(f"%{q}%") | Product.category.ilike(f"%{q}%")
        )
    if cat:
        query = query.filter(Product.category == cat)
    if min_price is not None:
        query = query.filter(Product.price >= min_price)
    if max_price is not None:
        query = query.filter(Product.price <= max_price)
    return query.all()


@router.get("/{product_id}", response_model=ProductOut)
def get_product(product_id: str, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product
