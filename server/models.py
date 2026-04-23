from sqlalchemy import Column, Integer, String, Text, DateTime, JSON
from datetime import datetime
from database import Base

class ContactMessage(Base):
    __tablename__ = "contact_messages"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), nullable=False)
    subject = Column(String(200), nullable=False)
    message = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

class PCPart(Base):
    __tablename__ = "pc_parts"

    id = Column(Integer, primary_key=True, index=True)
    category = Column(String(50), index=True) # core, storage, etc
    slug = Column(String(50), unique=True, index=True) # Matches modal IDs (e.g., 'cpu')
    name = Column(String(100), nullable=False)
    role = Column(String(100))
    description = Column(Text)
    image_path = Column(String(255))
    specs = Column(JSON, nullable=True) # Added JSON for flexible specs

class NewsletterSubscription(Base):
    __tablename__ = "newsletter_subscriptions"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(100), unique=True, index=True, nullable=False)
    subscribed_at = Column(DateTime, default=datetime.utcnow)

