# Development Standards

## 1. Coding Style
- **TypeScript**: Strict mode enabled. Avoid `any` at all costs.
- **Components**: Functional components using arrow functions.
- **Naming**: 
  - Components: PascalCase (`ProductCard.tsx`)
  - Functions/Variables: camelCase (`calculateTotal.ts`)
  - Constants: UPPER_SNAKE_CASE (`API_URL`)

## 2. Performance Guidelines
- **Images**: Use `next/image` for automatic optimization.
- **Data Fetching**: Prioritize Server Components for initial load; use Client Components only for interactivity.
- **Caching**: Implement strategic revalidation using `revalidatePath` and `revalidateTag`.

## 3. Git Workflow
- **Branching**: `main` (production), `develop` (staging), `feature/feature-name`.
- **Commits**: Conventional Commits (`feat:`, `fix:`, `docs:`, `refactor:`, `style:`).