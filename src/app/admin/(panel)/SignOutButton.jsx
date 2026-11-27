'use client';

import { useState } from 'react';
import { LuLogOut } from 'react-icons/lu';
import { supabase } from '@/lib/supabase/client';

export default function SignOutButton() {
  const [busy, setBusy] = useState(false);

  async function signOut() {
    if (busy) return;
    setBusy(true);
    try {
      if (supabase) await supabase.auth.signOut();
    } finally {
      // Hard navigation: guarantees the cookies are gone and no cached
      // admin page can be shown after signing out.
      window.location.assign('/admin/login');
    }
  }

  return (
    <button type="button" className="btn secondary small block" onClick={signOut} disabled={busy}>
      <LuLogOut aria-hidden="true" />
      {busy ? 'Signing out…' : 'Sign out'}
    </button>
  );
}
