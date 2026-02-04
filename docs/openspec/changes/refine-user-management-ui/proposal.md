# Proposal: Refine User Management UI

## Problem

The current "User Management" page has a card-based layout that limits screen real estate and separates actions (like "New User") from the main page context. The user requested a design similar to "Buscar Eventos" (likely a reference to a standard Data Grid with top-level controls).

## Solution

1. **Move "New User" Action**: Relocate the "New User" button from the card header to the main Page Title area.
2. **Implement Search**: Add a "Search Users" bar to filter the list.
3. **Refine Layout**: Switch from a constrained Card view to a full-width "List in Grid" (Data Table) layout, removing the outer card wrapper if needed to match the requested "Grid" style.

## Risks

- **Design Consistency**: Straying too far from `ngx-admin` patterns might create inconsistency if not handled carefully (though `ngx-admin` supports both Card and pure Table views).
- **Backend Search**: Currently the backend `GET /users` might not support filtering. We may need to add query params or filter client-side (Client-side is safer for now if list is small).

## Design

- **Header**: Flex container with Title (Left) and Actions (Search + Add Button) (Right).
- **Body**: Clean table grid, potentially removing the heavy `ngx-card` shadow/border in favor of a flatter list design or just full-width card.
