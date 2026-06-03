'use client'

import { useState } from 'react'
import { signIn, signUp } from '@/services/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'

/**
 * LoginForm Component
 * 
 * This component handles both user login and registration.
 * It toggles between two states: 'login' and 'signup'.
 * 
 * @returns JSX element representing the login/signup form
 */
export function LoginForm() {
  // State to track whether we are in login or signup mode
  const [isSignUp, setIsSignUp] = useState(false)
  
  // Form state variables
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  
  // UI state variables
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  /**
   * Handles the form submission.
   * Calls either signIn or signUp server action based on isSignUp state.
   * 
   * @param e - The React form event
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null) // Clear previous errors
    setIsLoading(true)

    console.log(`[LoginForm] Submitting form in ${isSignUp ? 'signup' : 'login'} mode`)

    try {
      if (isSignUp) {
        console.log('[LoginForm] Calling signUp server action')
        await signUp(email, password, fullName)
      } else {
        console.log('[LoginForm] Calling signIn server action')
        await signIn(email, password)
      }
    } catch (err: any) {
      // Log the error for debugging
      console.error('[LoginForm] Error during authentication:', err.message || err)
      
      // Set the error message to display in the UI
      setError(err.message || 'An unexpected error occurred')
    } finally {
      setIsLoading(false)
      console.log('[LoginForm] Submission process finished')
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{isSignUp ? 'Create an Account' : 'Welcome Back'}</CardTitle>
        <CardDescription>
          {isSignUp 
            ? 'Sign up to start shopping for honey.' 
            : 'Enter your credentials to access your account.'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Error Alert */}
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Full Name Field (Only for Sign Up) */}
          {isSignUp && (
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
          )}

          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Processing...' : isSignUp ? 'Sign Up' : 'Log In'}
          </Button>
        </form>

        {/* Toggle Login/Signup Link */}
        <div className="mt-4 text-center text-sm">
          <span className="text-muted-foreground">
            {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
          </span>
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="underline underline-offset-4 hover:text-primary"
          >
            {isSignUp ? 'Log in' : 'Sign up'}
          </button>
        </div>
      </CardContent>
    </Card>
  )
}
