import sys
import os
from datetime import datetime
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from database import SessionLocal
import models

def run():
    db = SessionLocal()
    
    # Check if orders exist
    if db.query(models.Order).first():
        print("Orders already exist")
        return
        
    orders = [
        {
            "id": "ORD-001",
            "date": datetime.utcnow(),
            "customerName": "Juan Pérez",
            "customerEmail": "juan@example.com",
            "customerPhone": "555-1234",
            "customerAddress": "Calle Falsa 123",
            "subtotal": 1899,
            "discount": 0,
            "shipping": 0,
            "total": 1899,
            "status": "delivered",
            "paymentMethod": "Tarjeta de Crédito"
        },
        {
            "id": "ORD-002",
            "date": datetime.utcnow(),
            "customerName": "María García",
            "customerEmail": "maria@example.com",
            "customerPhone": "555-5678",
            "customerAddress": "Avenida 742",
            "subtotal": 149,
            "discount": 0,
            "shipping": 25,
            "total": 174,
            "status": "processing",
            "paymentMethod": "PayPal"
        }
    ]

    order_items = [
        {"order_id": "ORD-001", "product_id": "1", "quantity": 1, "price": 1899},
        {"order_id": "ORD-002", "product_id": "3", "quantity": 1, "price": 149}
    ]

    for order in orders:
        db.add(models.Order(**order))
    for item in order_items:
        db.add(models.OrderItem(**item))

    db.commit()
    db.close()
    print("Mock orders added")

if __name__ == "__main__":
    run()
