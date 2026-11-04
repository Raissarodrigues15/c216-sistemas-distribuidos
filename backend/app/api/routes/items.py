
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.schemas.item import ItemCreate, ItemPatch, ItemUpdate, ItemResponse
from app.services.item_service import ItemService

router = APIRouter(prefix="/items", tags=["items"])


@router.get("/", response_model=list[ItemResponse])
def list_items(
    name: str | None = Query(default=None),
    db: Session = Depends(get_db),
):
    service = ItemService(db)
    items = service.list_items()

    if name is not None:
        items = [item for item in items if item.name == name]

    return items


@router.get("/{item_id}", response_model=ItemResponse)
def get_item(item_id: int, db: Session = Depends(get_db)):
    service = ItemService(db)
    item = service.get_item(item_id)

    if item is None:
        raise HTTPException(
            status_code=404,
            detail="Item nao encontrado",
        )

    return item


@router.post("/", response_model=ItemResponse, status_code=201)
def create_item(item: ItemCreate, db: Session = Depends(get_db)):
    service = ItemService(db)
    return service.create_item(item)


@router.put("/{item_id}", response_model=ItemResponse)
def update_item(
    item_id: int,
    item: ItemUpdate,
    db: Session = Depends(get_db),
):
    service = ItemService(db)
    updated_item = service.update_item(item_id, item)

    if updated_item is None:
        raise HTTPException(
            status_code=404,
            detail="Item nao encontrado",
        )

    return updated_item


@router.patch("/{item_id}", response_model=ItemResponse)
def patch_item(
    item_id: int,
    item: ItemPatch,
    db: Session = Depends(get_db),
):
    service = ItemService(db)
    updated_item = service.patch_item(item_id, item)

    if updated_item is None:
        raise HTTPException(
            status_code=404,
            detail="Item nao encontrado",
        )

    return updated_item


@router.delete("/{item_id}")
def delete_item(item_id: int, db: Session = Depends(get_db)):
    service = ItemService(db)
    deleted = service.delete_item(item_id)

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Item nao encontrado",
        )

    return {"message": "Item removido com sucesso"}
