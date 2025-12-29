# Implement Dashboard Layout (ngx-admin style)

## Goal

Implement a responsive application shell (Layout) and a Dashboard home page that mimics the structure and aesthetic of `ngx-admin`. This includes a fixed header, a collapsible sidebar, and a main content area.

## Context

The user has approved the login screen and requested a dashboard inspired by `ngx-admin`. The current application has no authenticated layout structure.

## Key Changes

- **Shell Layout**: Create a `MainLayoutComponent` that serves as the authenticated container.
- **Header**: Implement a top navigation bar with branding and user profile placeholder.
- **Sidebar**: Implement a vertical navigation menu.
- **Dashboard Page**: Create a home view with status cards/charts placeholders.
- **Routing**: Configure child routes for the authenticated section.

## Visual Reference

See `design.md` for the AI-generated Dashboard concept.
