# Architecture Rules - Monti Project

## Core Principles
- **Server-First**: Utilize Server Components por padrão. Mova para Client Components ('use client') apenas quando houver interatividade necessária.
- **Colocation**: Coloque componentes, estilos e testes o mais próximo possível de onde são utilizados.

## Directory Structure
- `/app`: Next.js App Router (Routes, Layouts, Pages).
- `/components`: 
  - `/ui`: Componentes genéricos e atómicos (ex: Button, Input) - baseados em ShadcnUI.
  - `/features`: Componentes complexos ligados a lógica de negócio (ex: `/features/cart`, `/features/auth`).
- `/lib`: Configurações de clientes externos (Supabase client, Stripe, etc).
- `/hooks`: Hooks personalizados e reutilizáveis.
- `/types`: Definições de TypeScript globais e interfaces de banco de dados.
- `/services`: Lógica de negócio pura e chamadas de API (Server Actions).

## State Management
- **Server State**: Utilizar Supabase/Database diretamente via Server Components.
- **Global State**: Utilizar Zustand ou Context API apenas se for estritamente necessário para estados transversais (ex: Tema, Sessão de Utilizador).
- **Local State**: Utilizar `useState` e `useReducer`.