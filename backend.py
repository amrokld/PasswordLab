from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import hashlib
import os
import hmac
import json

app = FastAPI()

app.add_middleware (
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5500"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DATABASE_FILE = "user.json"

# ---------- DATABASE -----------
def load_users():
    try:
        with open(DATABASE_FILE, "r") as file:
            return json.load(file)
    except FileNotFoundError:
        return {}

def save_users(users):
    with open(DATABASE_FILE, "w") as file:
        json.dump(users, file, indent=4)

# ------------- REQUEST HASHING ---------

def hash_password(password, salt):
    return hashlib.sha256(password.encode() + salt).hexdigest()

# ------------ REQUEST MODEL ------------

class RegisterRequest(BaseModel):
    username: str
    password: str

# ---------- REGISTER --------------
@app.post("/register")
def register(data: RegisterRequest):
    users = load_users()

    if data.username in users:
        return {
            "success": False,
            "message": "This username is already registered, bud! \n You may need to choose a different one."
        }

    salt = os.urandom(16)

    password_hash = hash_password(data.password, salt)

    users[data.username] = {
        "salt": salt.hex(),
        "hash": password_hash
    }

    save_users(users)

    return {
        "success": True,
        "message": "YAY, Welcome to the hub! You have an account now :o"
    }

# ---------- LOGIN ------------------

class LoginRequest(BaseModel):
    username: str
    password: str

@app.post("/login")
def login(data: LoginRequest):

    users = load_users()

    if data.username not in users:
        return {
            "success": False,
            "message": "Hmm, I checked. Either your username or password you just entered is wrong. Try again."
        }

    stored_user = users[data.username]

    stored_salt = bytes.fromhex(stored_user["salt"])
    stored_hash = stored_user["hash"]

    login_hash = hash_password(data.password, stored_salt)

    if hmac.compare_digest(login_hash, stored_hash):
        return {
            "success": True,
            "message": "YAY, You are In now!"
        }

    return {
        "success": False,
        "message": "NUH UH, wrong username or password, mate!"
    }

# ------------ CHANGE USERNAME -------------

class ChangeUsernameRequest(BaseModel):
    current_username: str
    new_username: str

@app.post("/change-username")
def change_username(data: ChangeUsernameRequest):
    users = load_users()

    # Check that the current account exists
    if data.current_username not in users:
        return {
            "success": False,
            "message": "Hm, I cant find your username in the database!"
        } 

    # Check that the new username is not already taken
    if data.new_username in users:
        return {
            "success": False,
            "message": "Sorry. but this username already taken, Choose another!"
        }

    # Move the existing user data to the new username
    users[data.new_username] = users[data.current_username]

    # Remove the old username
    del users[data.current_username]

    save_users(users)

    return {
        "sccess": True,
        "message": "Old one got vanished and the new one has registered successfully!"
    }

 
# ------------ HOME -----------------
@app.get("/")
def home():
    return {"message": "Password Security Lab is running"}