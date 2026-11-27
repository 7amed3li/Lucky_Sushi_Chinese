'use client';

import { useState } from 'react';
import { LuCircleCheck, LuTriangleAlert } from 'react-icons/lu';
import { supabase } from '@/lib/supabase/client';
import { PasswordInput } from '../../ui';

export default function PasswordForm({ email }) {
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [busy, setBusy] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    if (busy) return;
    setError('');
    setNotice('');

    if (!supabase) {
      setError('Supabase is not configured on this deployment.');
      return;
    }
    if (next.length < 8) {
      setError('The new password must be at least 8 characters.');
      return;
    }
    if (next !== confirm) {
      setError('The new password and its confirmation do not match.');
      return;
    }
    if (next === current) {
      setError('The new password is the same as the current one.');
      return;
    }

    setBusy(true);
    try {
      // Re-verify the current password before changing it.
      const { error: verifyError } = await supabase.auth.signInWithPassword({
        email,
        password: current,
      });
      if (verifyError) {
        setError('The current password is not correct.');
        return;
      }

      const { error: updateError } = await supabase.auth.updateUser({ password: next });
      if (updateError) {
        setError('Could not change the password: ' + updateError.message);
        return;
      }

      setCurrent('');
      setNext('');
      setConfirm('');
      setNotice('Password changed. Use the new password at your next sign-in.');
    } catch {
      setError('Network error — check your connection and try again.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="panel-card" style={{ maxWidth: 560 }}>
      <h2>Change password</h2>
      {error ? (
        <div className="admin-error" role="alert">
          <LuTriangleAlert aria-hidden="true" />
          <div>{error}</div>
        </div>
      ) : null}
      {notice ? (
        <div className="admin-ok" role="status">
          <LuCircleCheck aria-hidden="true" />
          <div>{notice}</div>
        </div>
      ) : null}
      <form onSubmit={onSubmit}>
        <label className="field">
          <span className="lbl">Current password</span>
          <PasswordInput value={current} onChange={(e) => setCurrent(e.target.value)} autoComplete="current-password" />
        </label>
        <label className="field">
          <span className="lbl">New password</span>
          <PasswordInput value={next} onChange={(e) => setNext(e.target.value)} autoComplete="new-password" minLength={8} />
          <span className="hint">At least 8 characters.</span>
        </label>
        <label className="field">
          <span className="lbl">Confirm new password</span>
          <PasswordInput value={confirm} onChange={(e) => setConfirm(e.target.value)} autoComplete="new-password" minLength={8} />
        </label>
        <button className="btn" type="submit" disabled={busy}>
          {busy ? 'Saving…' : 'Change password'}
        </button>
      </form>
    </section>
  );
}
