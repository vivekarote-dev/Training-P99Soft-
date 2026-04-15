from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session

import models
import auth
import schemas
from database import engine, SessionLocal, Base

app = FastAPI()

# Create tables
Base.metadata.create_all(bind=engine)


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()



@app.post("/register")
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):

    existing = db.query(models.User).filter(models.User.email == user.email).first()

    if existing:
        raise HTTPException(status_code=400, detail="User already exists")

    print("PASSWORD:", user.password)
    print("LENGTH:", len(user.password.encode()))

    hashed = auth.hash_password(user.password)

    new_user = models.User(
        email=user.email,
        hashed_password=hashed
    )

    db.add(new_user)
    db.commit()

    return {"message": "User created"}



@app.post("/login")
def login(user: schemas.UserLogin, db: Session = Depends(get_db)):

    db_user = db.query(models.User).filter(models.User.email == user.email).first()

    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid email")

    if not auth.verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=400, detail="Invalid password")

    token = auth.create_access_token({"sub": user.email})

    return {"access_token": token, "token_type": "bearer"}


@app.get("/me")
def get_me(token: str):

    payload = auth.decode_token(token)

    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")

    return {"user": payload["sub"]}