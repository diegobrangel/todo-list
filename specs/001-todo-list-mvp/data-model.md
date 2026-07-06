# Data Model: Todo List MVP

## Task

Representa uma tarefa cadastrada pelo usuário. Armazenada em memória (array), sem banco de dados.

| Campo         | Tipo              | Obrigatório | Observações                                              |
|---------------|-------------------|-------------|-----------------------------------------------------------|
| `id`          | number            | sim         | Gerado no servidor via `Date.now()` no momento da criação  |
| `title`       | string            | sim*        | *Hoje sem validação server-side (ver FR-006 / task T010)   |
| `description` | string            | não         | Texto livre                                                |
| `reminder`    | string            | não         | Texto/data livre, sem validação de formato (ver Clarifications em spec.md) |

Não há relacionamento entre entidades — `Task` é a única entidade do domínio. Não há campo `done`/`completed` (fora de escopo, ver spec.md).

## Ciclo de vida

```text
criada (POST /tasks) --> listada (GET /tasks) --> removida (DELETE /tasks/:id)
```

Não há transição de edição/atualização — apenas criação, leitura e remoção (CRD, sem U).
