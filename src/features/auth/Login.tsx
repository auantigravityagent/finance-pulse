import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  // Centralize the messaging state to cleanly handle UI feedback
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        // Redirection context back to our explicit URL to preserve GitHub Pages subpaths
        emailRedirectTo: window.location.href,
      },
    });

    if (error) {
      setMessage({ type: 'error', text: error.message });
    } else {
      setMessage({ type: 'success', text: 'Magic link sent! Check your inbox.' });
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-2xl shadow-xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">
            Welcome Back
          </h1>
          <p className="mt-2 text-slate-400">Enter your email to receive a magic login link.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-300">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className="w-full px-4 py-2 mt-1 text-slate-200 bg-slate-800/50 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 transition-colors disabled:opacity-50"
              placeholder="you@example.com"
            />
          </div>

          {/* Dynamic Feedback Display */}
          {message && (
            <div
              className={`p-3 text-sm rounded-lg ${
                message.type === 'success'
                  ? 'bg-emerald-900/30 text-emerald-400 border border-emerald-800'
                  : 'bg-red-900/30 text-red-400 border border-red-800'
              }`}
            >
              {message.text}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 text-white font-medium bg-gradient-to-r from-sky-500 to-indigo-500 rounded-lg hover:from-sky-400 hover:to-indigo-400 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {loading ? 'Sending link...' : 'Send Magic Link'}
          </button>
        </form>
      </div>
    </div>
  );
}
