import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { UserMenu } from '@/components/features/auth/UserMenu'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

/**
 * Dashboard Page Component
 * 
 * This is a Server Component that displays the dashboard for logged-in users.
 * It checks for a valid session and redirects to login if not found.
 */
export default async function DashboardPage() {
  const supabase = createClient()

  // Check if user is authenticated
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    console.error('[Dashboard] No valid session found, redirecting to login')
    redirect('/login')
  }

  console.log(`[Dashboard] User ${user.email} accessed dashboard`)

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Welcome to Monti</CardTitle>
          <CardDescription>
            This is your protected dashboard. Only logged-in users can see this page.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-between items-center">
          {/* Display User Info and Logout */}
          <UserMenu email={user.email || 'Unknown'} />
          
          {/* Placeholder for future dashboard content */}
          <div className="text-muted-foreground">
            Dashboard Content Goes Here
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
