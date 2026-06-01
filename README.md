# Monti - Plataforma Web Moderna

Bem-vindo ao Monti, uma plataforma web moderna construída com Next.js 13+, TypeScript e Supabase. Este projeto segue as melhores práticas de desenvolvimento e segurança para garantir um ambiente confiável e escalável.

## 🛠️ Características Principais
- **Next.js 13+**: Com foco em Server Components
- **TypeScript**: Desenvolvimento tipado rigoroso
- **Supabase**: Banco de dados PostgreSQL com autenticação e segurança integrada
- **Tailwind CSS**: Design responsivo e moderno

## 📦 Estrutura do Projeto
```
/app                    # Rotas e layouts Next.js
/components            # Componentes reutilizáveis
    /ui                # Componentes básicos (Buttons, Inputs)
    /features         # Componentes complexos com lógica de negócio
/lib                   # Clientes externos (Supabase, Stripe)
/hooks                 # Hooks personalizados
/types                 # Definições TypeScript globais
/services              # Lógica de negócio e API calls

```

## 🛠️ Instalação & Execução
1. Clone o repositório:
   ```bash
   git clone <repositorio-monti>
   ```

2. Instale as dependências:
   ```bash
   npm install
   # ou
   yarn install
   ```

3. Configure as variáveis de ambiente (`.env.local`)

4. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   # ou
   yarn dev