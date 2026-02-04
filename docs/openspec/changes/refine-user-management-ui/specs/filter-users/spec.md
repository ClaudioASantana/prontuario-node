# Capability: Filter Users

## ADDED Requirements

### Requirement: Search Users

The system SHALL allow the Admin to search/filter the user list by name or email.

#### Scenario: Admin filters by name

- **Given** I am on the User Management page
- **And** there are users "Alice" and "Bob"
- **When** I type "Ali" into the Search Filter
- **Then** only "Alice" should be displayed in the list
