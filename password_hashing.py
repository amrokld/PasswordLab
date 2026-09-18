import hashlib
import os
import hmac
import json

DATABASE_FILE = "user.json"

def hash_password(password, salt):
    return hashlib.sha256(password.encode() + salt).hexdigest()

def load_users():
    try:
        with open(DATABASE_FILE, "r") as file:
            return json.load(file)
    except FileNotFoundError:
        return {}

def save_users(users):
    with open(DATABASE_FILE, "w") as file:
        json.dump(users, file, indent=4)

users = load_users()
 
# --------- RESGISTER -------------
print ("=== Create Account ====")
username = input("Choose a username: ")
password = input("Create your password: ")

if username in users:
    print("That username is already exists, bud!")
    print("You may need to choose another one.")
    exit()

salt = os.urandom(16) #16 random bytes.

password_hash = hash_password(password, salt)

users[username] = {
    "salt": salt.hex(),
    "hash": password_hash
}

save_users(users)

print("\nAccount created!")
print("Salt: ", salt.hex())
print("Hash: ", password_hash)

# ---------- LOGIN ----------------
print ("\n=== Login ====")
login_username = input("Whats your username: ")
login_password = input("Whats the password: ")

if login_username not in users:
    print("Hmm, I checked. That username isn't registered here, Are you sure?")
    exit()

stored_user = users[login_username]
stored_salt = bytes.fromhex(stored_user["salt"])
stored_hash = stored_user["hash"]

login_hash = hash_password(login_password, stored_salt)

if hmac.compare_digest(login_hash, password_hash):
    print ("YAY, You logged in Successfully!")
else:
    print ("NUH UH, Thats a wrong password, mate!")