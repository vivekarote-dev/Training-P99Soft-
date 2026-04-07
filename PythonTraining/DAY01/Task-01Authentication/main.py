from fastapi import FastAPI, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
import bcrypt
import jwt
import os
from dotenv import load_dotenv
from datetime import datetime, timedelta

load_dotenv()

app = FastAPI()


SECRET_KEY = os.getenv("SECRET_KEY")

# Fake databse
users_db = {}


# ------------------------
# User Model
# ------------------------

class User(BaseModel):
    username: str
    password:str


# ---------------------
# Register
# ---------------------

@app.post("/register")
def register(user: User):
    if user.username in users_db:
        raise HTTPException(status_code=400, detail="User already exists")
    
    hashed_password = bcrypt.hashpw(user.password.encode('utf-8'), bcrypt.gensalt())
    users_db[user.username]=hashed_password

    return {"message": "User registered sucessfully"}

# --------------------------------
# Login
# --------------------------------

@app.post("/login")
def login(user: User):
    if user.username not in users_db:
        raise HTTPException(status_code=400, detail="Invalid username")
    
    stored_password = users_db[user.username]

    if not bcrypt.checkpw(user.password.encode('utf-8'), stored_password):
        raise HTTPException(status_code=400, detail ="Wrong password")
    
    payload = {
        "sub": user.username,
        "exp": datetime.utcnow() + timedelta(hours=1)
    }

    token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")

    return {"access_token": token}

# ---------------------------------
#  Protected Route
# ---------------------------------
security = HTTPBearer()

@app.get("/profile")
def profile(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        token = credentials.credentials
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        username = payload["sub"]

        return{ "message": f"Hello {username}"}
    
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except:
        raise HTTPException(status_code=401, detail="Invalid token")