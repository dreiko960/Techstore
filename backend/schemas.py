from typing import List, Optional, Dict
from pydantic import BaseModel

class CategoryBase(BaseModel):
    id: str
    name: str
    icon: str
    productCount: Optional[int] = 0

class Category(CategoryBase):
    class Config:
        orm_mode = True

class ProductBase(BaseModel):
    id: str
    name: str
    description: str
    price: float
    originalPrice: Optional[float] = None
    discount: Optional[int] = None
    image: str
    images: Optional[List[str]] = None
    category: str
    brand: str
    stock: int
    rating: float
    reviews: int
    sku: str
    isNew: Optional[bool] = False
    isFeatured: Optional[bool] = False
    specifications: Optional[Dict[str, str]] = None

class ProductCreate(ProductBase):
    pass

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    originalPrice: Optional[float] = None
    discount: Optional[int] = None
    image: Optional[str] = None
    images: Optional[List[str]] = None
    category: Optional[str] = None
    brand: Optional[str] = None
    stock: Optional[int] = None
    rating: Optional[float] = None
    reviews: Optional[int] = None
    sku: Optional[str] = None
    isNew: Optional[bool] = None
    isFeatured: Optional[bool] = None
    specifications: Optional[Dict[str, str]] = None

class Product(ProductBase):
    class Config:
        orm_mode = True

class BrandBase(BaseModel):
    name: str
    logo: str

class Brand(BrandBase):
    class Config:
        orm_mode = True

class UserBase(BaseModel):
    id: str
    name: str
    email: str
    role: str

class User(UserBase):
    class Config:
        orm_mode = True

class UserCreate(UserBase):
    password: str

from datetime import datetime

class LoginRequest(BaseModel):
    email: str
    password: str

class OrderItemBase(BaseModel):
    product_id: str
    quantity: int
    price: float

class OrderItem(OrderItemBase):
    id: int
    order_id: str
    class Config:
        orm_mode = True

class OrderBase(BaseModel):
    customerName: str
    customerEmail: str
    customerPhone: str
    customerAddress: str
    subtotal: float
    discount: float
    shipping: float
    total: float
    status: Optional[str] = "pending"
    paymentMethod: Optional[str] = None

class OrderCreate(OrderBase):
    items: List[OrderItemBase]

class Order(OrderBase):
    id: str
    date: datetime
    items: List[OrderItem]
    class Config:
        orm_mode = True
