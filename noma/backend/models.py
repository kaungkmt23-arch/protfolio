from datetime import datetime
from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from database import Base


class Product(Base):
    __tablename__ = "products"

    id = Column(String, primary_key=True)  # e.g. 'kb-flow'
    name = Column(String, nullable=False)
    category = Column(String, nullable=False)
    price = Column(Integer, nullable=False)  # in yen
    stock = Column(Integer, default=100)
    photo_id = Column(Integer, nullable=False)  # Pexels photo id
    badge = Column(String, nullable=True)
    blurb = Column(Text, nullable=True)
    connectivity = Column(String, nullable=True)  # comma-separated

    order_items = relationship("OrderItem", back_populates="product")
    cart_items = relationship("CartItem", back_populates="product")


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, autoincrement=True)
    email = Column(String, unique=True, nullable=False, index=True)
    password_hash = Column(String, nullable=False)
    name = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    orders = relationship("Order", back_populates="user")
    cart_items = relationship("CartItem", back_populates="user")


class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    email = Column(String, nullable=False)  # for guest checkout
    total = Column(Integer, nullable=False)  # in yen
    status = Column(String, default="pending")  # pending, paid, shipped, delivered
    shipping_address = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="orders")
    items = relationship("OrderItem", back_populates="order")


class OrderItem(Base):
    __tablename__ = "order_items"

    id = Column(Integer, primary_key=True, autoincrement=True)
    order_id = Column(Integer, ForeignKey("orders.id"), nullable=False)
    product_id = Column(String, ForeignKey("products.id"), nullable=False)
    qty = Column(Integer, nullable=False)
    price = Column(Integer, nullable=False)  # price at time of purchase

    order = relationship("Order", back_populates="items")
    product = relationship("Product", back_populates="order_items")


class CartItem(Base):
    __tablename__ = "cart"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    product_id = Column(String, ForeignKey("products.id"), nullable=False)
    qty = Column(Integer, nullable=False, default=1)

    user = relationship("User", back_populates="cart_items")
    product = relationship("Product", back_populates="cart_items")


class Newsletter(Base):
    __tablename__ = "newsletter"

    id = Column(Integer, primary_key=True, autoincrement=True)
    email = Column(String, unique=True, nullable=False)
    subscribed_at = Column(DateTime, default=datetime.utcnow)
    active = Column(Boolean, default=True)
