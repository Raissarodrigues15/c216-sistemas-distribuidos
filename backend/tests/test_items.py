import pytest
from fastapi.testclient import TestClient

from app.main import app
from app.services import item_service


@pytest.fixture
def client():
    item_service.items_db.clear()
    item_service.next_id = 1
    return TestClient(app)


def test_list_items_empty(client):
    response = client.get("/items/")

    assert response.status_code == 200
    assert response.json() == []


def test_create_item(client):
    response = client.post(
        "/items/",
        json={
            "name": "Notebook",
            "description": "Notebook para estudos",
        },
    )

    assert response.status_code == 201
    assert response.json()["name"] == "Notebook"
    assert response.json()["description"] == "Notebook para estudos"


def test_get_item(client):
    client.post(
        "/items/",
        json={
            "name": "Mouse",
            "description": "Mouse sem fio",
        },
    )

    response = client.get("/items/1")

    assert response.status_code == 200
    assert response.json()["name"] == "Mouse"


def test_get_item_not_found(client):
    response = client.get("/items/999")

    assert response.status_code == 404
    assert response.json()["detail"] == "Item nao encontrado"


@pytest.mark.parametrize(
    "name",
    ["Teclado", "Monitor", "Headset"],
)
def test_create_items_with_different_names(client, name):
    response = client.post(
        "/items/",
        json={"name": name},
    )

    assert response.status_code == 201
    assert response.json()["name"] == name


def test_update_item(client):
    client.post(
        "/items/",
        json={"name": "Produto antigo"},
    )

    response = client.put(
        "/items/1",
        json={
            "name": "Produto atualizado",
            "description": "Nova descricao",
        },
    )

    assert response.status_code == 200
    assert response.json()["name"] == "Produto atualizado"


def test_delete_item(client):
    client.post(
        "/items/",
        json={"name": "Produto"},
    )

    response = client.delete("/items/1")

    assert response.status_code == 200
    assert response.json()["message"] == "Item removido com sucesso"

    response = client.get("/items/1")
    assert response.status_code == 404
