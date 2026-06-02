"# Development Standards - Monti Project\n\n---\n\n## 🔧 Principles & Persona\n- **Project:** MontiMel (Honey & Natural Products E-commerce)\n- **Role:** Lead Full-Stack Engineer\n- **Goal:** Secure, scalable, maintainable platform with strict security and clean architecture.\n- **Tech Stack:** Next.js (App Router), TypeScript (Strict), Tailwind CSS, PostgreSQL (Supabase).\n\n---\n"
```

```tool
TOOL_NAME: single_find_and_replace
BEGIN_ARG: filepath
"docs/development_standards.md"

## 1. Project Identity & Persona
- **Project:** Monti / MontiMel (Honey & Natural Products E-commerce).
- **Role:** Lead Full-Stack Engineer.
- **Goal:** Deliver a secure, scalable, and maintainable platform with a focus on strict security and clean architecture.
- **Tech Stack:** Next.js (App Router), TypeScript (Strict), Tailwind CSS, PostgreSQL (Supabase).

## 2. Coding Standards
### TypeScript & Typing
- **Strict Mode:** Must be active.
- **No `any`:** The use of `any` is strictly forbidden. Use `unknown` or well-defined interfaces.
- **Typing:** Define precise interfaces for all database entities (Product, Order, User).

### Naming Conventions
- **Components:** `PascalCase` (e.g., `ProductCard.tsx`).
- **Functions & Variables:** `camelCase` (e.g., `getProducts()`).
- **Constants:** `UPPER_SNAKE_CASE` (e.g., `MAX_RETRY_ATTEMPTS`).
- **Files:** `kebab-case`.

### Architecture & Patterns
- **Component Strategy:**
  - `/components/ui`: Atomic, generic components (ShadcnUI base).
  - `/components/features`: Complex components linked to business logic.
- **Server-First:** Use Server Components by default. Use 'use client' only for necessary interactivity.
- **Logic Separation:** Keep business logic in `/services` or `/lib`, never directly in the UI components.
- **State Management:**
  - Server State: Direct Supabase calls in Server Components.
  - Global State: Zustand or Context API only if strictly necessary.
  - Local State: `useState` and `useReducer`.

## 3. UI/UX Standards
- **Design Language:** Organic and warm colors (yellows, ambers, creams, greens).
- **Responsiveness:** Mobile-first approach using Tailwind CSS utility classes.
- **Accessibility (a11y):** Semantic HTML and screen-reader compatibility.
- **Feedback:** Always implement loading states (skeletons) and error notifications via toasts.

## 4. Workflow & Git Flow
### Development Process
1. **Analyze:** Review requests for security risks or architectural conflicts.
2. **Propose:** Describe the logic/plan before writing large code blocks.
3. **Implement:** Write clean, modular, and typed code.
4. **Verify:** Cross-check implementation against `security_and_data.md`.

### Git Convention
Follow Conventional Commits:
- `feat:` New features.
- `fix:` Bug fixes.
- `docs:` Documentation updates.
- `refactor:` Code improvements without logic changes.
- `style:` Formatting, missing semi-colons, etc.

## 📌 Notas Originales
- **Nunca** exponer la clave `SUPABASE_SERVICE_ROLE_KEY` en el cliente.
- Usar `auth.getSession()` en Server Components y `useEffect` en Client Components para escuchar cambios de sesión.
```