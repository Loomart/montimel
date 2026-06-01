# Security & Data Rules - Monti Project

## 1. Database Access (Supabase)
- **Zero Trust Frontend:** Never trust data coming from the client. All critical validations must happen on the server.
- **RLS (Row Level Security):** MANDATORY. No table shall be created without RLS enabled. No "public" write access.
- **Client vs Server:**
  - **Client:** Use `supabase-browser-client` with strict RLS policies.
  - **Server:** Use `supabase-server-client` with the `service_role` key ONLY in protected administrative functions.
- **Validation:** All Server Action inputs must be validated using the `Zod` library.

## 2. Authentication & Authorization
- **Provider:** Supabase Auth.
- **RBAC (Role-Based Access Control):** Strict distinction between `Customer` and `Admin` roles.
- **Token Security:** Prohibit passing auth tokens via component props; use server session or auth hooks.

## 3. Financial Integrity
- **Price Validation:** Prices must NEVER be trusted from the client side.
- **Server-Side Calculation:** All price calculations and totals must be fetched and recalculated on the server during checkout and payment processing.

## 4. Data Fetching & Storage
- **Fetching:** Use `async/await` in Server Components.
- **Error Handling:** Implement Error Boundaries and Loading States (`loading.tsx`, `error.tsx`) for every main route.
- **Storage:** Use the Supabase Storage bucket named `product-images` for all product assets.
- **Async Operations:** All async calls must be wrapped in `try-catch` blocks with user-friendly feedback (Toasts/Alerts).