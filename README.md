# C216 - Sistemas Distribuídos



\## Testes



Os testes do backend estão organizados em duas categorias:



\- Testes unitários: verificam as funções do serviço de itens de forma isolada.

\- Testes de integração: verificam os endpoints da API utilizando o TestClient do FastAPI.



Os testes abrangem as operações de criação, consulta, atualização, alteração parcial e exclusão de itens, além do uso de parâmetros de caminho e de consulta.



Para executar os testes:



```bash

cd backend

poetry run pytest -v

