from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

# this is the home route 
# @route get api/

@app.get("/api/")
async def read_root():
    return {"Message": "Congrats! This is your home route"}


# greet message api
# here we have to give name in the api like
# @route get /api/greet?name=vivek

@app.get("/api/greet")
def hello(name: str):
    return {'Message': "Hii "+ name + "! How are you!"}

# -------------------------------------------------

class User(BaseModel):
    name: str
    age: int


# @route post /api/user

@app.post("/api/user")
def hello(user: User ):
   return {"message": f"Hii {user.name} You are {user.age} years old"}



# -----------------------------------------------------------

#  Initial Static String
static_string = "Intial Text "


# this api adds new data to the static_string
# @route post /api/add?text=texttoadd

@app.post("/api/add")
async def add_text(text: str):
    global static_string
    static_string += text
    return {"message": "Text added", "current_string": static_string}

# change the text
# @route put /api/change?text= text to change

@app.put("/api/change")
async def change_text(text: str):
    global static_string
    static_string  = text
    return {"message": "Text Changed ","current_string":  static_string}
