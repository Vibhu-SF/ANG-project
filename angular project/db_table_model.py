from enum import unique
from db import Base
from sqlalchemy import BigInteger, Integer, Column, String, DateTime, ForeignKey, TIME
from typing import Optional


class user_table(Base):

    __tablename__ = "user_table"

    user_id = Column(Integer, primary_key=True, index=True)
    firstname = Column(String(30), index=True)
    middle_name = Column(String(30), default="None")
    lastname = Column(String(30), index=True)
    contact = Column(String(14), index=True , unique=True)
    role = Column(Integer)
    address = Column(String(100))


