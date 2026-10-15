from sqlalchemy.orm import Session
from app.repositories.item_repository import ItemRepository
from app.schemas.item import ItemCreate, ItemUpdate, ItemPatch

class ItemService:
    def __init__(self, db: Session):
        self.repository = ItemRepository(db)

    def list_items(self):
        return self.repository.get_all()

    def get_item(self, item_id: int):
        return self.repository.get_by_id(item_id)

    def create_item(self, item_data: ItemCreate):
        return self.repository.create(item_data)

    def update_item(self, item_id: int, item_data: ItemUpdate):
        return self.repository.update(item_id, item_data)

    def patch_item(self, item_id: int, item_data: ItemPatch):
        return self.repository.patch(item_id, item_data)

    def delete_item(self, item_id: int):
        return self.repository.delete(item_id)