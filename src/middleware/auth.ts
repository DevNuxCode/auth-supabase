import { supabase } from '../lib/supabase';

// Authentication middleware
export async function isAuthenticated() {
  try {
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
      console.error('Auth error:', error);
      return false;
    }
    
    return !!data.session;
  } catch (err) {
    console.error('Unexpected auth error:', err);
    return false;
  }
}

// Get current user data
export async function getCurrentUser() {
  try {
    const { data, error } = await supabase.auth.getUser();
    
    if (error) {
      console.error('Get user error:', error);
      return null;
    }
    
    return data.user;
  } catch (err) {
    console.error('Unexpected user error:', err);
    return null;
  }
}

// Refresh session if needed
export async function refreshSession() {
  try {
    const { data } = await supabase.auth.getSession();
    
    if (data.session) {
      // If session exists but is close to expiring, refresh it
      const expiresAt = data.session.expires_at;
      const now = Math.floor(Date.now() / 1000);
      
      // If session expires in less than 10 minutes, refresh it
      if (expiresAt && (expiresAt - now < 600)) {
        const { data: refreshData, error } = await supabase.auth.refreshSession();
        
        if (error) {
          console.error('Session refresh error:', error);
          return false;
        }
        
        // Store refreshed session
        if (refreshData.session) {
          localStorage.setItem('supabase.auth.token', JSON.stringify(refreshData.session));
          return true;
        }
      }
      
      return true;
    }
    
    return false;
  } catch (err) {
    console.error('Session refresh error:', err);
    return false;
  }
}