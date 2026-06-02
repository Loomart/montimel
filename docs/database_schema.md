"# Monti Database Schema Documentation

---

## Overview
This document outlines the database schema for **Monti**, built using **Supabase** and **PostgreSQL**. It includes table definitions, relationships, Row-Level Security (RLS) policies, and migration scripts.

---

## Tables

### 1. **Users**
Stores user authentication and profile information.
```plaintext
Columns:
- id: UUID (Primary Key)
- email: String (Unique)
- password: String (Hashed)
- created_at: Timestamp
- updated_at: Timestamp
- is_active: Boolean
- is_superadmin: Boolean
```

**RLS Policy:**
- Allow `SELECT` only for the row owner (or `service_role`).
- Allow `INSERT`, `UPDATE`, and `DELETE` only for the row owner or `service_role`.

---

### 2. **Products**
Stores product information for the e-commerce platform.
```plaintext
Columns:
- id: UUID (Primary Key)
- name: String
- description: Text
- price: Numeric
- created_at: Timestamp
- updated_at: Timestamp
- is_active: Boolean
- category_id: UUID (Foreign Key → Categories)
```

**RLS Policy:**
- Allow `SELECT` for `public` (or authenticated users).
- Allow `INSERT`, `UPDATE`, and `DELETE` only for `service_role`.

---

### 3. **Categories**
Stores product categories.
```plaintext
Columns:
- id: UUID (Primary Key)
- name: String
- description: Text
- created_at: Timestamp
```

**RLS Policy:**
- Allow `SELECT` for `public`.
- Allow `INSERT`, `UPDATE`, and `DELETE` only for `service_role`.

---

### 4. **Carts**
Stores user carts.
```plaintext
Columns:
- id: UUID (Primary Key)
- user_id: UUID (Foreign Key → Users)
- created_at: Timestamp
- updated_at: Timestamp
```

**RLS Policy:**
- Allow `SELECT` and `UPDATE` only for the row owner (or `service_role`).
- Allow `INSERT` and `DELETE` only for the row owner or `service_role`.

---

### 5. **CartItems**
Stores items in a user's cart.
```plaintext
Columns:
- id: UUID (Primary Key)
- cart_id: UUID (Foreign Key → Carts)
- product_id: UUID (Foreign Key → Products)
- quantity: Integer
- created_at: Timestamp
- updated_at: Timestamp
```

**RLS Policy:**
- Allow `SELECT`, `INSERT`, `UPDATE`, and `DELETE` only for the row owner or `service_role`.

---

### 6. **Orders**
Stores user orders.
```plaintext
Columns:
- id: UUID (Primary Key)
- user_id: UUID (Foreign Key → Users)
- total_amount: Numeric
- status: String (e.g., 'pending', 'completed', 'cancelled')
- created_at: Timestamp
- updated_at: Timestamp
- payment_intent_id: String (Stripe)
```

**RLS Policy:**
- Allow `SELECT` only for the row owner (or `service_role`).
- Allow `INSERT`, `UPDATE` only for the row owner or `service_role`.

---

### 7. **OrderItems**
Stores items in a user's order.
```plaintext
Columns:
- id: UUID (Primary Key)
- order_id: UUID (Foreign Key → Orders)
- product_id: UUID (Foreign Key → Products)
- quantity: Integer
- price_at_purchase: Numeric
```

**RLS Policy:**
- Allow `SELECT`, `INSERT` only for the row owner or `service_role`.

---

## Relationships
- **Users → Carts**: One-to-Many
- **Users → Orders**: One-to-Many
- **Carts → CartItems**: One-to-Many
- **Orders → OrderItems**: One-to-Many
- **Products → Categories**: Many-to-One
- **CartItems → Products**: Many-to-One
- **OrderItems → Products**: Many-to-One

---

## RLS Policies Summary
| Table        | Public Access | Authenticated User Access | Service Role Access |
|--------------|---------------|----------------------------|----------------------|
| **Users**    | No            | SELECT (own rows)          | Full Access          |
| **Products** | SELECT        | SELECT                     | Full Access          |
| **Carts**    | No            | SELECT, UPDATE (own rows)  | Full Access          |
| **CartItems**| No            | No                         | Full Access          |
| **Orders**   | No            | SELECT (own rows)          | Full Access          |
| **OrderItems**| No           | No                         | Full Access          |

---

## Migration Scripts
All migration scripts are stored in the `migrations/` directory at the root of the project.

**How to apply migrations:**
```bash
npx supabase db push
```

**How to reset the database:**
```bash
npx supabase db reset
```

---

## Versioning
Database schema versions are tracked using Supabase migrations. Each migration script should:
- Be idempotent (can be run multiple times safely).
- Include a clear description of changes.
- Be named following the format: `[timestamp]_[description]`.

---
## Example Migration
```sql
-- Example: Create Products table
create table products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  price numeric not null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  is_active boolean default true,
  category_id uuid references categories(id)
);

-- Example: Set RLS policy for Products table
alter table products enable row level security;

create policy "Public can select Products" on products
  for select using (true);

create policy "Service role can manage Products" on products
  for all using (auth.role() = 'service_role');
```

---
## Best Practices
1. **Enable RLS on All Tables**: Never disable RLS on sensitive tables.
2. **Use `service_role` Sparingly**: Restrict its use to server-side operations.
3. **Document All Policies**: Clearly define RLS rules for every table.
4. **Backup Before Changes**: Always backup the database before running migrations.

---

## Contact
For questions or clarifications, refer to the [Monti Architecture Documentation](architecture_rules.md) or reach out to the development team.
"