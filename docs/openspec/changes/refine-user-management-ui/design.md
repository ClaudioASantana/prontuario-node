# Design

## Layout Structure

```mermaid
graph TD
    A[Page Container] --> B[Page Header]
    B --> C[Title: "User Management"]
    B --> D[Actions Area]
    D --> E[Search Input]
    D --> F[Button: "New User"]
    A --> G[Table Container]
    G --> H[Smart Table (Grid)]
```

## Styling

- **Page Header**:
  - `display: flex`, `justify-content: space-between`, `align-items: center`
  - `margin-bottom: 2rem`
- **Search Input**:
  - Standard `form-input` style.
  - Placeholder: "Buscar usuários..."
- **Table**:
  - Remove `ngx-card` wrapper if "List in Grid" implies a more direct embedding.
  - OR keep `ngx-card` but ensure it uses full width and clean "grid" borders.
