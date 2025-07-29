🛍️ Catálogo de Produtos - Admin E-commerce

    Sistema completo para gestão de catálogo de produtos, incluindo um painel administrativo em Angular e uma API RESTful em .NET para persistência de dados.

📋 Índice

    Visão Geral

    Funcionalidades

    Tecnologias

    Estrutura do Projeto

    Instalação e Execução

    Endpoints da API

    Arquitetura

    Decisões Técnicas

    Autor

🎯 Visão Geral

Este projeto consiste em dois microsserviços desenvolvidos para atender a um desafio técnico de criação de um CRUD (Create, Read, Update, Delete) de produtos para um e-commerce. A solução é composta por um frontend moderno em Angular e uma API robusta em .NET, utilizando PostgreSQL como banco de dados e Dapper para acesso aos dados, conforme os requisitos.
✨ Destaques

    🖥️ Frontend Reativo com Angular e componentes Standalone.

    ⚙️ API RESTful em .NET seguindo as melhores práticas.

    🗃️ Persistência de Dados em PostgreSQL, com queries explícitas via Dapper.

    📄 Documentação de API interativa com Swagger.

    🎨 Interface Moderna e responsiva com Angular Material.

    🗂️ Organização de Código clara, separando responsabilidades.

🚀 Funcionalidades

    [x] Listagem de Produtos: Visualização completa dos produtos cadastrados com paginação, ordenação e filtros.

    [x] Criação de Produtos: Formulário para adicionar novos produtos ao catálogo.

    [x] Edição de Produtos: Formulário para alterar os dados de um produto existente.

    [x] Exclusão de Produtos: Exclusão lógica (soft delete) para manter a integridade dos dados.

    [x] API Completa: Endpoints para gerenciar produtos e listar departamentos.

    [x] Visualização de Departamentos: Consumo da lista de departamentos da API para uso no formulário.

    [x] Notificações: Feedback visual para o usuário em todas as operações (sucesso, erro, aviso).

🛠 Tecnologias
Stack Principal

    Frontend: Angular 16+

    Backend: .NET 6+

    Banco de Dados: PostgreSQL 14+

Bibliotecas e Ferramentas

    Angular Material: Componentes de UI para o frontend.

    RxJS: Programação reativa para lidar com eventos e chamadas HTTP.

    Dapper: Micro-ORM para execução de queries SQL no backend.

    Swagger (Swashbuckle): Documentação e teste de endpoints da API.

    Docker: Containerização do banco de dados para facilitar o desenvolvimento.

📁 Estrutura do Projeto

O projeto é dividido em dois diretórios principais: ProductCatalog.Api (backend) e ProductCatalog.Web (frontend).
ProductCatalog.Api (Backend .NET)

🔧 Instalação e Execução

Siga estes passos para configurar e executar o ambiente de desenvolvimento completo.
Pré-requisitos

    Node.js (v18+)

    .NET SDK (v6.0+)

    Docker e Docker Compose

Passo 1: Clone o Repositório

git clone <https://github.com/LucasRafa13/AdminCommerce>

cd AdminCommerce

Passo 2: Iniciar o Banco de Dados (PostgreSQL)

    docker-compose up -d

    Execute o script de inicialização (init.sql):

    Espere alguns segundos para o banco de dados iniciar completamente e, em seguida, rode o comando abaixo na raiz do projeto para criar as tabelas e inserir os dados iniciais.

    cat ./ProductCatalog.Api/Scripts/init.sql | docker exec -i productcatalog-db psql -U postgres -d product_catalog

Passo 3: Iniciar a API (.NET)

    Navegue até o diretório da API:

    cd ProductCatalog.Api

    Execute a API:

    dotnet run

    Verifique se a API está funcionando:

        Acesse a documentação do Swagger em: http://localhost:5190/swagger/index.html

        Teste o endpoint GET /api/Product para ver se ele retorna uma lista vazia [].

Passo 4: Iniciar o Frontend (Angular)

    Abra um novo terminal e navegue até o diretório do frontend:

    cd ProductCatalog.Web

    Instale as dependências:

    npm install

    Execute a aplicação Angular:

    ng serve

    Acesse a aplicação:

        Abra seu navegador em: http://localhost:4200/products

📡 Endpoints da API

A documentação completa e interativa está disponível via Swagger.

    GET /api/Product: Retorna a lista de todos os produtos.

    GET /api/Product/{id}: Retorna um produto específico pelo seu ID.

    POST /api/Product: Cria um novo produto.

    PUT /api/Product/{id}: Atualiza um produto existente.

    DELETE /api/Product/{id}: Realiza a exclusão lógica de um produto.

    GET /api/Department: Retorna a lista de todos os departamentos.

🏗 Arquitetura

A solução foi projetada com uma arquitetura de microsserviços desacoplada, onde o frontend (cliente) é completamente independente do backend (servidor).

    Frontend (Angular): Utiliza uma arquitetura baseada em componentes standalone e lazy-loading de features, garantindo uma aplicação modular e performática. A comunicação com a API é encapsulada em serviços injetáveis.

    Backend (.NET): Segue uma arquitetura em camadas (Controller -> Service -> Repository) para separar as responsabilidades. O uso do Dapper garante controle total sobre as queries SQL, atendendo aos requisitos do desafio.

💡 Decisões Técnicas

    Angular Standalone Components: Escolhido para reduzir o boilerplate de NgModules e seguir a direção moderna do framework, facilitando a manutenção.

    Dapper em vez de Entity Framework: Atende ao requisito de usar queries explícitas, oferecendo alta performance e controle granular sobre o acesso ao banco de dados.

    Exclusão Lógica (soft delete): Garante que os registros de produtos não sejam perdidos, o que é crucial para a integridade de dados em um sistema de e-commerce (ex: histórico de pedidos).

    Docker para o Banco de Dados: Simplifica drasticamente a configuração do ambiente de desenvolvimento, garantindo que qualquer desenvolvedor possa rodar o projeto com apenas um comando.

👨‍💻 Autor

Lucas Lima

    📧 Email: lucasrafael123araujolima@gmail.com

    🐙 GitHub: @LucasRafa13

    Este projeto foi desenvolvido como parte de um desafio técnico para demonstrar habilidades em desenvolvimento full-stack com Angular e .NET.
