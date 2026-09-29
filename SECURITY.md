# Security Policy

## Reporting a vulnerability

Please **do not** open a public issue for security vulnerabilities.

Report privately using GitHub's vulnerability reporting:

1. Open the **Security** tab of this repository.
2. Click **Report a vulnerability** and describe the issue.

Alternatively, contact the maintainers through GitHub
([@IndianjobsTech](https://github.com/IndianjobsTech)) and ask for a private
channel before sharing details.

Include, when possible:

- The affected route or component
- Steps to reproduce
- Impact (e.g. session handling, data exposure, content injection)
- Any suggested fix

## Scope

This repository is the static dashboard front-end. It contains no database
credentials and no server-side secrets — only `NEXT_PUBLIC_*` configuration,
which is public by design.

Dashboard issues in scope:

- Cross-site scripting or content injection in rendered pages
- Session / stub-auth handling weaknesses
- Leaks of any non-public configuration

Out of scope for this repository:

- The PortaD API and migration engine (report those to the API maintainers)
- Denial of service against the hosted demo
- Issues requiring physical access to a user's machine

## Response

Maintainers aim to acknowledge reports within 7 days, keep reporters updated
on triage, and credit reporters who wish to be named when a fix ships.
