from pickletools import int4
from fastapi import FastAPI,status
from sqlalchemy.orm import Session
from fastapi import Depends
from typing import List

import db_table_model
import schema
import repo
from db import get_db, engine
from fastapi.responses import JSONResponse
from typing import List
from fastapi.middleware.cors import CORSMiddleware


db_table_model.Base.metadata.create_all(bind=engine)

app = FastAPI(title="CRUD operations")

origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.exception_handler(Exception)
def validation_exception_handler(request, err):
    base_error_message = f"Failed to execute: {request.method}: {request.url}"
    return JSONResponse(status_code=400, content={"message": f"{base_error_message}. Detail: {err}"})


@app.get("/")
def test_Api():
    return "success"


@app.post("/add_user", response_model=schema.user_data)
async def add_user(user_info: schema.add_user_data, db: Session = Depends(get_db)):
    return repo.users.add_user(db, user_info)

@app.get("/user_by_id", response_model=schema.user_data)
async def get_user(id:int, db: Session = Depends(get_db)):
    return repo.users.user_by_id(db, id)

@app.get("/all_user",response_model=List[schema.user_data])
async def get_all_users(db:Session =Depends(get_db)):
    return repo.users.all_users(db)

@app.delete("/delete_user")
async def delete_user(contact:str,db:Session=Depends(get_db)):
    return repo.users.delete_user(db,contact)


@app.get("/user_by_contact")
async def user_by_contact(contact:str,db:Session=Depends(get_db)):
    return repo.users.user_by_contact(db,contact)


@app.put("/update_user")
async def user_update(user_data:schema.add_user_data,contact:str,db: Session=Depends(get_db)):
    return repo.users.user_update(db,contact,user_data)
