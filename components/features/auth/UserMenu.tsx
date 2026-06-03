'use client'

import { signOut } from '@/services/auth'
import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'

interface UserMenuProps {
  email: string
}

/**
 * UserMenu Component
 * 
 * Displays the logged-in user's email and a logout button.
 * 
 * @param email - The email of the currently logged-in user
 */
export function UserMenu({ email }: UserMenuProps) {
  /**
   * Handles the logout action.
   * Calls the signOut server action.
   */
  const handleLogout = async () => {
    console.log('[UserMenu] Initiating logout')
    await signOut()
  }

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm text-muted-foreground">
        Logged in as: <strong>{email}</strong>
      </span>
      <Button variant="outline" size="sm" onClick={handleLogout}>
        <LogOut className="mr-2 h-4 w-4" />
        Logout
      </Button>
    </div>
  )
}
