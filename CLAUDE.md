# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Dev
yarn develop              # Gatsby dev server on :8000
yarn server:dev           # Express API server on :3000 (ts-node-dev, auto-restart)

# Build
yarn build                # Gatsby production build → public/
yarn build:server         # Compile server.ts → dist/server.js

# Unit tests (Jest)
yarn test                 # Run all
yarn test -- --testPathPattern=contact  # Run single test file

# E2E tests (Playwright) — auto-starts both Gatsby + Express servers
yarn test:e2e             # All specs, 3 desktop + 2 mobile browsers
yarn test:e2e:ui          # Interactive UI mode
yarn test:e2e:basic       # Only tests/basic.spec.ts
yarn test:e2e:api         # Only API tests

# Other
yarn clean                # Clear Gatsby cache
yarn analyze              # Build with bundle analyzer
```

## Architecture

**Two-process app**: Gatsby static site (frontend) + Express server (backend API).

### Frontend (Gatsby 5 + React 18)
- **Styling**: Emotion CSS-in-JS (`@emotion/react`, `@emotion/styled`). Design tokens in `src/utils/styles.js` (colors, darkColors, fonts, breakpoints).
- **Dark mode**: `gatsby-plugin-dark-mode` — toggles `.dark` class on `<body>`.
- **Project showcase**: MDX files in `github/` directory (one folder per project with `.mdx` + `images/`). Queried via GraphQL in `src/hooks/use-github.ts`.
- **Contact form**: `src/components/contact.js` — Formik + Yup validation, CSRF token fetch, reCAPTCHA v3 token.
- **reCAPTCHA v3**: Wrapped in `gatsby-browser.js` and `gatsby-ssr.js` via `GoogleReCaptchaProvider`. Disabled in dev by default; enable with `GATSBY_ENABLE_RECAPTCHA_DEV=true`.
- **CSP**: Configured in `gatsby-config.js` via `gatsby-plugin-csp`.
- **Shared styled components**: `src/components/shared/` (FormElements, Loader, RepoGithub, Skills).

### Backend (`server.ts`)
- Express server with CSRF protection (csurf + cookie-parser) and CORS.
- `GET /csrf-token` — returns CSRF token.
- `POST /contact` — validates reCAPTCHA, sanitizes input (validator), sends email via nodemailer.
- Gatsby proxies `/contact` and `/csrf-token` to `:3000` in dev (configured in `gatsby-config.js` proxy).
- In dev, reCAPTCHA verification always returns true.

### Deployment
- GitHub Actions (`.github/workflows/deploy.yml`): push to `main` → build Gatsby + server → rsync to VPS → PM2 restart.
- PM2 config: `ecosystem.config.js` (app name: `handleForm`).
- `.env.production` lives on server, never synced.

## Environment Variables

See `env.example`. Key vars:
- `GATSBY_GA4_MEASUREMENT_ID` — Google Analytics 4
- `GATSBY_RECAPTCHA_SITE_KEY` / `RECAPTCHA_SECRET_KEY` — reCAPTCHA v3
- `MAIL_HOST`, `MAIL_PORT`, `MAIL_USER`, `MAIL_PASSWORD`, `MAIL_CONTACT` — SMTP
- `SITE_URL`, `PORT` — production server config

## Testing

- **Jest**: Unit tests in `src/__tests__/` and `src/components/__tests__/`. Uses `jest-axe` for accessibility. Gatsby mocked in `__mocks__/gatsby.js`.
- **Playwright**: E2E tests in `tests/`. Runs against 5 browser configs (Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari). Auto-starts both dev servers via `webServer` config.
