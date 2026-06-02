# System Architecture - Monti Project

## **📌 Core Principles**
### **Server First Approach (Continued)**
This is the default choice for most logic in a Next.js application with Supabase integration. Use Client Components only when interactivity is required and preferably use Server components where data fetching/mutation needs to be performed on server side due to high performance requirements or complex interaction between client-side and back end operations (e.g., forms, AJAX requests). Also, consider using Supabase's built in functions for data fetching and mutation operations if possible as they are optimized to handle these scenarios efficiently with great performance benefits (e.g., batching requests). For all other cases where you need a server-side component or client components can coexist within the same page/component, use this pattern of having one set in Client Components while another is Server Component(s) for data fetching.

## 1. Tech Stack
- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS
- **Database & Auth**: Supabase (PostgreSQL)
- **State Management**: React Context / Server Components

## 2. Data Model (Core Entities)
- **Products**: id, name, description, price, category_id, stock, image_url
- **Categories**: id, name, slug
- **Orders**: id, user_id, status, total_price, created_at
- **Order_Items**: id, order_id, product_id, quantity, price

## 3. Folder Structure
- `/app`: Routes, layouts, and server components
- `/components`: Atomic UI components (ui/, common/, layout/)
- `/lib`: Utility functions and Supabase client configuration
- `/hooks`: Custom React hooks
- `/types`: TypeScript interfaces and types

## 4. Infrastructure & Security
- **RLS (Row Level Security)**: All tables must have RLS enabled.
- **Authentication**: Supabase Auth (Email/Password, OAuth)
- **Validation**: Zod for schema validation in server actions