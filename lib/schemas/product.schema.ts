import { z } from 'zod'

export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  owner_id: z.string(), // Enforce ownership in RLS
  price: z.number().positive(),
})

export type Product = z.infer<typeof productSchema>
