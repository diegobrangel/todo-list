# Contract: Tasks API

Base path: `/tasks` (backend Express, ver `apps/backend/src/routes/taskRoutes.js`)

## GET /tasks

Lista todas as tarefas cadastradas.

- **Response 200**: `Task[]` — array de `{ id, title, description, reminder }`

## POST /tasks

Cadastra uma nova tarefa.

- **Request body**: `{ title: string, description?: string, reminder?: string }`
- **Response 201**: `Task` criada, com `id` gerado no servidor
- **Response 400** *(desejado, ver FR-006)*: quando `title` estiver ausente/vazio — **não implementado hoje**

## DELETE /tasks/:id

Remove uma tarefa pelo id.

- **Response 200**: `{ message: "Task removida" }`
- **Response 404**: `{ message: "Task não encontrada" }` — id inexistente
- **Response 400** *(desejado, ver FR-007)*: quando `:id` não for numérico — **hoje cai em 404 via `NaN`, não implementado explicitamente**
