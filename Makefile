POETRY = poetry
DOCKER = docker compose
BACKEND = backend

.PHONY: help install run test build up down logs clean check

help:
	@echo "Comandos disponíveis:"
	@echo "  make install - Instala dependências"
	@echo "  make run     - Executa o backend"
	@echo "  make test    - Executa testes"
	@echo "  make build   - Constrói imagens Docker"
	@echo "  make up      - Sobe containers"
	@echo "  make down    - Para containers"
	@echo "  make logs    - Mostra logs"
	@echo "  make clean   - Remove containers e volumes"
	@echo "  make check   - Verifica Poetry"

install:
	cd $(BACKEND) && $(POETRY) install --no-root

run:
	cd $(BACKEND) && $(POETRY) run uvicorn main:app --host 0.0.0.0 --port 8000

test:
	cd $(BACKEND) && $(POETRY) run pytest

build:
	$(DOCKER) build

up:
	$(DOCKER) up -d

down:
	$(DOCKER) down

logs:
	$(DOCKER) logs -f

clean:
	$(DOCKER) down -v

check:
	cd $(BACKEND) && $(POETRY) check