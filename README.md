# Teste Desafio Full Stack (Dashboard) - CDA

## Introdução
Este é um projeto de teste desenvolvido para o processo seletivo na CDA, onde você terá a oportunidade de demonstrar suas habilidades no desenvolvimento full stack. O desafio consiste em criar um sistema que permite aos usuários resgatar emblemas aleatórios e visualizar os emblemas já resgatados em um dashboard.

## Funcionalidades

### Autenticação de Usuário
- O sistema oferece autenticação básica por meio de email e senha.

### Dashboard do Usuário
- Após o login, os usuários são redirecionados para um dashboard onde podem visualizar todos os emblemas que já resgataram.

### Resgate de Emblemas
- No dashboard, há um botão para resgatar um emblema aleatório.

### Armazenamento de Emblemas
- Os emblemas resgatados são salvos no banco de dados e associados ao usuário.

## Requisitos

### Backend
- Implementado em Node.js e NestJS.

### Frontend
- Desenvolvido em ReactJS.

### Banco de Dados
- Preferencialmente MySQL, mas pode ser outro banco de dados.

## Extra (Opcional)

### Edição de Perfil
- Os usuários podem editar seu perfil, adicionando informações como nome e foto de perfil.

### Categorias de Emblemas
- Implementar diferentes categorias de emblemas, como bronze, prata e ouro.

### Documentação da API
- Documentar os endpoints da API, utilizando, por exemplo, Swagger.

### Filtragem e Pesquisa
- Permitir que os usuários filtrem e pesquisem emblemas em seu dashboard.

## Critérios de Avaliação

### Funcionalidade
- O sistema atende aos requisitos especificados, incluindo autenticação, resgate de emblemas e listagem de emblemas já resgatados.

### Código
- O código está bem organizado e segue as melhores práticas.

### Criatividade
- Implementações adicionais ou melhorias serão valorizadas.

## Como Copiar e Executar o Projeto

1. Clone este repositório para sua máquina local.
2. Abra a pasta `backend` e execute `npm install` para instalar as dependências.
3. Configuração do banco de dados:
   - Configure o banco de dados de acordo com as configurações no arquivo `.env`.
   - Execute as migrações do banco de dados usando o comando `npm run migrate`.
4. Inicie o servidor backend usando o comando `npm start`.
5. Abra a pasta `frontend` e execute `npm install` para instalar as dependências.
6. Inicie o servidor frontend usando o comando `npm start`.
7. Acesse a aplicação no navegador usando o endereço `http://localhost:3000`.

