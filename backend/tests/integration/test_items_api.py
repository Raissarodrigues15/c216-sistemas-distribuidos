
import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from app.main import app
from app.database.base import Base
from app.database.session import get_db
from app.models.item import Item


@pytest.fixture
def client():
    engine = create_engine(
        "sqlite://",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )

    TestingSessionLocal = sessionmaker(
        autocommit=False,
        autoflush=False,
        bind=engine,
    )

    Base.metadata.create_all(bind=engine)

    def override_get_db():
        db = TestingSessionLocal()
        try:
            yield db
        finally:
            db.close()

    app.dependency_overrides[get_db] = override_get_db

    with TestClient(app) as test_client:
        yield test_client

    app.dependency_overrides.clear()
    Base.metadata.drop_all(bind=engine)
    engine.dispose()


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
    assert "id" in response.json()


def test_get_item(client):
    create_response = client.post(
        "/items/",
        json={
            "name": "Mouse",
            "description": "Mouse sem fio",
        },
    )

    item_id = create_response.json()["id"]
    response = client.get(f"/items/{item_id}")

    assert response.status_code == 200
    assert response.json()["name"] == "Mouse"


def test_get_item_not_found(client):
    response = client.get("/items/999")

    assert response.status_code == 404
    assert response.json()["detail"] == "Item nao encontrado"


def test_update_item(client):
    create_response = client.post(
        "/items/",
        json={"name": "Produto antigo"},
    )

    item_id = create_response.json()["id"]

    response = client.put(
        f"/items/{item_id}",
        json={
            "name": "Produto atualizado",
            "description": "Nova descricao",
        },
    )

    assert response.status_code == 200
    assert response.json()["name"] == "Produto atualizado"
    assert response.json()["description"] == "Nova descricao"


def test_patch_item(client):
    create_response = client.post(
        "/items/",
        json={
            "name": "Produto",
            "description": "Descricao antiga",
        },
    )

    item_id = create_response.json()["id"]

    response = client.patch(
        f"/items/{item_id}",
        json={"name": "Produto alterado"},
    )

    assert response.status_code == 200
    assert response.json()["name"] == "Produto alterado"
    assert response.json()["description"] == "Descricao antiga"


def test_delete_item(client):
    create_response = client.post(
        "/items/",
        json={"name": "Produto"},
    )

    item_id = create_response.json()["id"]

    response = client.delete(f"/items/{item_id}")

    assert response.status_code == 200
    assert response.json()["message"] == "Item removido com sucesso"

    response = client.get(f"/items/{item_id}")
    assert response.status_code == 404


def test_query_parameter_name(client):
    client.post(
        "/items/",
        json={"name": "Notebook"},
    )

    client.post(
        "/items/",
        json={"name": "Mouse"},
    )

    response = client.get("/items/?name=Notebook")

    assert response.status_code == 200
    assert len(response.json()) == 1
    assert response.json()[0]["name"] == "Notebook"
