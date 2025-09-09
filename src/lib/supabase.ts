import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database Types
export interface Database {
  public: {
    Tables: {
      tables: {
        Row: {
          id: number
          table_number: number
          is_occupied: boolean
          created_at: string
        }
        Insert: {
          id?: number
          table_number: number
          is_occupied?: boolean
          created_at?: string
        }
        Update: {
          id?: number
          table_number?: number
          is_occupied?: boolean
          created_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          table_number: number
          total_amount: number
          total_items: number
          status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'completed'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          table_number: number
          total_amount: number
          total_items: number
          status?: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'completed'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          table_number?: number
          total_amount?: number
          total_items?: number
          status?: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'completed'
          created_at?: string
          updated_at?: string
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          menu_item_id: string
          menu_item_name: string
          menu_item_price: number
          quantity: number
          variant: Record<string, string>
          subtotal: number
          created_at: string
        }
        Insert: {
          id?: string
          order_id: string
          menu_item_id: string
          menu_item_name: string
          menu_item_price: number
          quantity: number
          variant: Record<string, string>
          subtotal: number
          created_at?: string
        }
        Update: {
          id?: string
          order_id?: string
          menu_item_id?: string
          menu_item_name?: string
          menu_item_price?: number
          quantity?: number
          variant?: Record<string, string>
          subtotal?: number
          created_at?: string
        }
      }
    }
  }
}