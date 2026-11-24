'use client';

import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';

export default function SignOutButton() {
  const router = useRouter();

  async function signOut() {
    if (supabase) await supabase.auth.signOut();
    router.push('/admin/login');
    router.refresh();
  }

  return (
    <button className="btn secondary small" onClick={signOut} style={{ width: '100%', justifyContent: 'center' }}>
      Sign out
    </button>
  );
}
