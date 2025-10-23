# 🏆 Sistema de Conquistas - Desafio Full Stack CDA

<div align="center">

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white)

**Plataforma moderna para gerenciamento de conquistas e emblemas de usuários**

</div>

---

## 📋 Sobre o Projeto

Sistema completo de gerenciamento de usuários e conquistas desenvolvido como desafio Full Stack para a CDA. A aplicação permite que usuários se cadastrem, façam login e colecionem emblemas aleatórios em diferentes categorias (Bronze, Prata e Ouro), visualizando suas conquistas em um dashboard interativo.

### ✨ Diferenciais Implementados

- ✅ **Autenticação JWT** com refresh token e proteção de rotas
- ✅ **Sistema de Categorias** para emblemas (Bronze, Prata, Ouro)
- ✅ **Documentação Swagger** completa e interativa
- ✅ **Validações robustas** com class-validator
- ✅ **Hash de senhas** com bcrypt
- ✅ **Validação de CPF** brasileiro
- ✅ **Perfil de usuário** com foto e informações editáveis
- ✅ **Sistema de Rankings** baseado em conquistas
- ✅ **Arquitetura modular** seguindo princípios SOLID

---

## 🚀 Funcionalidades

### 🔐 Autenticação e Autorização
- Registro de usuários com validação de dados
- Login com email e senha
- Autenticação JWT (JSON Web Token)
- Proteção de rotas com guards
- Perfil de administrador com permissões especiais

### 🏅 Sistema de Conquistas
- Resgate de emblemas aleatórios
- Categorias de emblemas: Bronze, Prata e Ouro
- Visualização de todas as conquistas do usuário
- Histórico de resgates com data e hora
- Sistema de pontuação e ranking

### 👤 Gerenciamento de Perfil
- Edição de informações pessoais
- Upload de foto de perfil
- Alteração de senha com confirmação
- Visualização de estatísticas pessoais

### 🔍 Recursos Adicionais
- Filtragem de emblemas por categoria
- Busca de conquistas
- Dashboard administrativo
- Listagem de todos os usuários (apenas admin)

---

## 🛠 Tecnologias

