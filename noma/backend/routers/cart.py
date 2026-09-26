from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from database import get_db
from models import CartItem, Product
from schemas import CartAddIn, CartItemOut
from routers.auth import decode_token

router = APIRouter(prefix="/api/cart", tags=["cart"])


def get_current_user_id(token: str) -> int:
    return decode_token(token)


@router.get("", response_model=list[CartItemOut])
def get_cart(token: str, db: Session = Depends(get_db)):
    user_id = get_current_user_id(token)
    return (
        db.query(CartItem)
        .options(joinedload(CartItem.product))
        .filter(CartItem.user_id == user_id)
        .all()
    )


@router.post("", response_model=CartItemOut, status_code=201)
def add_to_cart(body: CartAddIn, token: str, db: Session = Depends(get_db)):
    user_id = get_current_user_id(token)
    product = db.query(Product).filter(Product.id == body.product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    item = (
        db.query(CartItem)
        .filter(CartItem.user_id == user_id, CartItem.product_id == body.product_id)
        .first()
    )
    if item:
        item.qty += body.qty
    else:
        item = CartItem(user_id=user_id, product_id=body.product_id, qty=body.qty)
        db.add(item)
    db.commit()
    db.refresh(item)
    return db.query(CartItem).options(joinedload(CartItem.product)).filter(CartItem.id == item.id).first()


@router.patch("/{item_id}", response_model=CartItemOut)
def update_cart_item(item_id: int, qty: int, token: str, db: Session = Depends(get_db)):
    user_id = get_current_user_id(token)
    item = db.query(CartItem).filter(CartItem.id == item_id, CartItem.user_id == user_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Cart item not found")
    if qty <= 0:
        db.delete(item)
        db.commit()
        raise HTTPException(status_code=204, detail="Item removed")
    item.qty = qty
    db.commit()
    db.refresh(item)
    return db.query(CartItem).options(joinedload(CartItem.product)).filter(CartItem.id == item.id).first()


@router.delete("/{item_id}", status_code=204)
def remove_from_cart(item_id: int, token: str, db: Session = Depends(get_db)):
    user_id = get_current_user_id(token)
    item = db.query(CartItem).filter(CartItem.id == item_id, CartItem.user_id == user_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Cart item not found")
    db.delete(item)
    db.commit()


@router.delete("", status_code=204)
def clear_cart(token: str, db: Session = Depends(get_db)):
    user_id = get_current_user_id(token)
    db.query(CartItem).filter(CartItem.user_id == user_id).delete()
    db.commit()
