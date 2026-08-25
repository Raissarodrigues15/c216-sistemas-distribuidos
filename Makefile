.PHONY: help install run test build up down logs clean check

help:
@echo "Comandos disponíveis:"
@echo "  make install - Instala dependências"
@echo "  make run     - Executa o backend"
@echo "  make test    - Executa os testes"
@echo "  make build   - Constrói Docker"
@echo "  make up      - Sobe os containers"
@echo "  make down    - Derruba os containers"
@echo "  make logs    - Mostra os logs"
@echo "  make clean   - Remove containers e volumes"
@echo "  make check   - Verifica o projeto"

install:
cd backend && poetry install --no-root

run:
cd backend && poetry run uvicorn main:app --host 0.0.0.0 --port 8000

test:
cd backend && poetry run pytest

build:
docker compose build

up:
docker compose up -d

down:
docker compose down

logs:
docker compose logs -f

clean:
docker compose down -v

check:
cd backend && poetry check
