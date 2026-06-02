### 3. `development_standards.md` (Padrões de Desenvolvimento)
Este ficheiro garante que o código é limpo e consistente.

```markdown
# Development Standards

## TypeScript & Coding Style
- **Strict Mode**: O modo strict do TS deve estar sempre ativo.
- **Typing**: Proibido o uso de `any`. Utilizar `unknown` ou interfaces bem definidas.
- **Naming**: 
  - Componentes: `PascalCase` (ex: `ProductCard.tsx`).
  - Funções/Variáveis: `camelCase` (ex: `getProducts()`).
  - Constantes: `UPPER_SNAKE_CASE` (ex: `MAX_RETRY_ATTEMPTS`).

## UI/UX Standards
- **Accessibility (a11y)**: Todos os componentes devem ser semanticamente corretos e compatíveis com leitores de ecrã.
- **Responsiveness**: Mobile-first. Utilizar as classes utilitárias do Tailwind CSS.
- **Consistency**: Utilizar a paleta de cores e espaçamentos definidos no `tailwind.config.js`.

## Git Flow
- **Commits**: Seguir o padrão de Conventional Commits:
  - `feat:` para novas funcionalidades.
  - `fix:` para correção de bugs.
  - `docs:` para documentação.
  - `refactor:` para melhorias de código sem alterar a lógica.