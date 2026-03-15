import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function LogoutButton() {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error('Error signing out:', error);
      setLoading(false);
    }
    // Note: If successful, the AuthProvider's onAuthStateChange listener 
    // will instantly catch the session death and cascade the UI back to <Login />.
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="px-4 py-2 text-sm font-medium text-slate-400 bg-transparent border border-transparent rounded-lg hover:text-red-400 hover:bg-zinc-900/50 hover:border-red-900/30 focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? 'Signing out...' : 'Sign Out'}
    </button>
  );
}
