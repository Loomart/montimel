## Project Identity
- Project: Monti / Monti App
- Tech Stack: Next.js, TypeScript, Tailwind CSS, PostgreSQL.

## Coding Standards
- Use Functional Components and Hooks.
- Strict TypeScript: No `any` type allowed.
- Naming: PascalCase for components, camelCase for functions/variables.
- State Management: Prefer Server Components and Zod for validation.

## Architecture
- Components: /components/ui (atoms) and /components/features (complex).
- Logic: Keep business logic in /lib or /services, not in the UI.

## Response Guidelines
- Be concise and technical.
- Always provide the full path of the file when suggesting a new file.
- If a change is complex, describe the plan before writing the code.