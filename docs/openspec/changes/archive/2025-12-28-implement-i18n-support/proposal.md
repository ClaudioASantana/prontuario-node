# Implement Internationalization (i18n)

## Goal

Add multi-language support (Portuguese-Brazil and English) to the Angular frontend, allowing users to switch languages at runtime.

## Context

The user requested a language switching feature similar to their previous Vue project. The current application is hardcoded in English.

## Key Changes

- **Dependency**: Install `@ngx-translate/core` and `@ngx-translate/http-loader`.
- **Configuration**: Setup `TranslateModule` in `app.config.ts` to load JSON translations from `/assets/i18n/`.
- **Assets**: Create `en.json` and `pt-br.json`.
- **UI**: Create a `LanguageSelectorComponent` (dropdown/flags) and add it to the `HeaderComponent`.
- **Persistence**: Save selected language in `localStorage`.

## Visual Reference

N/A (Functional change mostly, UI is a simple dropdown).
