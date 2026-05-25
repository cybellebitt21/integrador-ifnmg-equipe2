✔ Generated Prisma Client (v7.8.0) to ./generated/prisma in 76ms

Start by importing your Prisma Client (See: https://pris.ly/d/importing-client)

# Dependências de Desenvolvimento:
- **express**: Framework base para criar o servidor HTTP do backend e gerenciar as rotas da API.
- **prisma**: Interface de linha de comando (CLI) do Prisma usada para gerenciar schemas e migrations (instalada como dependência de desenvolvimento).
- **@prisma/adapter-libsql** e **@libsql/client**: Driver e adaptador necessários para conectar o Prisma 7 ao banco de dados SQLite/LibSQL.
- **tsx**: TSX (TypeScript Execute), ferramenta que serve para rodar e testar arquivos TypeScript (`.ts`) diretamente no terminal, sem a necessidade de compilá-los manualmente para JavaScript primeiro.
# Guia de Inicialização do Ambiente de Desenvolvimento

Se você acabou de clonar este repositório, siga os passos abaixo dentro da pasta `backend` para configurar e rodar o projeto na sua máquina local.

## 1. Instalar as Dependências do Projeto
Como o arquivo `package.json` já possui todas as bibliotecas registradas, você só precisa instalar os pacotes rodando:

```bash
npm install
```

⚠️ **Nota sobre a versão do node.js**: O Prisma 7 exige o Node.js >= 22.0.0. Caso você veja um aviso de `EBADENGINE` no terminal informando que sua versão atual é inferior (ex: v20), atualize o Node.js da sua máquina para a versão LTS mais recente para evitar incompatibilidades no banco de dados.

## 2. Criar as Variáveis de Ambiente (.env)
Arquivos `.env` contêm configurações locais e ficam fora do repositório por segurança. Para configurar a string de conexão com o banco local SQLite, execute o comando abaixo:

**Linux / MacOS**
```bash
echo 'DATABASE_URL="file:./dev.db"' > .env
```

**Windows (CMD)**
```DOS
echo DATABASE_URL="file:./dev.db">.env
```

## 3. Configurar o Banco de Dados Local (SQLite)
Para criar o arquivo de banco de dados local na sua máquina e aplicar todas as tabelas estruturadas (migrations) que já foram desenvolvidas, execute:

```bash
npx prisma migrate dev
```

**Nota**: Este comando vai ler a pasta prisma/migrations e recriar o banco perfeitamente.

## 4. Gerar o Prisma Client
Para garantir que o ORM reconheça os modelos de dados e forneça o autocompletar (IntelliSense) no código, gere o cliente do Prisma rodando:

```bash
npx prisma generate
```

## 5. Popular o Banco de Dados (Seed)
Para não testar com o banco vazio, execute o script de seed para injetar os dados fictícios de sensores (umidade, temperatura, etc.) para testes locais:

```bash
npx prisma db seed
```

## 6. Visualizar o Banco de Dados no Navegador (Prisma Studio)
O Prisma possui uma interface gráfica para você navegar pelas tabelas e ver os dados inseridos pelo Seed sem precisar de softwares externos. Para abrir o painel no seu navegador, execute:

```bash
npx prisma studio
```

💡 Nota: O terminal vai abrir automaticamente uma aba no seu navegador padrão. A porta pode variar dependendo da sua máquina (geralmente http://localhost:5555 ou uma porta alta aleatória como 51212).

## 7. (Opcional) Rodar o Servidor em Modo de Desenvolvimento 
Esse passo pode ser ignorado por enquanto, pois ainda não conectei o Prisma ao backend e nem configurei as rotas. Ele servirá para quando começarmos a codar a API:

```bash
npm run dev
```
