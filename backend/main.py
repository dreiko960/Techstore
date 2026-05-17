from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List

import models, schemas
from database import engine, get_db

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="E-commerce API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/products", response_model=List[schemas.Product])
def read_products(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    products = db.query(models.Product).offset(skip).limit(limit).all()
    return products

@app.get("/api/products/{product_id}", response_model=schemas.Product)
def read_product(product_id: str, db: Session = Depends(get_db)):
    product = db.query(models.Product).filter(models.Product.id == product_id).first()
    if product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@app.get("/api/categories", response_model=List[schemas.Category])
def read_categories(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    categories = db.query(models.Category).offset(skip).limit(limit).all()
    return categories

@app.get("/api/brands", response_model=List[schemas.Brand])
def read_brands(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    brands = db.query(models.Brand).offset(skip).limit(limit).all()
    return brands

@app.post("/api/login")
def login(request: schemas.LoginRequest, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == request.email).first()
    if not user or user.password != request.password:
        raise HTTPException(status_code=401, detail="Credenciales incorrectas")
    
    return {
        "success": True,
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "role": user.role
        }
    }

@app.post("/api/products", response_model=schemas.Product)
def create_product(product: schemas.ProductCreate, db: Session = Depends(get_db)):
    db_product = models.Product(**product.model_dump())
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product

@app.put("/api/products/{product_id}", response_model=schemas.Product)
def update_product(product_id: str, product: schemas.ProductUpdate, db: Session = Depends(get_db)):
    db_product = db.query(models.Product).filter(models.Product.id == product_id).first()
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    update_data = product.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_product, key, value)
        
    db.commit()
    db.refresh(db_product)
    return db_product

@app.delete("/api/products/{product_id}")
def delete_product(product_id: str, db: Session = Depends(get_db)):
    db_product = db.query(models.Product).filter(models.Product.id == product_id).first()
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")
    db.delete(db_product)
    db.commit()
    return {"ok": True}

@app.post("/api/orders", response_model=schemas.Order)
def create_order(order: schemas.OrderCreate, db: Session = Depends(get_db)):
    import uuid
    # Create the order
    order_id = str(uuid.uuid4())
    db_order = models.Order(
        id=order_id,
        customerName=order.customerName,
        customerEmail=order.customerEmail,
        customerPhone=order.customerPhone,
        customerAddress=order.customerAddress,
        subtotal=order.subtotal,
        discount=order.discount,
        shipping=order.shipping,
        total=order.total,
        status=order.status,
        paymentMethod=order.paymentMethod
    )
    db.add(db_order)
    
    # Add items and update stock
    for item in order.items:
        db_item = models.OrderItem(
            order_id=order_id,
            product_id=item.product_id,
            quantity=item.quantity,
            price=item.price
        )
        db.add(db_item)
        
        # Update stock
        product = db.query(models.Product).filter(models.Product.id == item.product_id).first()
        if product:
            if product.stock < item.quantity:
                raise HTTPException(status_code=400, detail=f"No hay suficiente stock para {product.name}")
            product.stock -= item.quantity
            
    db.commit()
    db.refresh(db_order)
    return db_order

@app.get("/api/orders", response_model=List[schemas.Order])
def get_orders(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(models.Order).offset(skip).limit(limit).all()

from pydantic import BaseModel
class OrderStatusUpdate(BaseModel):
    status: str

@app.patch("/api/orders/{order_id}/status")
def update_order_status(order_id: str, update: OrderStatusUpdate, db: Session = Depends(get_db)):
    db_order = db.query(models.Order).filter(models.Order.id == order_id).first()
    if not db_order:
        raise HTTPException(status_code=404, detail="Order not found")
    db_order.status = update.status
    db.commit()
    db.refresh(db_order)
    return {"ok": True, "status": db_order.status}

@app.delete("/api/orders/{order_id}")
def delete_order(order_id: str, db: Session = Depends(get_db)):
    db_order = db.query(models.Order).filter(models.Order.id == order_id).first()
    if not db_order:
        raise HTTPException(status_code=404, detail="Order not found")
        
    # Delete order items first
    db.query(models.OrderItem).filter(models.OrderItem.order_id == order_id).delete()
    
    # Delete order
    db.delete(db_order)
    db.commit()
    return {"ok": True}

class OrderUpdate(BaseModel):
    customerName: str
    customerEmail: str
    customerPhone: str
    customerAddress: str

@app.put("/api/orders/{order_id}")
def update_order(order_id: str, update: OrderUpdate, db: Session = Depends(get_db)):
    db_order = db.query(models.Order).filter(models.Order.id == order_id).first()
    if not db_order:
        raise HTTPException(status_code=404, detail="Order not found")
        
    db_order.customerName = update.customerName
    db_order.customerEmail = update.customerEmail
    db_order.customerPhone = update.customerPhone
    db_order.customerAddress = update.customerAddress
    
    db.commit()
    db.refresh(db_order)
    return db_order
