export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          email: string
          role: 'customer' | 'admin'
          phone: string | null
          address: string | null
          created_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          email: string
          role?: 'customer' | 'admin'
          phone?: string | null
          address?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          email?: string
          role?: 'customer' | 'admin'
          phone?: string | null
          address?: string | null
          created_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          image_url: string | null
          is_active: boolean
          sort_order: number
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          image_url?: string | null
          is_active?: boolean
          sort_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          image_url?: string | null
          is_active?: boolean
          sort_order?: number
          created_at?: string
        }
      }
      products: {
        Row: {
          id: string
          category_id: string | null
          name: string
          slug: string
          description: string | null
          price: number
          stock_quantity: number
          weight: string | null
          image_url: string | null
          is_featured: boolean
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          category_id?: string | null
          name: string
          slug: string
          description?: string | null
          price: number
          stock_quantity?: number
          weight?: string | null
          image_url?: string | null
          is_featured?: boolean
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          category_id?: string | null
          name?: string
          slug?: string
          description?: string | null
          price?: number
          stock_quantity?: number
          weight?: string | null
          image_url?: string | null
          is_featured?: boolean
          is_active?: boolean
          created_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          user_id: string | null
          status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled'
          total_amount: number
          shipping_address: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          status?: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled'
          total_amount: number
          shipping_address?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          status?: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled'
          total_amount?: number
          shipping_address?: string | null
          created_at?: string
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          product_id: string | null
          quantity: number
          price_at_time: number
        }
        Insert: {
          id?: string
          order_id: string
          product_id?: string | null
          quantity: number
          price_at_time: number
        }
        Update: {
          id?: string
          order_id?: string
          product_id?: string | null
          quantity?: number
          price_at_time?: number
        }
      }
      site_settings: {
        Row: {
          key: string
          value: string | null
          description: string | null
        }
        Insert: {
          key: string
          value?: string | null
          description?: string | null
        }
        Update: {
          key?: string
          value?: string | null
          description?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_role: 'customer' | 'admin'
      order_status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled'
    }
  }
}
