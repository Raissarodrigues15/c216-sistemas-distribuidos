PYTHON = python
POETRY = poetry

.PHONY: help install test

help:
	@echo "Comandos disponíveis:"
	@echo "  make install  - Instala as dependências do projeto"
	@echo "  make test     - Executa os testes"

install:
	$(POETRY) install

test:
	$(POETRY) run pytest