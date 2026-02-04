# Proposal: Implement Health Plan Module (Convênios)

## Goal

Create a dedicated `HealthPlanModule` (Convênios) to manage Health Insurance providers and plans. This module will allow the registration of health plans (e.g., Unimed, Bradesco Saúde) which will offer benefits to patients and potentially physicians.

## Context

As referenced in the system architecture modernization plan (`docs\text\Usuário_.txt`), the **Health Plan Service** (Serviço de Convênios) is a core component responsible for managing:

- Accrediting providers.
- Coverage of procedures.
- Pre-filled authorization.

Currently, the `Patient` entity only stores `insurancePlan` as a free-text string. This change aims to formalize Health Plans as a distinct entity, allowing for structured data management and future reference linkage.

## Capabilities

- **Manage Health Plans**: Create, Read, Update, Delete (CRUD) health plans.
- **Attributes**: Name, ANS Code (Registro ANS), Type (Individual, Familiar, Empresarial), Contact Info.

## Success Criteria

- Backend: REST API for Health Plans (`/health-plans`).
- Frontend: Management UI for listing and editing Health Plans.
- Database: New table `health_plans` with defined schema.
