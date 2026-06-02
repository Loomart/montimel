import { createClient } from '@/lib/supabase'
import { redirect } from 'next/navigation'

export default async function Home() {
  const supabase = createClient()
  
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    // If user is logged in, redirect to dashboard
    redirect('/dashboard')
  }

  // If no user, redirect to login
  redirect('/login')
}
