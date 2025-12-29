# Implement Frontend Redesign and Login

## Goal

Redesign the existing Angular frontend to match the aesthetic of `ngx-admin` (Nebular theme) and implement a fully functional Login screen integrated with the backend authentication APIs.

## Context

The current frontend lacks a cohesive design system and a working login screen. The user has provided `ngx-admin` as a reference workspace to adopt its "Premium Admin" look and feel. The user also requested a "designer" (AI-generated) concept for the login screen.

## Key Changes

- **Styling Architecture**: Port relevant SCSS/CSS variables and global styles from `ngx-admin/@theme` to the frontend project.
- **Login Feature**: Create a modern Login Page based on the generated design mockup.
- **Integration**: Connect the Login form to the backend `/auth/login` endpoint using JWT.

## Visual Reference

See `design.md` for the AI-generated Login Screen concept.
