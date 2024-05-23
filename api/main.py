from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv
from pymongo import MongoClient
from pymongo.collection import ReturnDocument
from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel
from bson import json_util, ObjectId
import json

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Adjust accordingly
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MONGO_DETAILS = os.getenv("MONGO_DETAILS")
client = MongoClient(MONGO_DETAILS)

class User(BaseModel):
    email: str
    name: str
    image: str

def get_user_collection():
    db = client['Chatbot-base']
    return db.users

def find_or_create_user(user_data):    
    user_collection = get_user_collection()
    user = user_collection.find_one({"email": user_data["email"]})    
    if user is None:
        print("User not found. Creating new user")
        user = user_collection.insert_one(user_data).inserted_id
    user = user_collection.find_one({"_id": user})        
    return json.loads(json_util.dumps(user))  

@app.post("/api/users/")
async def create_or_update_user(user: User):    
    user_data = user.dict()    
    try:
        logged_in_user = find_or_create_user(user_data)        
        if logged_in_user:                        
            return {"status": "user logged in", "user": logged_in_user}
        else:
            return {"status": "user could not be logged in"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


class Text(BaseModel):
    text: str
    userEmail: str

def get_text_collection():
    db = client['Chatbot-base']
    return db.texts

@app.post("/api/add-text/")
async def create_text(text: Text):
    text_collection = get_text_collection()
    text_data = text.dict()    
    try:        
        user_id = get_user_collection().find_one({"email": text_data["userEmail"]})['_id']
        text_data['user_id'] = user_id
        text_data = text_collection.insert_one(text_data).inserted_id
        text_data = json.loads(json_util.dumps(text_data))  
        return {"status": "Text created", "res": text_data}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.put("/api/update-text/{text_id}")
async def edit_text(text: Text, text_id: str):
    print(text)
    text_collection = get_text_collection()
    updated_result = text_collection.update_one(
        {"_id": ObjectId(text_id)},  
        {"$set": {"text": text.text, "userEmail": text.userEmail}}
    )
    if updated_result:
        return {"message": "Text updated successfully", "id": text_id}
    raise HTTPException(status_code=404, detail="Text not found")


class Chatbot(BaseModel):
    name: str
    dataType: str
    sourceId: str
    userEmail: str
    status: str
    model: str
    visibility: str
    temperature: str
    lastTrainedAt: str

def get_chatbot_collection():
    db = client['Chatbot-base']
    return db.chatbots

@app.post("/api/create-chatbot/")
async def create_chatbot(chatbot: Chatbot):
    chatbot_collection = get_chatbot_collection()
    chatbot_data = chatbot.dict()    
    try:    
        # Chatbot code here
        user_id = get_user_collection().find_one({"email": chatbot_data["userEmail"]})['_id']
        chatbot_data['user_id'] = user_id
        chatbot_data['sourceId'] = ObjectId(chatbot_data['sourceId'])
        chatbot_data = chatbot_collection.insert_one(chatbot_data).inserted_id
        chatbot_data = json.loads(json_util.dumps(chatbot_data))  
        return {"status_code": 200, "status": "Chatbot created", "res": chatbot_data}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/api/chatbots/{user_email}")
async def get_all_chatbots(user_email: str):        
    try:
        chatbot_collection = get_chatbot_collection()
        user_id = get_user_collection().find_one({"email": user_email})['_id']
        chatbots = chatbot_collection.find({"user_id": user_id})
        chatbots = json.loads(json_util.dumps(chatbots))        
        return {"status_code": 200, "chatbots": chatbots}
    except Exception as e:
        print(e)
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/api/chatbot/{chatbot_id}")
async def get_all_chatbots(chatbot_id: str):        
    try:
        chatbot_collection = get_chatbot_collection()        
        chatbot = chatbot_collection.find_one({"_id": ObjectId(chatbot_id)})        
        chatbot = json.loads(json_util.dumps(chatbot))                
        return {"status_code": 200, "chatbot": chatbot}
    except Exception as e:
        print(e)
        raise HTTPException(status_code=400, detail=str(e))

    
