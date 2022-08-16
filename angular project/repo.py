from re import S
from sqlite3 import dbapi2
import db_table_model
import schema
from sqlalchemy.orm import Session
from fastapi import HTTPException, status


class users:
    def add_user(db: Session, user_details: schema.add_user_data):
        new_user = db_table_model.user_table(firstname=user_details.firstname, middle_name=user_details.middle_name,
                                             lastname=user_details.lastname, contact=user_details.contact,
                                             role=user_details.role, address=user_details.address)
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return new_user

    def all_users(db: Session):
        return db.query(db_table_model.user_table).all()

    def user_by_id(db:Session, id:int):
        return db.query(db_table_model.user_table).filter(db_table_model.user_table.user_id == id).first()


    def delete_user(db:Session, contact:str):
         db.query(db_table_model.user_table).filter(db_table_model.user_table.contact == contact).delete(synchronize_session=False)
         db.commit()
         return "Done"

    def user_by_contact(db:Session,contact:str):
        return db.query(db_table_model.user_table).filter(db_table_model.user_table.contact == contact).first()

    def user_update(db:Session,contact:str,user_data:schema.add_user_data):
        user = db.query(db_table_model.user_table).filter(db_table_model.user_table.contact ==contact).update({'firstname':user_data.firstname,
        'middle_name':user_data.middle_name,'lastname':user_data.lastname,'contact':user_data.contact,'role':user_data.role,
        'address':user_data.address},synchronize_session=False)
        db.commit()
        return "Done"
           
     
                                                                                                                
                                                                                                                
                                                                                                                
                                                                                                                
                                                                                                              
                                                                                                               
        


         


    

