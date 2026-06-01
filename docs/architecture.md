# System Architecture - Monti Project

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