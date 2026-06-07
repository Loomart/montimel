import { z } from 'zod'

export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  full_name: z.string().optional(),
  role: z.enum(['customer', 'admin']),
  phone: z.string().optional(),
})

export type User = z.infer<typeof userSchema>
