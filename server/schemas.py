from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class ContactMessageBase(BaseModel):
    name: str
    email: str
    subject: str
    message: str

class ContactMessageCreate(ContactMessageBase):
    pass

class ContactMessage(ContactMessageBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

class PCPartBase(BaseModel):
    category: str
    slug: str
    name: str
    role: Optional[str] = None
    description: Optional[str] = None
    image_path: Optional[str] = None
    specs: Optional[dict] = None

class PCPart(PCPartBase):
    id: int

    class Config:
        from_attributes = True

class NewsletterSubscriptionCreate(BaseModel):
    email: EmailStr

class NewsletterSubscription(BaseModel):
    id: int
    email: str
    subscribed_at: datetime

    class Config:
        from_attributes = True

