import { createBrowserClient } from '@supabase/ssr'
import { createServerClient as createServerClientFromSSR } from '@supabase/ssr'
import { cookies } from 'next/headers'

/**
 * Creates a Supabase client for use in Client Components (e.g., forms, hooks).
 * This client uses the anon key and relies on RLS policies.
 */
export function createClient() {
  const cookieStore = cookies()

  return createServerClientFromSSR(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you want to use middleware for session management.
          }
        },
      },
    }
  )
}

/**
 * Creates a Supabase client specifically for Server Components and Server Actions.
 * In most cases, `createClient` above is sufficient due to cookie sharing,
 * but this ensures explicit server-side context if needed.
 */
export function createServerClient() {
  const cookieStore = cookies()

  return createServerClientFromSSR(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you want to use middleware for session management.
          }
        },
      },
    }
  )
}
