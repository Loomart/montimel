import { createClient } from '@/lib/supabase'
import { signOut } from '@/services/auth'

export default async function DashboardPage() {
  const supabase = createClient()
  
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    // If no user is found, redirect to login
    return <div className="p-8">Please log in to view this page.</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center justify-between rounded-lg bg-white p-6 shadow-md">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="mt-2 text-gray-600">Welcome, {user.email}</p>
          </div>
          <form action={signOut}>
            <button
              type="submit"
              className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              Sign Out
            </button>
          </form>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Example Cards */}
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h3 className="text-lg font-medium text-gray-900">Profile</h3>
            <p className="mt-2 text-sm text-gray-500">Manage your profile settings.</p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h3 className="text-lg font-medium text-gray-900">Settings</h3>
            <p className="mt-2 text-sm text-gray-500">Configure your application preferences.</p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h3 className="text-lg font-medium text-gray-900">Help</h3>
            <p className="mt-2 text-sm text-gray-500">Get help and support.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
