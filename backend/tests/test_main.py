import sys
from pathlib import Path

import pytest
from fastapi.testclient import TestClient

sys.path.insert(0, str(Path(__file__).parent.parent))

from main import app


@pytest.fixture
def client():
    return TestClient(app)


def test_root_status_code(client):
    response = client.get("/")
    assert response.status_code == 200


def test_root_response_json(client):
    response = client.get("/")
    assert response.json() == {
        "message": "C216 - Sistemas Distribuídos"
    }


def test_root_message_exists(client):
    response = client.get("/")
    assert "message" in response.json()


def test_root_message_is_string(client):
    response = client.get("/")
    assert isinstance(response.json()["message"], str)


@pytest.mark.parametrize(
    "path",
    ["/", "/docs", "/openapi.json"]
)
def test_existing_routes(client, path):
    response = client.get(path)
    assert response.status_code == 200


def test_invalid_route_returns_404(client):
    response = client.get("/rota-inexistente")
    assert response.status_code == 404


def test_root_content_type(client):
    response = client.get("/")
    assert response.headers["content-type"].startswith("application/json")