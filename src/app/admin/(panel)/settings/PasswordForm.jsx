'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase/client';

export default function PasswordForm({ email }) {
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [busy, setBusy] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
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
    // Re-verify the current password before changing it.
    const { error: verifyError } = await supabase.auth.signInWithPassword({
      email,
      password: current,
    });
    if (verifyError) {
      setBusy(false);
      setError('The current password is not correct.');
      return;
    }

    const { error: updateError } = await supabase.auth.updateUser({
      password: next,
    });
    setBusy(false);
    if (updateError) {
      setError('Could not change the password: ' + updateError.message);
      return;
    }

    setCurrent('');
    setNext('');
    setConfirm('');
    setNotice('Password changed. Use the new password at your next sign-in.');
  }

  return (
    <div className="panel-card">
      <h2>Change password</h2>
      {error ? <div className="admin-error">{error}</div> : null}
      {notice ? <div className="admin-ok">{notice}</div> : null}
      <form onSubmit={onSubmit}>
        <div className="field">
          <label>Current password</label>
          <input
            type="password"
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
            autoComplete="current-password"
            required
          />
        </div>
        <div className="field">
          <label>New password</label>
          <input
            type="password"
            value={next}
            onChange={(e) => setNext(e.target.value)}
            autoComplete="new-password"
            required
          />
        </div>
        <div className="field">
          <label>Confirm new password</label>
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            autoComplete="new-password"
            required
          />
        </div>
        <button className="btn" type="submit" disabled={busy}>
          {busy ? 'Saving…' : 'Change password'}
        </button>
      </form>
    </div>
  );
}
