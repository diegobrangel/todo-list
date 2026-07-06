# Implementation Plan: Todo List MVP

**Branch**: `001-todo-list-mvp` | **Date**: 2026-07-06 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-todo-list-mvp/spec.md`

## Summary

Sistema de gerenciamento de tarefas com cadastro, listagem, remoção e lembretes. Backend REST em Node.js/Express com persistência em memória; frontend em React/Vite consumindo a API via axios. Documentação técnica publicada via MkDocs.

## Technical Context

**Language/Version**: JavaScript (Node.js, CommonJS no backend; ES modules no frontend via Vite)

**Primary Dependencies**: Express 5, cors (backend); React 19, axios, Vite (frontend)

**Storage**: Array em memória (`apps/backend/src/models/taskModel.js`) — sem banco de dados (RNF03)

**Testing**: Não há suíte automatizada configurada (`npm test` é placeholder no backend); validação manual via `quickstart.md`

**Target Platform**: Backend hospedado no Render, frontend hospedado na Vercel

**Project Type**: Web application (frontend + backend monorepo)

**Performance Goals**: Uso individual/local — sem metas de carga concorrente definidas

**Constraints**: Dados não persistem entre reinícios do backend (limitação aceita por decisão de arquitetura)

**Scale/Scope**: MVP de escopo acadêmico, poucos usuários simultâneos

## Constitution Check

*Ver `.specify/memory/constitution.md`.*

- ✅ Monorepo First — `apps/backend` + `apps/frontend`.
- ✅ MVC no Backend — `models/`, `controllers/`, `routes/` presentes e usados corretamente.
- ✅ Persistência em Memória — `taskModel.js` é um array em memória, sem banco de dados.
- ✅ Simplicidade (YAGNI) — nenhuma dependência além do necessário para CRUD + CORS.
- ⚠️ Documentação Viva — antes desta mudança, a documentação (`docs/`) não seguia o formato Spec Kit; corrigido por esta feature retroativa.

Nenhuma violação exige justificativa em Complexity Tracking.

## Project Structure

### Documentation (this feature)

```text
specs/001-todo-list-mvp/
├── plan.md              # este arquivo
├── spec.md              # especificação funcional
├── data-model.md         # entidade Task e ciclo de vida
├── contracts/
│   └── tasks-api.md      # contrato REST detalhado (GET/POST/DELETE /tasks)
└── tasks.md              # checklist de tarefas (retroativo, já concluídas)
```

### Source Code (repository root)

```text
apps/
├── backend/
│   └── src/
│       ├── models/taskModel.js        # array em memória
│       ├── controllers/taskController.js
│       ├── routes/taskRoutes.js
│       └── server.js
└── frontend/
    └── src/
        ├── App.jsx                    # UI de cadastro/listagem/remoção
        ├── main.jsx
        └── App.css / index.css
```

**Structure Decision**: Monorepo com dois apps (`apps/backend`, `apps/frontend`), conforme RNF02 e princípio "Monorepo First". Backend segue MVC (RNF01). Não há pasta `tests/` — ausência registrada como lacuna a resolver em tasks.md (T0xx de polish), não como violação bloqueante.

## Complexity Tracking

Nenhuma violação da constituição a justificar.
