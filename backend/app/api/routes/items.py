from fastapi import APIRouter, HTTPException, Query

from app.schemas.item import ItemCreate, ItemPatch, ItemUpdate
from app.services import item_service

router = APIRouter(prefix="/items", tags=["items"])


@router.get("/")
def list_items(name: str | None = Query(default=None)):
    items = item_service.list_items()

    if name is not None:
        items = [item for item in items if item["name"] == name]

    return items


@router.get("/{item_id}")
def get_item(item_id: int):
    item = item_service.get_item(item_id)

    if item is None:
        raise HTTPException(status_code=404, detail="Item nao encontrado")

    return item


@router.post("/", status_code=201)
def create_item(item: ItemCreate):
    return item_service.create_item(
        name=item.name,
        description=item.description,
    )


@router.put("/{item_id}")
def update_item(item_id: int, item: ItemUpdate):
    updated_item = item_service.update_item(
        item_id=item_id,
        name=item.name,
        description=item.description,
    )

    if updated_item is None:
        raise HTTPException(status_code=404, detail="Item nao encontrado")

    return updated_item


@router.patch("/{item_id}")
def patch_item(item_id: int, item: ItemPatch):
    updated_item = item_service.patch_item(
        item_id=item_id,
        name=item.name,
        description=item.description,
    )

    if updated_item is None:
        raise HTTPException(status_code=404, detail="Item nao encontrado")

    return updated_item


@router.delete("/{item_id}")
def delete_item(item_id: int):
    deleted = item_service.delete_item(item_id)

    if not deleted:
        raise HTTPException(status_code=404, detail="Item nao encontrado")

    return {"message": "Item removido com sucesso"}
