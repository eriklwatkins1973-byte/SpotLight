# Security Policy

Spotlight takes security seriously across video delivery, AI processing, payments, and user data.

## Reporting a Vulnerability

If you discover a security issue, please report it privately.

- Preferred channel: repository security advisory / private report to maintainers
- Include: affected area, reproduction steps, impact, and suggested remediation (if available)

Please do not disclose vulnerabilities publicly until a fix is available.

## Scope

Security reports are especially valuable for issues involving:

- Authentication and authorization flows
- Supabase Row Level Security (RLS) policy bypasses
- Secrets exposure (`.env.local`, API keys, tokens)
- Stripe payment/session tampering
- Mux upload or playback authorization flaws
- Insecure handling of AI analysis metadata

## Secret Handling Requirements

- Never commit secrets to source control.
- Keep runtime secrets in `.env.local` (development) or secure environment configuration (deployment).
- Rotate keys immediately if accidental exposure is suspected.
- Use least-privilege service keys wherever possible.

## Supported Branch

Security fixes are applied to `main`.

## Coordinated Disclosure

We aim to acknowledge reports quickly and provide status updates during triage, remediation, and release.

When possible, include CVSS-style severity context to help prioritize fixes.