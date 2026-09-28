import pytest

from app.services import item_service


@pytest.fixture
def clean_database():
    item_service.items_db.clear()
    item_service.next_id = 1


def test_create_item(clean_database):
    item = item_service.create_item("Notebook", "Para estudos")

    assert item["id"] == 1
    assert item["name"] == "Notebook"
    assert item["description"] == "Para estudos"


def test_get_item_not_found(clean_database):
    item = item_service.get_item(999)

    assert item is None


@pytest.mark.parametrize(
    "name",
    ["Teclado", "Monitor", "Headset"],
)
def test_create_item_with_different_names(clean_database, name):
    item = item_service.create_item(name)

    assert item["name"] == name


def test_update_item(clean_database):
    item_service.create_item("Produto antigo")

    updated = item_service.update_item(
        1,
        "Produto atualizado",
        "Nova descricao",
    )

    assert updated["name"] == "Produto atualizado"
    assert updated["description"] == "Nova descricao"


def test_delete_item(clean_database):
    item_service.create_item("Produto")

    result = item_service.delete_item(1)

    assert result is True
    assert item_service.get_item(1) is None
