import { createClient } from '@supabase/supabase-js';

// Use environment variables or fallback to empty strings to prevent errors
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storageKey: 'supabase.auth.token',
    detectSessionInUrl: true,
    flowType: 'implicit'
  }
});

// Initialize auth state from localStorage on client side
if (typeof window !== 'undefined') {
  const savedSession = localStorage.getItem('supabase.auth.token');
  if (savedSession) {
    try {
      const session = JSON.parse(savedSession);
      // Set the session in supabase client
      supabase.auth.setSession({
        access_token: session.access_token,
        refresh_token: session.refresh_token
      });
    } catch (error) {
      console.error('Error restoring auth session:', error);
      // Clear invalid session data
      localStorage.removeItem('supabase.auth.token');
    }
  }
}