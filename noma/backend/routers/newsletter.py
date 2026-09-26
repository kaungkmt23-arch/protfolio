from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import Newsletter
from schemas import NewsletterIn, NewsletterOut

router = APIRouter(prefix="/api/newsletter", tags=["newsletter"])


@router.post("", response_model=NewsletterOut, status_code=201)
def subscribe(body: NewsletterIn, db: Session = Depends(get_db)):
    existing = db.query(Newsletter).filter(Newsletter.email == body.email).first()
    if existing:
        if existing.active:
            raise HTTPException(status_code=400, detail="Already subscribed")
        existing.active = True
        db.commit()
        db.refresh(existing)
        return existing
    entry = Newsletter(email=body.email)
    db.add(entry)
    db.commit()
    db.refresh(entry)
    return entry


@router.delete("", status_code=204)
def unsubscribe(email: str, db: Session = Depends(get_db)):
    entry = db.query(Newsletter).filter(Newsletter.email == email).first()
    if not entry:
        raise HTTPException(status_code=404, detail="Email not found")
    entry.active = False
    db.commit()
