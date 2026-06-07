import NextAuth from 'next-auth'
import { createClient } from '@/lib/supabase'

const handler = NextAuth({
  providers: [
    {
      id: 'supabase',
      name: 'Supabase',
      type: 'oauth',
      version: '2.0',
      wellKnown: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/.well-known/openid-configuration`,
      authorization: {
        params: {
          scope: 'openid email profile',
        },
      },
      clientId: process.env.SUPABASE_SERVICE_ROLE_KEY!,
      clientSecret: process.env.NEXTAUTH_SECRET!,
    },
  ],
  callbacks: {
    async authorized({ auth, request }) {
      // Add role-based checks later
      return true
    },
  },
})

export { handler as GET, handler as POST }
