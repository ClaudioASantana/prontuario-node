# Design: Health Plan Module

## Backend Design (NestJS)

### Architecture

Following the existing Modular Monolith architecture, we will create a new separate module `src/modules/health-plans.module.ts`.

### Entity: `HealthPlan`

```typescript
class HealthPlan {
  id: string; // UUID
  name: string; // e.g. "Unimed Belo Horizonte"
  code: string; // ANS Register Code, e.g. "34256-1"
  commercialName: string; // "Unimed Nacional"
  type: "Individual" | "Company" | "Family";
  active: boolean; // default true
  createdAt: Date;
  updatedAt: Date;
}
```

### Components

- **Controller**: `HealthPlansController` (`/api/v1/health-plans`)
- **Service/Handlers**: CQRS Pattern (`CreateHealthPlanHandler`, `GetHealthPlansHandler`, etc.)
- **Repository**: `TypeOrmHealthPlanRepository`

## Frontend Design (Angular)

### Module: `HealthPlansModule`

- **Route**: `/health-plans`
- **Component**: `HealthPlansComponent` (List View)
- **Component**: `HealthPlanFormComponent` (Create/Edit View)

### UX

- **List**: Table showing Name, Code, Type, Status.
- **Form**: Fields for Name, Code, Type (Dropdown), Active (Toggle).

## Database

- Table `health_plans` (PostgreSQL)

## Integration

- In this phase, we are establishing the module.
- **Future Link**: The `Patient` entity will eventually reference `HealthPlan.id` instead of the free-text `insurancePlan` string, but that migration is out of scope for this specific proposal to keep changes small (`guardrail: Keep changes tightly scoped`).
