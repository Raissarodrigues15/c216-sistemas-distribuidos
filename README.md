# C216 - Sistemas Distribuídos

## Descrição

Projeto desenvolvido para a disciplina de C216 - Sistemas Distribuídos.

O backend da aplicação foi desenvolvido utilizando **Python** e **FastAPI**, com gerenciamento de dependências realizado pelo **Poetry**.

## Estrutura do projeto

```text
c216-sistemas-distribuidos/
├── backend/
│   ├── main.py
│   ├── pyproject.toml
│   ├── poetry.lock
│   └── tests/
│       └── test_main.py
├── .github/
│   └── workflows/
│       └── ci-backend.yml
└── Makefile
```

## Testes automatizados

Os testes automatizados do backend utilizam o **Pytest** e estão localizados no diretório:

```text
backend/tests/
```

O arquivo de testes é:

```text
backend/tests/test_main.py
```

Os testes verificam o comportamento da API, incluindo respostas esperadas para as rotas disponíveis e o comportamento da aplicação para uma rota inexistente.

A implementação dos testes utiliza recursos do Pytest, como:

* `assert` para verificar os resultados esperados;
* **fixture** para disponibilizar o cliente de testes;
* **parametrização** para executar um mesmo teste com diferentes entradas;
* teste de **caso de erro**, verificando o retorno `404` para uma rota inexistente.

## Como executar os testes

### 1. Instalar as dependências

Na raiz do projeto, execute:

```bash
make install
```

Esse comando instala as dependências do projeto utilizando o Poetry.

Também é possível instalar as dependências diretamente pelo backend:

```bash
cd backend
poetry install
```

### 2. Executar os testes

A partir da raiz do projeto, execute:

```bash
make test
```

O comando utiliza o Poetry para executar o Pytest dentro do ambiente do backend.

Também é possível executar os testes diretamente pelo Poetry:

```bash
cd backend
poetry run pytest
```

Após a execução, o Pytest apresenta no terminal a quantidade de testes executados e o resultado de cada teste.

## Integração contínua

O projeto utiliza **GitHub Actions** para realizar a integração contínua do backend.

O workflow está localizado em:

```text
.github/workflows/ci-backend.yml
```

A execução do workflow ocorre nos eventos:

* `push`;
* `pull_request`.

Durante a execução, o workflow:

1. realiza o checkout do repositório;
2. configura o Python 3.13;
3. instala o Poetry;
4. instala as dependências do backend utilizando o Poetry;
5. executa os testes automatizados com o Pytest.

Dessa forma, os testes são executados automaticamente quando alterações são enviadas ao repositório ou quando um Pull Request é aberto ou atualizado.
