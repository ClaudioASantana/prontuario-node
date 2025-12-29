# Internationalization Design

## Architecture

We will use **`@ngx-translate`** because it supports:

1.  **Runtime switching**: Users can change language without reloading the page.
2.  **Lazy loading**: Translation files are loaded via HTTP only when needed.
3.  **Simplicity**: JSON-based translation files.

### Translation Files (`src/assets/i18n/*.json`)

- `en.json`: English strings.
- `pt-br.json`: Portuguese strings.

**Structure**:

```json
{
  "LOGIN": {
    "TITLE": "Welcome Back",
    "EMAIL": "Email Address",
    "BUTTON": "Log In"
  },
  "MENU": {
    "DASHBOARD": "Dashboard",
    "PATIENTS": "Patients"
  }
}
```

### Components

1.  **LanguageSelector**: A dropdown in the Header.
    - Options: "🇧🇷 PT-BR", "🇺🇸 EN"
2.  **Auth/Dashboard**: Update all hardcoded text to use the `translate` pipe (e.g., `{{ 'LOGIN.TITLE' | translate }}`).

### State Management

- **Default**: Check `localStorage` > Browser Language > Default to 'pt-br'.
- **Storage key**: `app_language`
