'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    setError('');
    if (!supabase) {
      setError(
        'Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY first.'
      );
      return;
    }
    setBusy(true);
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    setBusy(false);
    if (signInError) {
      setError('Sign-in failed: ' + signInError.message);
      return;
    }
    router.push('/admin');
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit}>
      {error ? <div className="admin-error">{error}</div> : null}
      <div className="field">
        <label htmlFor="admin-email">Email</label>
        <input
          id="admin-email"
          type="email"
          autoComplete="username"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="field">
        <label htmlFor="admin-password">Password</label>
        <input
          id="admin-password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className="btn" type="submit" disabled={busy} style={{ width: '100%', justifyContent: 'center' }}>
        {busy ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  );
}
