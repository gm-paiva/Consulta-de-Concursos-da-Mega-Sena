# 🍀 Consulta de Concursos da Mega-Sena

> Aplicação web para consultar resultados da Mega-Sena, com frontend estático em HTML/CSS/JavaScript e backend em Node.js com Express conectado ao PostgreSQL, alimentado por dados reais da CAIXA.

---

## 📌 Sobre o Projeto

Esta aplicação permite consultar o último concurso da Mega-Sena ou buscar um concurso específico pelo número. Os dados são carregados no PostgreSQL a partir de um arquivo CSV com os resultados históricos, obtido diretamente na [página oficial da CAIXA](https://loterias.caixa.gov.br/Paginas/Mega-Sena.aspx). O frontend consome a API REST e exibe as dezenas sorteadas, data do sorteio, premiações por faixa e estimativa do próximo prêmio.

A atividade foi desenvolvida como parte das práticas acadêmicas da **FATEC Jacareí – Faculdade de Tecnologia de Jacareí**, no curso de **Desenvolvimento de Software Multiplataforma (DSM)**.

---

## 🚀 Tecnologias Utilizadas

- [Node.js](https://nodejs.org/) — Ambiente de execução JavaScript no servidor
- [Express v5](https://expressjs.com/) — Framework web para Node.js
- [PostgreSQL](https://www.postgresql.org/) — Banco de dados relacional
- [node-postgres (pg)](https://node-postgres.com/) — Cliente PostgreSQL para Node.js
- [dotenv](https://github.com/motdotla/dotenv) — Gerenciamento de variáveis de ambiente
- HTML5 + CSS3 + JavaScript (Fetch API) — Interface e comunicação com o backend

---

## 📁 Estrutura do Projeto

```
app/
├── public/
│   ├── assets/
│   │   ├── css/
│   │   │   └── main.css                    # Estilos da aplicação
│   │   └── js/
│   │       └── main.js                     # Lógica do frontend (Fetch API)
│   └── pages/
│       └── index.html                      # Página principal
├── src/
│   ├── database/
│   │   └── db.js                           # Configuração do Pool de conexão com o PostgreSQL
│   ├── infra/
│   │   ├── init/
│   │   │   ├── seed-data/
│   │   │   │   └── megasena.csv            # Dados históricos da Mega-Sena (CAIXA)
│   │   │   ├── schema-sql.sql              # Script de criação da tabela
│   │   │   └── seed-sql.sql               # Script de carga dos dados CSV
│   │   └── run-sql.js                      # Script de inicialização do banco
│   ├── repositories/
│   │   └── senas.repository.js             # Queries SQL (último concurso e por número)
│   ├── routes/
│   │   └── senas.routes.js                 # Rotas da API
│   └── server.js                           # Arquivo principal do servidor Express
├── .env                                    # Variáveis de ambiente
├── .gitignore
├── package.json
└── package-lock.json
```

---

## 🔀 Rotas da API

| Método | Rota               | Descrição                          |
|--------|--------------------|------------------------------------|
| GET    | `/`                | Página principal                   |
| GET    | `/assets/*`        | Arquivos estáticos                 |
| GET    | `/api`             | Retorna o último concurso          |
| GET    | `/api/:concurso`   | Retorna um concurso pelo número    |

---

## ✨ Funcionalidades

- Exibição automática do último concurso ao carregar a página
- Busca de concurso específico pelo número
- Exibição das 6 dezenas sorteadas como bolinhas
- Informações de premiação por faixa (6, 5 e 4 acertos) com número de ganhadores e rateio
- Indicação se o concurso acumulou ou teve ganhador
- Estimativa do próximo prêmio
- Formatação de datas e valores em moeda brasileira (BRL)

---

## 🗃️ Banco de Dados

A tabela é criada e populada automaticamente pelo script de inicialização a partir do CSV da CAIXA. Não é necessário criar a tabela manualmente — basta rodar o comando `npm run db:init`.

```sql
CREATE TABLE IF NOT EXISTS public.megasena (
  concurso                              INTEGER      NOT NULL PRIMARY KEY,
  data_do_sorteio                       DATE         NOT NULL,
  bola1, bola2, bola3, bola4, bola5, bola6  INTEGER NOT NULL,
  ganhadores_6_acertos                  INTEGER      NOT NULL,
  cidade_uf                             VARCHAR(510),
  rateio_6_acertos                      DECIMAL      NOT NULL,
  ganhadores_5_acertos                  INTEGER      NOT NULL,
  rateio_5_acertos                      DECIMAL      NOT NULL,
  ganhadores_4_acertos                  INTEGER      NOT NULL,
  rateio_4_acertos                      DECIMAL      NOT NULL,
  acumulado_6_acertos                   DECIMAL      NOT NULL,
  arrecadacao_total                     DECIMAL      NOT NULL,
  estimativa_premio                     DECIMAL      NOT NULL,
  acumulado_sorteio_especial_mega_da_virada DECIMAL  NOT NULL,
  observacao                            VARCHAR(255)
);
```

> Os dados são carregados do arquivo `src/infra/init/seed-data/megasena.csv`, obtido na [página oficial da CAIXA](https://loterias.caixa.gov.br/Paginas/Mega-Sena.aspx).

---

## 🔧 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
PORT=3005  # ou qualquer outra porta de sua preferência

POSTGRES_HOST=localhost
POSTGRES_USER=postgres
POSTGRES_PASSWORD=sua_senha
POSTGRES_DB=nome_do_banco
POSTGRES_PORT=5432

# Opcional: conexão via URL (ex: Render, Supabase)
# DATABASE_URL=postgresql://user:password@host/database?sslmode=require
```

> ⚠️ O arquivo `.env` já está no `.gitignore` e **não deve ser versionado**.

---

## ⚙️ Como Executar

### Pré-requisitos

- [Node.js](https://nodejs.org/) instalado (versão 14 ou superior)
- [PostgreSQL](https://www.postgresql.org/) instalado e rodando
- npm (incluído com o Node.js)

### Passo a passo

```bash
# 1. Clone o repositório
git clone https://github.com/gm-paiva/Consulta-de-Concursos-da-Mega-Sena.git

# 2. Acesse a pasta do projeto
cd app

# 3. Instale as dependências
npm install

# 4. Configure as variáveis de ambiente
# Crie o arquivo .env conforme a seção acima

# 5. Inicialize o banco de dados (cria a tabela e importa os dados do CSV)
npm run db:init

# 6a. Inicie o servidor (produção)
npm start

# 6b. Inicie o servidor (desenvolvimento com hot reload)
npm run dev
```

Acesse no navegador: [http://localhost:3005](http://localhost:3005)

---

## 📚 Contexto Acadêmico

| Campo          | Informação                                        |
|----------------|---------------------------------------------------|
| 🏫 Instituição | FATEC Jacareí                                     |
| 🎓 Curso       | Desenvolvimento de Software Multiplataforma – DSM |
| 📖 Disciplina  | Desenvolvimento Web I                            |
| 👨‍🏫 Professor(a) | [Arley Ferreira de Souza](https://github.com/arleysouza)                          |
| 📅 Semestre    | 1º Semestre - 2026 

---

## 👤 Autor

Desenvolvido por **[Guilherme Matos Paiva](https://github.com/gm-paiva)**.

---

## 📄 Licença

Este projeto está sob a licença MIT.
