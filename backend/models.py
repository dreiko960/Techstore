from sqlalchemy import Boolean, Column, Float, Integer, String, JSON, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base

class Category(Base):
    __tablename__ = "categories"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, index=True)
    icon = Column(String)
    productCount = Column(Integer, default=0)

class Product(Base):
    __tablename__ = "products"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(String)
    price = Column(Float)
    originalPrice = Column(Float, nullable=True)
    discount = Column(Integer, nullable=True)
    image = Column(String)
    images = Column(JSON, nullable=True)
    category = Column(String, index=True)
    brand = Column(String, index=True)
    stock = Column(Integer)
    rating = Column(Float)
    reviews = Column(Integer)
    sku = Column(String, unique=True, index=True)
    isNew = Column(Boolean, default=False)
    isFeatured = Column(Boolean, default=False)
    specifications = Column(JSON, nullable=True)

class Brand(Base):
    __tablename__ = "brands"

    name = Column(String, primary_key=True, index=True)
    logo = Column(String)

class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, index=True)
    name = Column(String)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    role = Column(String) # 'admin', 'customer', etc.

class Order(Base):
    __tablename__ = "orders"

    id = Column(String, primary_key=True, index=True)
    date = Column(DateTime, default=datetime.utcnow)
    customerName = Column(String)
    customerEmail = Column(String)
    customerPhone = Column(String)
    customerAddress = Column(String)
    subtotal = Column(Float)
    discount = Column(Float)
    shipping = Column(Float)
    total = Column(Float)
    status = Column(String, default="pending")
    paymentMethod = Column(String, nullable=True)
    
    items = relationship("OrderItem", back_populates="order")

class OrderItem(Base):
    __tablename__ = "order_items"

    id = Column(Integer, primary_key=True, autoincrement=True)
    order_id = Column(String, ForeignKey("orders.id"))
    product_id = Column(String, ForeignKey("products.id"))
    quantity = Column(Integer)
    price = Column(Float)
    
    order = relationship("Order", back_populates="items")


