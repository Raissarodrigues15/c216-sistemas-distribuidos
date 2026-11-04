
import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.database.base import Base
from app.models.item import Item
from app.schemas.item import ItemCreate, ItemUpdate, ItemPatch
from app.services.item_service import ItemService


@pytest.fixture
def clean_database():
    engine = create_engine("sqlite://")

    TestingSessionLocal = sessionmaker(
        autocommit=False,
        autoflush=False,
        bind=engine,
    )

    Base.metadata.create_all(bind=engine)

    db = TestingSessionLocal()

    try:
        yield ItemService(db)
    finally:
        db.close()
        Base.metadata.drop_all(bind=engine)
        engine.dispose()


def test_create_item(clean_database):
    item = clean_database.create_item(
        ItemCreate(
            name="Notebook",
            description="Para estudos",
        )
    )

    assert item.id == 1
    assert item.name == "Notebook"
    assert item.description == "Para estudos"


def test_get_item_not_found(clean_database):
    item = clean_database.get_item(999)

    assert item is None


@pytest.mark.parametrize(
    "name",
    ["Teclado", "Monitor", "Headset"],
)
def test_create_item_with_different_names(clean_database, name):
    item = clean_database.create_item(ItemCreate(name=name))

    assert item.name == name


def test_update_item(clean_database):
    created = clean_database.create_item(
        ItemCreate(name="Produto antigo")
    )

    updated = clean_database.update_item(
        created.id,
        ItemUpdate(
            name="Produto atualizado",
            description="Nova descricao",
        ),
    )

    assert updated is not None
    assert updated.name == "Produto atualizado"
    assert updated.description == "Nova descricao"


def test_patch_item(clean_database):
    created = clean_database.create_item(
        ItemCreate(
            name="Produto",
            description="Descricao antiga",
        )
    )

    updated = clean_database.patch_item(
        created.id,
        ItemPatch(name="Produto alterado"),
    )

    assert updated is not None
    assert updated.name == "Produto alterado"
    assert updated.description == "Descricao antiga"


def test_delete_item(clean_database):
    item = clean_database.create_item(
        ItemCreate(name="Produto")
    )

    result = clean_database.delete_item(item.id)

    assert result is True
    assert clean_database.get_item(item.id) is None


def test_update_item_not_found(clean_database):
    result = clean_database.update_item(
        999,
        ItemUpdate(name="Produto atualizado"),
    )

    assert result is None


def test_delete_item_not_found(clean_database):
    result = clean_database.delete_item(999)

    assert result is False
