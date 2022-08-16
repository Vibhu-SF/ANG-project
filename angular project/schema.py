from pydantic import BaseModel, Field
from typing import Optional

from sqlalchemy import true



class add_user_data(BaseModel):
    firstname: str
    middle_name: Optional[str] = None
    lastname: str
    contact: str
    role: int
    address: str


class user_data(add_user_data):
    user_id: int

    class Config:
        orm_mode = True
