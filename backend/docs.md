✔ Generated Prisma Client (v7.8.0) to ./generated/prisma in 76ms

Start by importing your Prisma Client (See: https://pris.ly/d/importing-client)

# Dependências de desenvolvimento:
1. npm install express
   - Instala o Express, framework base para criar o servidor HTTP do backend e gerenciar as rotas da API.
2. npm install prisma --save-dev
   - Instala a interface de linha de comando (CLI) do Prisma como dependência de desenvolvimento para gerenciar schemas e migrations.
3. npm install @prisma/adapter-libsql @libsql/client
   - Instala o driver e o adaptador necessários para conectar o Prisma 7 ao banco de dados SQLite/LibSQL.
4. npm install -D tsx
   - Instala o TSX (TypeScript Execute) em ambiente de desenvolvimento para rodar e testar arquivos TypeScript (.ts) diretamente, sem precisar compilá-los manualmente.

# Guia de Inicialização do Ambiente de Desenvolvimento

Se você acabou de clonar este repositório, siga os passos abaixo dentro da pasta `backend` para configurar e rodar o projeto na sua máquina local.

### 1. Instalar as Dependências do Projeto
Como o arquivo `package.json` já possui todas as bibliotecas registradas, você só precisa instalar os pacotes rodando:

```bash
npm install
```

### 2. Configurar o Banco de Dados Local (SQLite)
Para criar o arquivo de banco de dados local na sua máquina e aplicar todas as tabelas estruturadas (migrations) que já foram desenvolvidas, execute:

```bash
npx prisma migrate dev
```

**Nota**: Este comando vai ler a pasta prisma/migrations e recriar o banco perfeitamente.

### 3. Gerar o Prisma Client
Para garantir que o ORM reconheça os modelos de dados e forneça o autocompletar (IntelliSense) no código, gere o cliente do Prisma rodando:

```bash
npx prisma generate
```

### 4. Popular o Banco de Dados (Seed)
Para não testar com o banco vazio, execute o script de seed para injetar os dados fictícios de sensores (umidade, temperatura, etc.) para testes locais:

```bash
npx prisma db seed
```

### 5. (Opcional) Rodar o Servidor em Modo de Desenvolvimento 
Esse passo pode ser ignorado por enquanto, pois ainda não conectei o Prisma ao backend e nem configurei as rotas. Ele servirá para quando começarmos a codar a API:

```bash
npm run dev
```
