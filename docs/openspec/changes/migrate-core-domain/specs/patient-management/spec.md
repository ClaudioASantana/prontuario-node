# Patient Management Specifications

## ADDED Requirements

#### Scenario: Registering a new Patient

- **Given** I act as an administrative user
- **When** I submit a new patient form with valid details (Name, CPF, DOB)
- **Then** the patient is persisted in the database
- **And** a UUID is assigned

#### Scenario: Validating Patient CPF

- **Given** I submit a patient with an existing CPF
- **Then** the system returns a conflict error

#### Scenario: Retrieving Patient Health Info

- **Given** an existing patient with health flags (Smoker, Alcohol, ActivityLevel)
- **When** I retrieve the patient profile
- **Then** the health information is included in the response

#### Scenario: Linking Address

- **Given** a patient creation request
- **When** address details are provided
- **Then** the address is stored and linked to the patient
