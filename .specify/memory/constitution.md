# TODO List Constitution

## Core Principles

### I. Monorepo First
Backend e frontend vivem no mesmo repositório, sob `apps/backend` e `apps/frontend`. Isso facilita organização, versionamento conjunto e onboarding — não há repositórios separados para as duas camadas.

### II. MVC no Backend
O backend segue o padrão MVC (`models/`, `controllers/`, `routes/`) para separar persistência, regra de negócio e roteamento HTTP. Controllers permanecem finos; regras de negócio adicionais devem viver em services dedicados, não em rotas ou models.

### III. Persistência em Memória (NON-NEGOTIABLE)
O sistema usa uma estrutura em memória (array) como armazenamento, sem banco de dados. Isso atende ao escopo do projeto (trabalho acadêmico / MVP) e mantém a stack simples. Qualquer mudança para persistência durável (arquivo, banco de dados) exige emenda a esta constituição, pois afeta deploy, testes e o modelo de dados.

### IV. Simplicidade (YAGNI)
Nenhuma dependência, camada de abstração ou infraestrutura deve ser adicionada sem uma necessidade concreta e documentada em uma spec. Preferir a solução mais simples que atenda aos requisitos funcionais atuais (RF01–RF04).

### V. Documentação Viva
Toda funcionalidade nova ou alterada deve ser refletida em `specs/<###-feature>/spec.md` (Spec-Driven Development) e na documentação pública em MkDocs (`docs/`). Código sem spec correspondente é considerado dívida técnica.

## Additional Constraints

- **Stack obrigatória**: Node.js + Express no backend; React + Vite no frontend. Trocar a stack exige emenda a esta constituição.
- **Contrato de API**: rotas de tarefas expostas sob `/tasks` (ou prefixo equivalente), respondendo JSON. Mudanças de contrato devem ser descritas em `contracts/` na spec da feature.
- **CORS**: o backend deve permitir requisições do frontend (dev e produção) via middleware `cors`.
- **Sem URL hardcoded**: o frontend nunca deve ter a URL da API fixa no código-fonte. A URL vem de `VITE_API_BASE_URL` (`.env.development`/`.env.production`), permitindo apontar o mesmo build para ambientes diferentes sem recompilar lógica.

## Development Workflow

- Novas funcionalidades seguem o fluxo do Spec Kit: `/speckit-specify` → (`/speckit-clarify` opcional) → `/speckit-plan` → (`/speckit-checklist` opcional) → `/speckit-tasks` → `/speckit-implement`.
- Cada feature vive em `specs/<###-feature-name>/` com `spec.md`, `plan.md` e `tasks.md`.
- Pull requests devem referenciar a spec da feature correspondente.
- Testes automatizados são desejáveis mas não são exigidos como gate único neste projeto (ver `RNF` na spec 001) — quando ausentes, a validação manual do fluxo (cadastrar, listar, remover tarefa) deve ser descrita no `plan.md`/`quickstart.md`.

## Governance

Esta constituição prevalece sobre convenções informais do time. Emendas exigem:
1. Registro do motivo da mudança (issue ou seção "Sync Impact" no topo do arquivo ao editar).
2. Atualização de specs/plans afetados.
3. Revisão de pelo menos um mantenedor antes do merge.

Toda spec e plano de implementação devem verificar conformidade com os princípios acima antes de avançar de fase (ver seção "Constitution Check" em `plan.md`).

**Version**: 1.1.0 | **Ratified**: 2026-07-06 | **Last Amended**: 2026-07-06