### Backend
- **[NestJS](https://nestjs.com/)** - Framework Node.js progressivo
- **[TypeScript](https://www.typescriptlang.org/)** - Superset JavaScript tipado
- **[Prisma ORM](https://www.prisma.io/)** - ORM moderno para Node.js
- **[PostgreSQL](https://www.postgresql.org/)** - Banco de dados relacional
- **[JWT](https://jwt.io/)** - Autenticação baseada em tokens
- **[Bcrypt](https://www.npmjs.com/package/bcrypt)** - Hash de senhas
- **[Class Validator](https://github.com/typestack/class-validator)** - Validação de DTOs
- **[Swagger](https://swagger.io/)** - Documentação de API

### Frontend
- **[React](https://reactjs.org/)** - Biblioteca para interfaces de usuário
- **[TypeScript](https://www.typescriptlang.org/)** - Tipagem estática
- **[Vite](https://vitejs.dev/)** - Build tool moderna
- **[React Router](https://reactrouter.com/)** - Roteamento
- **[Axios](https://axios-http.com/)** - Cliente HTTP

---

## ⚡ Início Rápido

### Com Docker (Recomendado)

```bash
git clone https://github.com/seu-usuario/-Desafio-FULLSTACK-cda.git
cd -Desafio-FULLSTACK-cda
docker-compose up -d
```

Acesse: http://localhost:3200/api

---

## 📦 Instalação

### Pré-requisitos

- Node.js 18.18+ ou 20+ instalado ([Download](https://nodejs.org/))
- PostgreSQL 15+ instalado e rodando
- Yarn ou NPM
- Git

### 1️⃣ Clone o Repositório

```bash
git clone https://github.com/seu-usuario/-Desafio-FULLSTACK-cda.git
cd -Desafio-FULLSTACK-cda
```

### 2️⃣ Configuração do Backend

```bash
# Instalar dependências
yarn install
# ou
npm install

# Configurar variáveis de ambiente
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:

```env
# Database
DATABASE_URL="postgresql://postgres:sua_senha@localhost:5432/cda_database?schema=public"

# JWT
JWT_SECRET="sua_chave_secreta_super_segura"

# Server
PORT=3200
```

### 3️⃣ Configurar Banco de Dados

**Importante:** Certifique-se que o PostgreSQL está rodando!

```bash
# Windows: Verificar se PostgreSQL está rodando
# Abra Services (services.msc) e procure por "postgresql"
# Ou via PowerShell:
Get-Service -Name postgresql*

# Criar o banco de dados (se não existir)
# Conecte ao PostgreSQL via psql ou pgAdmin e execute:
CREATE DATABASE cda_database;

# Executar migrations
npx prisma migrate dev

# Executar seed (popular banco com dados iniciais)
npx prisma db seed

# Visualizar banco de dados (opcional)
npx prisma studio
```

### 4️⃣ Iniciar Backend

```bash
# Modo desenvolvimento
yarn start:dev
# ou
npm run start:dev

# Modo produção
yarn build && yarn start:prod
# ou
npm run build && npm run start:prod
```

O servidor estará rodando em: `http://localhost:3200`

### 5️⃣ Configuração do Frontend

```bash
# Navegar para pasta frontend
cd frontend

# Instalar dependências
yarn install
# ou
npm install

# Iniciar aplicação
yarn dev
# ou
npm run dev
```

O frontend estará disponível em: `http://localhost:5173`

---

## 📚 Documentação da API

A documentação interativa da API está disponível via Swagger:

**URL:** `http://localhost:3200/api`

### Principais Endpoints

#### Autenticação

```http
POST /auth
Content-Type: application/json

{
  "email": "usuario@email.com",
  "password": "Senha@123"
}
```

```http
GET /auth
Authorization: Bearer {token}
```

#### Usuários

```http
POST /user
Content-Type: application/json

{
  "name": "João Silva",
  "nickname": "joao",
  "email": "joao@email.com",
  "password": "Senha@123",
  "confirmPassword": "Senha@123",
  "cpf": "12345678900",
  "isAdmin": false
}
```

```http
GET /user
Authorization: Bearer {token}
```

```http
PATCH /user/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "João Silva Santos",
  "profileImage": "https://exemplo.com/foto.jpg"
}
```

#### Conquistas

```http
POST /achievement/claim
Authorization: Bearer {token}
```

```http
GET /achievement/user/:userId
Authorization: Bearer {token}
```

---

## 📁 Estrutura do Projeto

```
-Desafio-FULLSTACK-cda/
├── src/                          # Código fonte do backend
│   ├── auth/                     # Módulo de autenticação
│   │   ├── dto/                  # Data Transfer Objects
│   │   ├── auth.controller.ts    # Controller de autenticação
│   │   ├── auth.service.ts       # Lógica de autenticação
│   │   ├── auth.module.ts        # Módulo de autenticação
│   │   ├── jwt.strategy.ts       # Estratégia JWT
│   │   └── logged-user.decorator.ts
│   ├── User/                     # Módulo de usuários
│   │   ├── dto/                  # DTOs de usuário
│   │   ├── entities/             # Entidades
│   │   ├── user.controller.ts    # Controller de usuários
│   │   ├── user.service.ts       # Lógica de usuários
│   │   └── user.module.ts        # Módulo de usuários
│   ├── achievement/              # Módulo de conquistas
│   │   ├── dto/                  # DTOs de conquistas
│   │   ├── entities/             # Entidades
│   │   ├── achievement.controller.ts
│   │   ├── achievement.service.ts
│   │   └── achievement.module.ts
│   ├── prisma/                   # Configuração Prisma
│   │   ├── seed/                 # Seeds do banco
│   │   ├── prisma.service.ts     # Serviço Prisma
│   │   └── prisma.module.ts      # Módulo Prisma
│   ├── app.module.ts             # Módulo principal
│   └── main.ts                   # Entrada da aplicação
├── prisma/                       # Schema e migrations
│   ├── migrations/               # Histórico de migrations
│   └── schema.prisma             # Schema do banco de dados
├── frontend/                     # Aplicação React
│   ├── src/
│   │   ├── components/           # Componentes React
│   │   ├── pages/                # Páginas
│   │   ├── services/             # Serviços e API
│   │   └── assets/               # Imagens e recursos
│   └── public/                   # Arquivos públicos
├── .env.example                  # Exemplo de variáveis de ambiente
├── package.json                  # Dependências do backend
└── README.md                     # Este arquivo
```

---

## 🎯 Casos de Uso

### Usuário Comum
1. Registrar uma nova conta
2. Fazer login no sistema
3. Visualizar emblemas disponíveis
4. Resgatar emblemas aleatórios
5. Ver histórico de conquistas
6. Editar perfil e foto
7. Alterar senha

### Administrador
1. Todas as funcionalidades de usuário comum
2. Visualizar lista de todos os usuários
3. Gerenciar emblemas do sistema
4. Visualizar estatísticas gerais

---

## 🧪 Testes

```bash
# Testes unitários
yarn test
# ou
npm run test

# Testes e2e
yarn test:e2e
# ou
npm run test:e2e

# Cobertura de testes
yarn test:cov
# ou
npm run test:cov
```

---

## 🔒 Segurança

- ✅ Senhas hasheadas com bcrypt (10 rounds)
- ✅ Validação de força de senha (maiúsculas, minúsculas, números/especiais)
- ✅ Proteção contra SQL Injection (Prisma ORM)
- ✅ Validação de CPF brasileiro
- ✅ CORS configurado
- ✅ JWT com expiração de 24h
- ✅ Validação de dados com class-validator
- ✅ Guards para proteção de rotas

---

## 📝 Variáveis de Ambiente

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `DATABASE_URL` | URL de conexão PostgreSQL | `postgresql://user:pass@localhost:5432/db` |
| `JWT_SECRET` | Chave secreta JWT | `minha_chave_super_secreta_123` |
| `PORT` | Porta do servidor | `3200` |

---

## 🤝 Contribuindo

Contribuições são bem-vindas! 

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

### Padrões de Código
- Use TypeScript
- Siga os princípios SOLID
- Adicione validações nos DTOs
- Documente endpoints com Swagger
- Escreva testes para novas funcionalidades

---

## 📄 Licença

Este projeto foi desenvolvido como parte de um desafio técnico para a CDA.

---

## 👨‍💻 Autor

Desenvolvido com ❤️ para o desafio Full Stack da CDA

---

## 📞 Suporte

- Documentação da API: `http://localhost:3200/api`
- Issues: [GitHub Issues](https://github.com/seu-usuario/-Desafio-FULLSTACK-cda/issues)

---

<div align="center">

**⭐ Se este projeto foi útil, considere dar uma estrela!**

</div>

