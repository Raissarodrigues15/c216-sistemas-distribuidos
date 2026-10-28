POETRY = poetry
DOCKER = docker compose
BACKEND = backend
FRONTEND = frontend

.PHONY: help install run test build up down logs clean check frontend-install frontend-dev frontend-lint frontend-format frontend-check frontend-test frontend-test-e2e frontend-build check-all

help:
	echo "Backend: install run test build up down logs clean check"
	echo "Frontend: frontend-install frontend-dev frontend-lint frontend-format frontend-check frontend-test frontend-test-e2e frontend-build"
	echo "Tudo: check-all"

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

frontend-install:
	cd $(FRONTEND) && npm ci

frontend-dev:
	cd $(FRONTEND) && npm run dev

frontend-lint:
	cd $(FRONTEND) && npm run lint

frontend-format:
	cd $(FRONTEND) && npm run format

frontend-check:
	cd $(FRONTEND) && npm run lint && npm run format:check

frontend-test:
	cd $(FRONTEND) && npm test

frontend-test-e2e:
	cd $(FRONTEND) && npm run test:e2e

frontend-build:
	cd $(FRONTEND) && npm run build


check-all:
	$(MAKE) check
	cd $(BACKEND) && $(POETRY) run ruff check .
	cd $(BACKEND) && $(POETRY) run pytest
	$(MAKE) frontend-check
	$(MAKE) frontend-test
	$(MAKE) frontend-build
	$(MAKE) frontend-test-e2e

