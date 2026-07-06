# TODO LIST

Projeto desenvolvido utilizando Spec-Driven Development (SDD), com o [GitHub Spec Kit](https://github.com/github/spec-kit) como ferramenta de suporte ao fluxo.

## Objetivo

O sistema permite:

- Cadastro de tarefas
- Remoção de tarefas
- Listagem de tarefas
- Definição de lembretes

## Arquitetura

O projeto utiliza:

- MVC
- Monorepo
- React
- Node.js
- Express
- MkDocs

## Fluxo de Spec-Driven Development

A governança do projeto vive em [`constitution.md`](constitution.md) e cada funcionalidade é documentada em `specs/<###-feature-name>/` antes/junto da implementação:

- **Constituição**: princípios não-negociáveis do projeto (stack, arquitetura, persistência).
- **Spec**: o quê e por quê da funcionalidade, sem detalhes de implementação.
- **Plan**: como implementar — contexto técnico, estrutura de código, checagem contra a constituição.
- **Tasks**: checklist executável, organizado por user story.

Funcionalidade atual documentada: [Todo List MVP](specs/001-todo-list-mvp/spec.md) ([plano](specs/001-todo-list-mvp/plan.md), [tarefas](specs/001-todo-list-mvp/tasks.md)).

Novas funcionalidades devem seguir o fluxo `/speckit-specify` → `/speckit-plan` → `/speckit-tasks` → `/speckit-implement` (skills do Spec Kit para agentes de IA), abrindo uma nova pasta `specs/00N-nome-da-feature/`.

## Estrutura

```txt
apps/
 ├── backend/
 └── frontend/

specs/
 └── 001-todo-list-mvp/   # spec, plan e tasks da funcionalidade atual

.specify/                 # constituição, templates e scripts do Spec Kit

docs/                     # este site (MkDocs)
```
