# Feature Specification: Todo List MVP

**Feature Branch**: `001-todo-list-mvp`

**Created**: 2026-07-06

**Status**: Implemented (retrofitted spec for existing baseline application)

**Input**: User description: "Sistema de gerenciamento de tarefas: cadastro, listagem, remoção e lembretes de tarefas."

## Clarifications

### Session 2026-07-06

- Q: Título vazio/ausente no cadastro deve ser rejeitado pela API? → A: Sim, deve retornar 400 (comportamento desejado; hoje não implementado — ver FR-006 e task T010).
- Q: Um `id` não numérico em `DELETE /tasks/:id` deve gerar erro explícito? → A: Sim, 400 antes de tentar buscar (hoje cai em 404 "por acaso" via `NaN`; ver task T015).
- Q: O campo `reminder` deve validar formato de data? → A: Não na v1 — aceitar texto livre é intencional para não acoplar a UI a um formato específico ainda; revisitar se uma feature de notificação real for especificada.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Cadastrar tarefa (Priority: P1)

Como usuário, quero cadastrar uma nova tarefa com título, descrição e lembrete opcional, para não esquecer o que preciso fazer.

**Why this priority**: Sem cadastro não há dados para listar ou remover; é a funcionalidade fundacional do sistema.

**Independent Test**: Enviar `POST /tasks` com título, descrição e lembrete e confirmar que a tarefa retorna com um `id` gerado e status `201`.

**Acceptance Scenarios**:

1. **Given** a lista de tarefas vazia, **When** o usuário cadastra uma tarefa com título "Estudar SDD", **Then** a tarefa aparece na listagem com um identificador único.
2. **Given** um cadastro sem título, **When** o usuário tenta salvar, **Then** o sistema deve rejeitar ou tratar o caso de dado ausente (ver Edge Cases).

---

### User Story 2 - Listar tarefas (Priority: P1)

Como usuário, quero ver todas as tarefas cadastradas, para acompanhar o que já foi registrado.

**Why this priority**: É o retorno de valor imediato do cadastro — sem listagem o cadastro é invisível para o usuário.

**Independent Test**: Chamar `GET /tasks` e confirmar que todas as tarefas cadastradas anteriormente são retornadas em formato JSON.

**Acceptance Scenarios**:

1. **Given** três tarefas cadastradas, **When** o usuário acessa a listagem, **Then** as três tarefas aparecem com título, descrição e lembrete.

---

### User Story 3 - Remover tarefa (Priority: P2)

Como usuário, quero remover uma tarefa concluída ou desnecessária, para manter minha lista organizada.

**Why this priority**: Depende da existência de tarefas cadastradas (US1), mas é essencial para o ciclo de vida completo da tarefa.

**Independent Test**: Cadastrar uma tarefa, chamar `DELETE /tasks/:id` com o id retornado e confirmar que ela some da listagem.

**Acceptance Scenarios**:

1. **Given** uma tarefa cadastrada, **When** o usuário remove pelo id, **Then** a tarefa não aparece mais em `GET /tasks`.
2. **Given** um id inexistente, **When** o usuário tenta remover, **Then** o sistema retorna erro 404 com mensagem "Task não encontrada".

---

### User Story 4 - Definir lembrete (Priority: P3)

Como usuário, quero associar um lembrete (data/hora ou texto) a uma tarefa, para ser avisado sobre prazos.

**Why this priority**: Agrega valor sobre o CRUD básico, mas o sistema é utilizável sem lembretes.

**Independent Test**: Cadastrar uma tarefa informando o campo `reminder` e confirmar que ele é persistido e retornado na listagem.

**Acceptance Scenarios**:

1. **Given** uma tarefa nova, **When** o usuário informa um lembrete, **Then** o lembrete é salvo junto com a tarefa e retornado em `GET /tasks`.

---

### Edge Cases

- O que acontece quando o título não é informado no cadastro? (atualmente o backend aceita `undefined` sem validação — comportamento a revisitar)
- Como o sistema trata um id inválido (não numérico) em `DELETE /tasks/:id`? (atualmente `Number(id)` gera `NaN`, resultando em 404)
- O que acontece com as tarefas quando o servidor reinicia? (dados são perdidos — persistência é em memória, por decisão de arquitetura)

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O sistema DEVE permitir cadastrar tarefas com título, descrição e lembrete (RF01).
- **FR-002**: O sistema DEVE listar todas as tarefas cadastradas (RF02).
- **FR-003**: O sistema DEVE permitir remover uma tarefa pelo seu identificador (RF03).
- **FR-004**: O sistema DEVE permitir associar um lembrete a uma tarefa (RF04).
- **FR-005**: O sistema DEVE retornar erro 404 ao tentar remover uma tarefa com id inexistente.
- **FR-006**: O sistema DEVE rejeitar (400) o cadastro de tarefa sem `title` (ver Clarifications; ainda não implementado — task T010).
- **FR-007**: O sistema DEVE rejeitar (400) um `id` não numérico em `DELETE /tasks/:id` (ver Clarifications; ainda não implementado — task T015).

### Contratos REST

| Método | Rota          | Body                                    | Status sucesso | Status erro                  |
|--------|---------------|------------------------------------------|-----------------|-------------------------------|
| GET    | /tasks        | —                                        | 200             | —                             |
| POST   | /tasks        | `{ title, description, reminder? }`      | 201             | *(sem validação hoje — T010)* |
| DELETE | /tasks/:id    | —                                        | 200             | 404 `{ message }`             |

### Key Entities

- **Task**: representa uma tarefa do usuário. Atributos: `id` (número, gerado via timestamp), `title` (string), `description` (string), `reminder` (string/data, opcional).

## Fora de Escopo

- Autenticação ou identificação de usuários (a lista é global, sem `owner`).
- Edição de tarefa existente (`PUT`/`PATCH`) — apenas criar, listar e remover.
- Marcar tarefa como concluída sem removê-la.
- Notificação/disparo real do lembrete (o campo é apenas armazenado, não há agendamento).
- Persistência durável (arquivo ou banco de dados) — ver princípio "Persistência em Memória" na constituição.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Um usuário consegue cadastrar, listar e remover uma tarefa em menos de 1 minuto usando a interface web.
- **SC-002**: A API responde a `GET /tasks` e `POST /tasks` em menos de 200ms sob uso local/individual (sem carga concorrente relevante, dado o escopo do projeto).
- **SC-003**: 100% das tarefas cadastradas via frontend aparecem corretamente na listagem sem perda de dados durante a sessão do servidor.

## Assumptions

- Escopo acadêmico/demonstrativo: não há autenticação de usuários nem multi-tenancy.
- Persistência em memória é aceitável — dados não sobrevivem a um restart do backend (RNF03 da constituição).
- Não há edição de tarefa (update) nem marcação de "concluída" no escopo atual; apenas criar, listar e remover.
- Lembrete é armazenado como valor livre (string), sem validação de formato de data.
