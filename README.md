## Api de Favoritos - Luiza Labs

Api usada para criar, retornar e excluir lista de produtos favoritos do cliente.

### Como Rodar?

Se você esta rodando direto no seu pc, siga as instruções. A Api precisa de uma versão do Node a partir do 12.14.1 para rodar.
```
    git checkout 
    cd luiza-labs-test
    npm install
    cp .env.example .env
    npm install
    npm run
```

#### Docker

Caso tenha o Docker instalado em seu computador, apenas executar o `docker-compose up -d --build`

### Documentação

Acessando `http://<host-da-aplicação>:<porta>/documentation` você poderá acessar o swagger e ver todas as rotas da aplicação, podendo fazer testes.