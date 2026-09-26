from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from database import get_db
from models import Order, OrderItem, Product, CartItem
from schemas import OrderIn, OrderOut
from routers.auth import decode_token
from typing import Optional

router = APIRouter(prefix="/api/orders", tags=["orders"])


@router.post("", response_model=OrderOut, status_code=201)
def create_order(body: OrderIn, db: Session = Depends(get_db), token: Optional[str] = None):
    user_id = None
    if token:
        try:
            user_id = decode_token(token)
        except Exception:
            pass

    if not body.items:
        raise HTTPException(status_code=400, detail="Order must have at least one item")

    total = 0
    order_items = []
    for item_in in body.items:
        product = db.query(Product).filter(Product.id == item_in.product_id).first()
        if not product:
            raise HTTPException(status_code=404, detail=f"Product {item_in.product_id} not found")
        if product.stock < item_in.qty:
            raise HTTPException(status_code=400, detail=f"{product.name} has insufficient stock")
        line_total = product.price * item_in.qty
        total += line_total
        order_items.append(OrderItem(product_id=product.id, qty=item_in.qty, price=product.price))
        product.stock -= item_in.qty

    order = Order(
        user_id=user_id,
        email=body.email,
        total=total,
        status="pending",
        shipping_address=body.shipping_address,
    )
    db.add(order)
    db.flush()

    for oi in order_items:
        oi.order_id = order.id
        db.add(oi)

    # clear server-side cart if logged in
    if user_id:
        db.query(CartItem).filter(CartItem.user_id == user_id).delete()

    db.commit()
    db.refresh(order)

    return (
        db.query(Order)
        .options(joinedload(Order.items).joinedload(OrderItem.product))
        .filter(Order.id == order.id)
        .first()
    )


@router.get("", response_model=list[OrderOut])
def list_orders(token: str, db: Session = Depends(get_db)):
    user_id = decode_token(token)
    return (
        db.query(Order)
        .options(joinedload(Order.items).joinedload(OrderItem.product))
        .filter(Order.user_id == user_id)
        .order_by(Order.created_at.desc())
        .all()
    )


@router.get("/{order_id}", response_model=OrderOut)
def get_order(order_id: int, token: str, db: Session = Depends(get_db)):
    user_id = decode_token(token)
    order = (
        db.query(Order)
        .options(joinedload(Order.items).joinedload(OrderItem.product))
        .filter(Order.id == order_id, Order.user_id == user_id)
        .first()
    )
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order
