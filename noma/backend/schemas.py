from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr


# ── Products ──────────────────────────────────────────────
class ProductOut(BaseModel):
    id: str
    name: str
    category: str
    price: int
    stock: int
    photo_id: int
    badge: Optional[str] = None
    blurb: Optional[str] = None
    connectivity: Optional[str] = None

    model_config = {"from_attributes": True}


# ── Auth ──────────────────────────────────────────────────
class RegisterIn(BaseModel):
    email: EmailStr
    password: str
    name: Optional[str] = None


class LoginIn(BaseModel):
    email: EmailStr
    password: str


class TokenOut(BaseModel):
    access_token: str
    token_type: str = "bearer"


class UserOut(BaseModel):
    id: int
    email: str
    name: Optional[str] = None
    created_at: datetime

    model_config = {"from_attributes": True}


# ── Cart ──────────────────────────────────────────────────
class CartAddIn(BaseModel):
    product_id: str
    qty: int = 1


class CartItemOut(BaseModel):
    id: int
    product_id: str
    qty: int
    product: ProductOut

    model_config = {"from_attributes": True}


# ── Orders ────────────────────────────────────────────────
class OrderItemIn(BaseModel):
    product_id: str
    qty: int


class OrderIn(BaseModel):
    email: EmailStr
    items: list[OrderItemIn]
    shipping_address: Optional[str] = None


class OrderItemOut(BaseModel):
    id: int
    product_id: str
    qty: int
    price: int
    product: ProductOut

    model_config = {"from_attributes": True}


class OrderOut(BaseModel):
    id: int
    email: str
    total: int
    status: str
    shipping_address: Optional[str] = None
    created_at: datetime
    items: list[OrderItemOut]

    model_config = {"from_attributes": True}


# ── Newsletter ────────────────────────────────────────────
class NewsletterIn(BaseModel):
    email: EmailStr


class NewsletterOut(BaseModel):
    email: str
    subscribed_at: datetime

    model_config = {"from_attributes": True}
