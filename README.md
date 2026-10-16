# C216 - Sistemas Distribuídos

## Descrição

Projeto desenvolvido para a disciplina de C216 - Sistemas Distribuídos.

O backend da aplicação utiliza **Python**, **FastAPI** e **Poetry** para gerenciamento de dependências.

## Estrutura do projeto

```text
c216-sistemas-distribuidos/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   └── routes/
│   │   ├── schemas/
│   │   ├── services/
│   │   └── main.py
│   ├── tests/
│   │   ├── integration/
│   │   │   └── test_items_api.py
│   │   └── unit/
│   │       └── test_item_service.py
│   ├── main.py
│   ├── pyproject.toml
│   └── poetry.lock
├── .github/
│   └── workflows/
│       └── ci-backend.yml
└── Makefile
```

## Testes automatizados

Os testes do backend utilizam **Pytest** e estão organizados em duas categorias:

- **Testes unitários:** verificam as funções do serviço de itens de forma isolada.
- **Testes de integração:** verificam os endpoints da API utilizando o `TestClient` do FastAPI.

Os testes abrangem as operações de criação, consulta, atualização, alteração parcial e exclusão de itens, além do uso de parâmetros de caminho e de consulta.

### Como executar os testes

Na raiz do projeto, execute:

```bash
make test
```

Também é possível executar os testes diretamente pelo Poetry:

```bash
cd backend
poetry install
poetry run pytest -v
```

O Pytest apresenta no terminal os testes executados e seus resultados.

## Integração contínua

O projeto utiliza **GitHub Actions** para executar a integração contínua do backend.

O workflow está localizado em:

```text
.github/workflows/ci-backend.yml
```

Durante a execução, o workflow:

1. realiza o checkout do repositório;
2. configura o Python 3.13;
3. instala o Poetry;
4. instala as dependências do backend;
5. executa os testes automatizados com o Pytest.

O workflow é executado nos eventos configurados de `push` e `pull_request`.

