# Security & Data Rules

## Database Access (Supabase)
- **RLS (Row Level Security)**: NUNCA crear tabelas sin RLS ativado. Todas as tabelas devem ter políticas de segurança definidas.
- **Client vs Server**: 
  - No Cliente (Browser): Usar a `supabase-browser-client` com políticas de RLS rigorosas. Nunca expor a `service_role` key no cliente.
  - No Servidor (Server Components/Actions): Usar `supabase-server-client` com a `service_role` key APENAS em funções administrativas protegidas ou quando necessário para bypass de RLS (com cuidado).
- **Validation**: Validar todos os inputs de Server Actions utilizando a biblioteca `Zod`. Nunca confiar nos dados vindos do cliente.

## Authentication & Authorization
- Utilizar Supabase Auth para gestão de sessões.
- Proibir a passagem de tokens de autenticação (`access_token`) via props de componentes ou URL params; utilizar a sessão do servidor ou hooks de autenticação seguros.
- Implementar middleware para proteger rotas privadas (ex: `/dashboard`).
- **Autorização Baseada em Função**: Verificar o `role` do utilizador no servidor antes de executar operações sensíveis, não apenas confiar na UI.

## Secrets Management
- **Variáveis de Ambiente**: Todas as chaves sensíveis (`SUPABASE_SERVICE_ROLE_KEY`, `STRIPE_SECRET_KEY`, etc.) devem estar em `.env.local` e NUNCA commitadas no Git.
- **Exposição**: Garantir que nenhuma chave secreta é exposta ao cliente via `next.config.js` (propriedade `publicRuntimeConfig` ou variáveis com prefixo `NEXT_PUBLIC_`).

## Input Sanitization & XSS Prevention
- **Sanitização de HTML**: Nunca renderizar HTML cru vindo do utilizador sem sanitização. Utilizar bibliotecas como `DOMPurify` se for necessário permitir HTML rico.
- **Escaping Automático**: O React faz escaping automático por padrão. Não usar `dangerouslySetInnerHTML` a menos que seja estritamente necessário e devidamente sanitizado.

## File Uploads & Storage
- **Validação de Tipos**: Validar o MIME type e a extensão do ficheiro no servidor antes de processar o upload.
- **Limites de Tamanho**: Definir limites máximos de tamanho para uploads (ex: 5MB) para prevenir ataques de negação de serviço (DoS).
- **URLs Seguras**: Utilizar signed URLs temporárias para acesso a ficheiros privados no Supabase Storage, em vez de expor links diretos.

## Error Handling & Logging
- **Não Expor Stack Traces**: Em produção, nunca retornar detalhes internos do servidor ou stack traces ao cliente.
- **Logging Seguro**: Ao fazer logging de erros (ex: Sentry, console), garantir que não se registam dados sensíveis (PII) como passwords, tokens ou números de cartão de crédito.

## Data Fetching & State
- Utilizar `async/await` em Server Components para buscar dados diretamente da base de dados.
- Implementar Error Boundaries e Loading States (arquivo `loading.tsx` e `error.tsx`) para cada rota principal.