# Security & Data Rules

## Database Access (Supabase)
- **RLS (Row Level Security)**: NUNCA criar tabelas sem RLS ativado. Todas as tabelas devem ter políticas de segurança definidas.
- **Client vs Server**: 
  - No Cliente (Browser): Usar a `supabase-browser-client` com políticas de RLS rigorosas. Nunca expor a `service_role` key no cliente.
  - No Servidor (Server Components/Actions): Usar `supabase-server-client` com a `service_role` key APENAS em funções administrativas protegidas ou quando necessário para bypass de RLS (com cuidado).
- **Validation**: Validar todos os inputs de Server Actions utilizando a biblioteca `Zod`. Nunca confiar nos dados vindos do cliente.

## Authentication
- Utilizar Supabase Auth para gestão de sessões.
- Proibir a passagem de tokens de autenticação (`access_token`) via props de componentes ou URL params; utilizar a sessão do servidor ou hooks de autenticação seguros.
- Implementar middleware para proteger rotas privadas (ex: `/dashboard`).

## Data Fetching & State
- Utilizar `async/await` em Server Components para buscar dados diretamente da base de dados.
