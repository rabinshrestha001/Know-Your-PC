from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List

import models
import schemas
import database

app = FastAPI(title="Know Your PC API")

# Create database tables
@app.on_event("startup")
def startup():
    models.Base.metadata.create_all(bind=database.engine)
    
    # Auto-seed if database is empty
    db = database.SessionLocal()
    try:
        if db.query(models.PCPart).count() == 0:
            print("Database empty, running seed...")
            from seed import seed
            seed()
    finally:
        db.close()

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, replace with your actual domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to Know Your PC API", "status": "online"}

# --- Contact Form Endpoints ---

@app.post("/api/contact", response_model=schemas.ContactMessage)
def create_contact_message(
    message: schemas.ContactMessageCreate, 
    db: Session = Depends(database.get_db)
):
    db_message = models.ContactMessage(**message.model_dump())
    db.add(db_message)
    db.commit()
    db.refresh(db_message)
    return db_message

@app.get("/api/contact", response_model=List[schemas.ContactMessage])
def get_contact_messages(
    skip: int = 0, 
    limit: int = 100, 
    db: Session = Depends(database.get_db)
):
    messages = db.query(models.ContactMessage).offset(skip).limit(limit).all()
    return messages

# --- PC Parts Endpoints ---

@app.get("/api/parts", response_model=List[schemas.PCPart])
def get_parts(
    category: str = None, 
    db: Session = Depends(database.get_db)
):
    query = db.query(models.PCPart)
    if category:
        query = query.filter(models.PCPart.category == category)
    return query.all()

# --- Newsletter Endpoints ---

@app.post("/api/newsletter", response_model=schemas.NewsletterSubscription)
def subscribe_newsletter(
    subscription: schemas.NewsletterSubscriptionCreate, 
    db: Session = Depends(database.get_db)
):
    # Check if already subscribed
    existing = db.query(models.NewsletterSubscription).filter(models.NewsletterSubscription.email == subscription.email).first()
    if existing:
        return existing # Or raise 400 if preferred, but usually just return success
    
    db_subscription = models.NewsletterSubscription(email=subscription.email)
    db.add(db_subscription)
    db.commit()
    db.refresh(db_subscription)
    return db_subscription

@app.post("/api/parts", response_model=schemas.PCPart)
def create_part(
    part: schemas.PCPartBase, 
    db: Session = Depends(database.get_db)
):
    db_part = models.PCPart(**part.model_dump())
    db.add(db_part)
    db.commit()
    db.refresh(db_part)
    return db_part
