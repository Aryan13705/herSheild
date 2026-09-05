'use client';

import React, { useState } from 'react';
import { Shield } from 'lucide-react';
import { auth, signInWithEmailAndPassword } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (userCredential.user.email !== 'aryan13705@gmail.com') {
        setError('Access Denied: You do not have admin privileges.');
        await auth.signOut();
      } else {
        router.push('/');
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to login');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#1e293b] rounded-2xl shadow-2xl overflow-hidden border border-slate-800">
        <div className="p-8 text-center border-b border-slate-800 bg-[#0f172a]/50">
          <div className="w-16 h-16 rounded-2xl bg-rose-500 mx-auto mb-4 flex items-center justify-center shadow-[0_0_30px_rgba(244,63,94,0.3)]">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Admin Portal</h1>
          <p className="text-slate-400 text-sm">Secure Command Center Access</p>
        </div>

        <div className="p-8">
          {error && (
            <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400 text-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Admin Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-[#0f172a] border border-slate-700 rounded-xl text-white focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all"
                placeholder="aryan13705@gmail.com"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-[#0f172a] border border-slate-700 rounded-xl text-white focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full bg-rose-500 hover:bg-rose-600 text-white font-bold py-3 px-4 rounded-xl shadow-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Authenticating...' : 'Secure Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
