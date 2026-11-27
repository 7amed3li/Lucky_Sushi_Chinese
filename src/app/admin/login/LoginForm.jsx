'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LuTriangleAlert } from 'react-icons/lu';
import { supabase } from '@/lib/supabase/client';
import { PasswordInput } from '../ui';

function friendlyError(error) {
  const message = error?.message ?? '';
  if (/invalid login credentials/i.test(message)) return 'Incorrect email or password.';
  if (/email not confirmed/i.test(message)) return 'This email address has not been confirmed yet.';
  if (/rate limit|too many/i.test(message)) return 'Too many attempts. Please wait a minute and try again.';
  return message || 'Sign-in failed. Please try again.';
}

export default function LoginForm({ disabled = false }) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const watchdog = useRef(null);

  useEffect(() => () => clearTimeout(watchdog.current), []);

  async function onSubmit(event) {
    event.preventDefault();
    if (busy || disabled) return;
    setError('');

    if (!supabase) {
      setError('Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY first.');
      return;
    }

    setBusy(true);
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (signInError) {
        setError(friendlyError(signInError));
        setBusy(false);
        return;
      }

      // Keep the button busy until the dashboard arrives (no double submit),
      // but never leave it stuck if navigation stalls.
      watchdog.current = setTimeout(() => {
        setBusy(false);
        setError('Signed in, but the dashboard is taking too long to open. Please reload the page.');
      }, 15000);
      router.replace('/admin');
    } catch {
      setError('Network error — check your connection and try again.');
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate={false}>
      {error ? (
        <div className="admin-error" role="alert">
          <LuTriangleAlert aria-hidden="true" />
          <div>{error}</div>
        </div>
      ) : null}
      <label className="field">
        <span className="lbl">Email</span>
        <input
          type="email"
          autoComplete="username"
          autoCapitalize="none"
          inputMode="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label className="field">
        <span className="lbl">Password</span>
        <PasswordInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
      </label>
      <button className="btn block" type="submit" disabled={busy || disabled}>
        {busy ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  );
}
