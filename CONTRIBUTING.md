# Contributing to Spotlight

Thank you for your interest in contributing to Spotlight. This project is built to be maintainable, secure, and handoff-ready for growing teams.

## Technical Philosophy

- Performance first: optimize rendering paths and avoid unnecessary client-side re-renders, especially in upload and playback experiences.
- Type safety: use strict TypeScript patterns and avoid `any`; define explicit types for AI metadata, Mux payloads, and API contracts.
- Privacy and security: all database interactions must align with Supabase Row Level Security (RLS) and least-privilege principles.

## Development Workflow

- Branching: create feature branches from `main` (example: `feat/ai-metadata-refinement`).
- Environment: configure `.env.local` with required service keys before running local workflows.
- Validation: run checks before opening a PR.

```bash
npm run lint
npm run build
```

## AI and Video Standards

- Twelve Labs: when modifying the AI pipeline, target Marengo 2.6 or newer-compatible workflows.
- Mux uploads: preserve direct-upload architecture and server-side upload initialization in API routes.
- Playback: use HLS-compatible player patterns suitable for cross-device streaming.

## Commit Message Convention

Use Conventional Commits:

- `feat:` new functionality for filmmakers, scouts, or platform workflows
- `fix:` bug fixes in uploader, search, playback, or backend routes
- `docs:` documentation updates
- `refactor:` internal improvements without behavior changes
- `chore:` maintenance tasks, tooling, or dependency updates

## Pull Request Checklist

- Include a concise summary of user-facing and technical changes.
- Reference affected routes/files and any schema or env updates.
- Confirm lint and build pass locally.
- Note any follow-up work or known limitations.

## Handoff and Acquisition Readiness

This repository is structured for scalability and operational handoff. Keep documentation current when architecture, schema, or integrations change.

If acquisition-specific artifacts exist in your branch (for example valuation or roadmap documents), update them alongside meaningful technical changes.