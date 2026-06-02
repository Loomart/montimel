### 2. `security_and_data.md` (Segurança e Dados)
Este é o ficheiro mais crítico para evitar fugas de dados.

```markdown
# Security & Data Rules

## Database Access (Supabase)
- **RLS (Row Level Security)**: NUNCA criar tabelas sem RLS ativado.
- **Client vs Server**: 
  - No Cliente: Usar a `supabase-browser-client` com políticas de RLS rigorosas.
  - No Servidor: Usar `supabase-server-client` com a `service_role` key APENAS em funções administrativas protegidas.
- **Validation**: Validar todos os inputs de Server Actions utilizando a biblioteca `Zod`.

## Authentication
- Utilizar Supabase Auth.
- Proibir a passagem de tokens de autenticação via props de componentes; utilizar a sessão do servidor ou hooks de autenticação.

## Data Fetching
- Utilizar `async/await` em Server Components.
- Implementar Error Boundaries e Loading States (arquivo `loading.tsx` e `error.tsx`) para cada rota principal.