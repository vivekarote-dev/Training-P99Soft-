from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal, engine
import models, auth

from fastapi.security import OAuth2PasswordBearer

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/register")
def register(email: str, password: str, db: Session = Depends(get_db)):
    existing = db.query(models.User).filter(models.User.email == email).first()

    if existing:
        raise HTTPException(status_code=400, detail="User already exists")

    hashed = auth.hash_password(password)

    user = models.User(email=email, hashed_password=hashed)

    db.add(user)
    db.commit()
    db.refresh(user)

    return {"message": "User created"}


@app.post("/login")
def login(email: str, password: str, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == email).first()

    if not user or not auth.verify_password(password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = auth.create_access_token({"sub": user.email})

    return {
        "access_token": token,
        "token_type": "bearer"
    }


@app.get("/me")
def get_me(token: str = Depends(oauth2_scheme)):
    payload = auth.decode_token(token)

    if payload is None:
        raise HTTPException(status_code=401, detail="Invalid token")

    return {"user": payload["sub"]}