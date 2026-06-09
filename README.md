TaskFlow - Gerenciador de Tarefas Full Stack

Aplicação Full Stack para gerenciamento de tarefas desenvolvida com ASP.NET Core, Entity Framework Core, SQLite, React e Tailwind CSS.

O objetivo do projeto é permitir o gerenciamento completo de tarefas por meio de uma API REST integrada a uma interface web moderna, aplicando boas práticas de desenvolvimento, arquitetura em camadas e consumo de APIs.

Tecnologias Utilizadas
Backend
C#
.NET 10
ASP.NET Core Web API
Entity Framework Core
SQLite
Swagger / OpenAPI
Injeção de Dependência
Frontend
React
TypeScript
Tailwind CSS
Axios
Funcionalidades
Backend
Criar tarefas
Listar todas as tarefas
Buscar tarefa por ID
Atualizar tarefas
Remover tarefas
Persistência de dados com SQLite
Documentação automática com Swagger
Frontend
Visualização de tarefas
Cadastro de novas tarefas
Atualização de status
Edição de tarefas
Exclusão de tarefas
Interface responsiva
Estrutura do Projeto
taskflow-fullstack/
│
├── backend/
│   ├── Controllers/
│   ├── Services/
│   ├── DataBase/
│   ├── Models/
│   ├── Migrations/
│   └── Program.cs
│
└── frontend/
    ├── src/
    ├── components/
    ├── pages/
    ├── services/
    └── assets/
Arquitetura

O backend segue uma arquitetura em camadas para separação de responsabilidades:

Controller
    ↓
Service
    ↓
Entity Framework Core
    ↓
SQLite

A comunicação entre as camadas é realizada através de Injeção de Dependência, promovendo baixo acoplamento e maior facilidade de manutenção e testes.

Endpoints
Método	Endpoint	Descrição
GET	/api/tarefa	Lista todas as tarefas
GET	/api/tarefa/{id}	Busca uma tarefa por ID
POST	/api/tarefa	Cria uma nova tarefa
PUT	/api/tarefa/{id}	Atualiza uma tarefa
DELETE	/api/tarefa/{id}	Remove uma tarefa
Banco de Dados

O projeto utiliza SQLite para persistência dos dados através do Entity Framework Core.

Exemplo de entidade:

public class Tarefa
{
    public int Id { get; set; }
    public string Titulo { get; set; } = string.Empty;
    public string? Descricao { get; set; }
    public StatusTarefa Status { get; set; }
}
