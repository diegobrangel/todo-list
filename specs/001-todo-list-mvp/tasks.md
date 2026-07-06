---
description: "Task list for the Todo List MVP (retrofitted spec for an already-implemented baseline)"
---

# Tasks: Todo List MVP

**Input**: Design documents from `/specs/001-todo-list-mvp/` (spec.md, plan.md)

**Note**: Este é um retrofit — a maior parte do código já existia antes da adoção do Spec Kit. Tarefas já implementadas estão marcadas `[x]`; pendências reais ficam `[ ]`.

## Phase 1: Setup

- [x] T001 Estrutura de monorepo criada (`apps/backend`, `apps/frontend`)
- [x] T002 Backend inicializado com Express + cors (`apps/backend/package.json`)
- [x] T003 Frontend inicializado com Vite + React (`apps/frontend/package.json`)
- [ ] T004 [P] Configurar lint/format no backend (frontend já tem `eslint.config.js`; backend não tem)

## Phase 2: Foundational

- [x] T005 Criar model de Task em memória (`apps/backend/src/models/taskModel.js`)
- [x] T006 Configurar roteamento REST em `apps/backend/src/routes/taskRoutes.js`
- [x] T007 Middleware CORS habilitado em `apps/backend/src/server.js`

**Checkpoint**: Fundação pronta — CRUD de tarefas pode ser implementado.

## Phase 3: User Story 1 - Cadastrar tarefa (P1) 🎯 MVP

- [x] T008 [US1] Implementar `POST /tasks` em `apps/backend/src/controllers/taskController.js` (`createTask`)
- [x] T009 [US1] Formulário de cadastro no frontend (`apps/frontend/src/App.jsx`)
- [ ] T010 [US1] Validar campos obrigatórios (`title`) no `createTask` e retornar 400 quando ausente (edge case do spec.md)

## Phase 4: User Story 2 - Listar tarefas (P1)

- [x] T011 [US2] Implementar `GET /tasks` (`getTasks`)
- [x] T012 [US2] Renderizar lista de tarefas no frontend

## Phase 5: User Story 3 - Remover tarefa (P2)

- [x] T013 [US3] Implementar `DELETE /tasks/:id` (`deleteTask`) com resposta 404 para id inexistente
- [x] T014 [US3] Botão de remoção por tarefa no frontend
- [ ] T015 [US3] Tratar `id` não numérico em `DELETE /tasks/:id` (hoje vira `NaN` e cai no 404 "por acaso" — tornar explícito)

## Phase 6: User Story 4 - Definir lembrete (P3)

- [x] T016 [US4] Campo `reminder` no model e no `createTask`
- [x] T017 [US4] Input de lembrete no formulário do frontend
- [ ] T018 [US4] Validar/normalizar formato do lembrete (hoje é string livre, sem checagem de data)

## Phase 7: Polish & Cross-Cutting Concerns

- [x] T019 [P] Documentação publicada via MkDocs (`docs/`, `mkdocs.yml`)
- [x] T020 Retrofit da documentação para o formato Spec Kit (constitution, spec, plan, tasks) — esta mudança
- [ ] T021 [P] Adicionar testes automatizados (backend hoje não tem suíte real: `npm test` é placeholder)
- [ ] T022 Adicionar `tests/` (contract/integration) conforme convenção do Spec Kit, cobrindo T010/T015/T018

## Dependencies & Execution Order

- Setup (Fase 1) → Foundational (Fase 2) → User Stories (Fases 3–6, já entregues) → Polish (Fase 7, com pendências reais).
- T010, T015, T018 e T021/T022 são as únicas pendências abertas neste retrofit; podem ser feitas em paralelo por não tocarem os mesmos arquivos além de `taskController.js` (T010 e T015 tocam o mesmo arquivo — não paralelizar entre si).

## Notes

- Esta spec documenta o estado retroativo do MVP; novas features devem abrir `specs/00N-nome-da-feature/` via `/speckit-specify`.
