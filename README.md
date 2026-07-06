# TODO LIST - SPEC-DRIVEN Development

Sistema de gerenciamento de tarefas desenvolvido utilizando Spec-Driven Development (SDD), com o [GitHub Spec Kit](https://github.com/github/spec-kit) como ferramenta de suporte ao fluxo.

## Spec-Driven Development

- **Constituição** (princípios do projeto): [`.specify/memory/constitution.md`](.specify/memory/constitution.md)
- **Specs por funcionalidade**: [`specs/001-todo-list-mvp/`](specs/001-todo-list-mvp/) (`spec.md`, `plan.md`, `data-model.md`, `contracts/`, `tasks.md`)
- **Templates e scripts do Spec Kit**: [`.specify/`](.specify/)

Fluxo para novas funcionalidades (via skills do Spec Kit no Claude Code):
`/speckit-specify` → `/speckit-clarify` (opcional) → `/speckit-plan` → `/speckit-checklist` (opcional) → `/speckit-tasks` → `/speckit-implement`

## Arquitetura

- MVC
- Monorepo

## Tecnologias

### Frontend
- React
- Vite

### Backend
- Node.js
- Express

### Documentação
- MkDocs

## Funcionalidades

- Cadastro de tarefas
- Remoção de tarefas
- Listagem de tarefas
- Lembretes

## Deploy

Frontend:
https://todo-list-hazel-iota.vercel.app

Backend:
https://todo-list-cvbk.onrender.com

Documentação:
https://diegobrangel.github.io/todo-list/

## Estrutura

```bash
apps/
 ├── backend/
 └── frontend/

specs/
 └── 001-todo-list-mvp/   # spec, plan e tasks da funcionalidade atual

.specify/                 # constituição, templates e scripts do Spec Kit

docs/
