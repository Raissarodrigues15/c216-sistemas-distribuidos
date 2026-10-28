from sqlalchemy.orm import Session
from app.models.item import Item
from app.schemas.item import ItemCreate, ItemUpdate, ItemPatch

class ItemRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_all(self):
        return self.db.query(Item).all()

    def get_by_id(self, item_id: int):
        return self.db.query(Item).filter(Item.id == item_id).first()

    def create(self, item_data: ItemCreate):
        db_item = Item(name=item_data.name, description=item_data.description)
        self.db.add(db_item)
        self.db.commit()
        self.db.refresh(db_item)
        return db_item

    def update(self, item_id: int, item_data: ItemUpdate):
        db_item = self.get_by_id(item_id)
        if not db_item:
            return None
        db_item.name = item_data.name
        db_item.description = item_data.description
        self.db.commit()
        self.db.refresh(db_item)
        return db_item

    def patch(self, item_id: int, item_data: ItemPatch):
        db_item = self.get_by_id(item_id)
        if not db_item:
            return None
        if item_data.name is not None:
            db_item.name = item_data.name
        if item_data.description is not None:
            db_item.description = item_data.description
        self.db.commit()
        self.db.refresh(db_item)
        return db_item

    def delete(self, item_id: int):
        db_item = self.get_by_id(item_id)
        if not db_item:
            return False
        self.db.delete(db_item)
        self.db.commit()
        return True