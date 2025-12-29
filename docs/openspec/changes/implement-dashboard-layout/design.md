# Dashboard Layout Design

## Visual Concept

The following mockup illustrates the target design for the Dashboard. It features a blue sidebar, white header, and a card-based content area.

![Dashboard Mockup](/C:/Users/claud/.gemini/antigravity/brain/03249039-cd7e-403a-b411-5fbd5876543f/dashboard_mockup_1766964152231.png)

## Component Architecture

We will implement a simplified version of `ngx-admin`'s `OneColumnLayout` using standard HTML/SCSS and Flexbox/Grid, avoiding the heavy `nb-layout` dependency for now to keep the project lightweight.

### MainLayoutComponent (`/layout`)

- **Template**:
  ```html
  <div class="layout-container">
    <app-sidebar></app-sidebar>
    <div class="main-content">
      <app-header></app-header>
      <div class="content-body">
        <router-outlet></router-outlet>
      </div>
    </div>
  </div>
  ```
- **Styling**: Flex row for Sidebar + Main. Main is Flex column for Header + Body.

### Child Components

1.  **SidebarComponent**: Vertical list of links (Dashboard, Patients, Appointments).
2.  **HeaderComponent**: Title "Prontuário" and User Avatar.
3.  **DashboardComponent**: Grid of stats cards and a basic chart placeholder.

## Styling

- Reuse `variables.scss` for colors (`$primary-500`, `$background-basic`).
- Use CSS Grid for the dashboard widget layout.
