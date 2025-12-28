# Design: Core Domain Architecture

## Entities Mapping

Based on `cin-saude-old`, existing entities will be mapped as follows:

### Patient (Paciente)

- **Fields**:
  - `id`: UUID (Migration from Int)
  - `name`: string
  - `birthDate`: Date
  - `cpf`: string (Unique)
  - `email`: string
  - `gender`: string (Enum?)
  - `address`: Embedded/Relation (Street, Number, City, State)
  - `healthInfo`: JSON or separate fields (Smoker, Alcohol, ActivityLevel)

### Doctor (Medico)

- **Fields**:
  - `id`: UUID
  - `name`: string
  - `crm`: string (Medical License)
  - `specialty`: string (or Relation)
  - `contact`: Phone, Email

### Medical Record (Prontuario)

- **Fields**:
  - `id`: UUID
  - `description`: Text
  - `isPrivate`: boolean
  - `consultationId`: UUID (Relation)

### Health Plan (Convênio)

- **Fields**:
  - `id`: UUID
  - `name`: string
  - `code`: string
  - `coverageRules`: JSON

## Architecture: Modular Monolith

We will adopt a structure that mimics consumers/providers to facilitate future decoupling.

```mermaid
graph TD
    API[API Gateway / Controllers]

    subgraph "Context: Access & Identity"
        Auth[Auth Module]
    end

    subgraph "Context: Participants"
        Pat[Patient Module]
        Doc[Physician Module]
    end

    subgraph "Context: Core Business"
        Rec[Medical Record Module]
        Plan[Health Plan Module]
    end

    API --> Auth
    API --> Pat
    API --> Doc
    API --> Rec

    Rec -.-> Pat : verifies(patientId)
    Rec -.-> Doc : verifies(authorId)
    Rec -.-> Plan : verifies(coverage)
```

### Communication Principles

- **Inter-Module**: Use defined Service Interfaces (Facade pattern) or internal Events (NestJS EventEmitter).
- **Data Isolation**: Each module owns its Repository/Tables; no cross-module SQL joins.

## Validation

- Replicate logic from `cin-saude-old` DataAnnotations (e.g. `[Required]`, `[StringLength]`).
