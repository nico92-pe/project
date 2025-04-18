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
          email: string
          plan: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          plan?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          plan?: string
          created_at?: string
          updated_at?: string
        }
      }
      qr_codes: {
        Row: {
          id: string
          user_id: string
          url: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          url: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          url?: string
          created_at?: string
        }
      }
    }
  }
}