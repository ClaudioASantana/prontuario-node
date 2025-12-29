# Frontend Redesign & Login Design

## Visual Concept

The following mockup was generated to guide the implementation of the Login Screen. It features a clean, white-and-blue aesthetic consistent with medical applications and the `ngx-admin` default theme.

![Login Mockup](/C:/Users/claud/.gemini/antigravity/brain/03249039-cd7e-403a-b411-5fbd5876543f/login_screen_mockup_1766962252075.png)

## Design Strategy (ngx-admin adoption)

We will adopt the **Cosmic** or **Default** (Light) theme structure from `ngx-admin`.

1.  **Variables**: Extract key color variables (`primary`, `success`, `info`, `warning`, `danger`) from `ngx-admin`.
2.  **Typography**: Use Open Sans/Roboto as defined in the reference.
3.  **Components**: We will not install the full Nebular library unless necessary to keep the bundle small, but we will mimic its CSS classes for cards, buttons, and inputs.

## Login Component Architecture

- **Route**: `/login` (Public guard)
- **Form**: Reactive Forms (`FormGroup` with email/password validators).
- **Service**: `AuthService` (methods: `login(credentials)`, `saveToken(token)`).
- **State**: Store user profile/roles in a `UserSubject` or Signals (if Angular > 16).
