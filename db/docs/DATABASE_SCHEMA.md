# FILE: DATABASE_SCHEMA.md
# PURPOSE: Database Architecture for Monti Honey E-commerce

## 🗄️ Database Overview
- **Engine**: PostgreSQL (Supabase)
- **Strategy**: Configuration-driven (Almost every setting is stored in DB)
- **Security**: RLS enabled. Admin area has a separate role/check.

## 🛠️ Tables Definition

### 1. `profiles` (Users & Admins)
- `id`: uuid (PK, FK -> auth.users.id)
- `full_name`: text
- `email`: text (unique)
- `role`: enum ('customer', 'admin') -> *Crucial for admin area access*
- `phone`: text
- `address`: text
- `created_at`: timestamp

### 2. `categories` (Honey Types/Collections)
- `id`: uuid (PK)
- `name`: text (e.g., "Mel de Urze", "Mel Orgânico")
- `slug`: text (unique, for URLs)
- `description`: text
- `image_url`: text
- `is_active`: boolean (default: true)
- `sort_order`: integer (to control order in the menu)

### 3. `products` (The Honey)
- `id`: uuid (PK)
- `category_id`: uuid (FK -> categories.id)
- `name`: text
- `slug`: text (unique)
- `description`: text
- `price`: numeric(10,2)
- `stock_quantity`: integer
- `weight`: text (e.g., "500g", "1kg")
- `image_url`: text
- `is_featured`: boolean (default: false)
- `is_active`: boolean (default: true)
- `created_at`: timestamp

### 4. `orders` (Sales)
- `id`: uuid (PK)
- `user_id`: uuid (FK -> profiles.id)
- `status`: enum ('pending', 'paid', 'shipped', 'delivered', 'cancelled')
- `total_amount`: numeric(10,2)
- `shipping_address`: text
- `payment_intent_id`: text (for Stripe/Payment integration)
- `created_at`: timestamp

### 5. `order_items` (Products in an Order)
- `id`: uuid (PK)
- `order_id`: uuid (FK -> orders.id)
- `product_id`: uuid (FK -> products.id)
- `quantity`: integer
- `unit_price`: numeric(10,2)

### 6. `site_settings` (Global Configuration)
*Tabela Chave-Valor para que o Admin mude o site sem programar.*
- `id`: uuid (PK)
- `key`: text (unique, e.g., 'store_name', 'contact_email', 'shipping_cost', 'welcome_message')
- `value`: text
- `updated_at`: timestamp

### 7. `banners` (Marketing/Home Page)
- `id`: uuid (PK)
- `title`: text
- `subtitle`: text
- `image_url`: text
- `link_url`: text
- `is_active`: boolean
- `priority`: integer

## 🔗 Relationships
- `categories` $\rightarrow$ `products`: 1:N (Uma categoria tem vários produtos).
- `profiles` $\rightarrow$ `orders`: 1:N (Um cliente pode ter várias encomendas).
- `orders` $\rightarrow$ `order_items`: 1:N (Uma encomenda tem vários produtos).

## 🔐 Security & Access
- **Public Access**: `products` (read-only), `categories` (read-only).
- **Customer Access**: `profiles` (own data), `orders` (own data).
- **Admin Access**: Full access to all tables.