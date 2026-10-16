from typing import Optional
from pydantic import BaseModel, ConfigDict

class ItemCreate(BaseModel):
    name: str
    description: Optional[str] = None

class ItemUpdate(BaseModel):
    name: str
    description: Optional[str] = None

class ItemPatch(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None

class ItemResponse(ItemCreate):
    id: int

    model_config = ConfigDict(from_attributes=True)
