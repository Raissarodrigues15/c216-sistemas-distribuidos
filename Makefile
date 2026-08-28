PYTHON = python
POETRY = poetry
BACKEND_DIR = backend

.PHONY: help install test

help:
	@echo "Comandos disponíveis:"
	@echo "  make install  - Instala as dependências do projeto"
	@echo "  make test     - Executa os testes"

install:
	cd $(BACKEND_DIR) && $(POETRY) install

test:
	cd $(BACKEND_DIR) && $(POETRY) run pytest