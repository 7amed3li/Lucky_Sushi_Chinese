import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { LuTriangleAlert } from 'react-icons/lu';
import { getAdminAuthState } from '@/lib/adminAuth';
import LoginForm from './LoginForm';

export const metadata = { title: 'Sign in' };
export const dynamic = 'force-dynamic';

const NOTICES = {
  'no-profile':
    'This account is signed in but has no admin-panel access. Ask a developer or owner to add you.',
  inactive: 'This account has been deactivated. Contact a developer or owner.',
};

export default async function AdminLoginPage() {
  const state = await getAdminAuthState();
  if (state.status === 'ok') redirect('/admin');

  const unconfigured = state.status === 'unconfigured';
  const notice = NOTICES[state.status];

  return (
    <div className="admin-login-wrap">
      <div className="admin-login-card">
        <Image
          className="logo"
          src="/logo-badge.webp"
          alt="Lucky Sushi & Chinese"
          width={168}
          height={123}
          priority
        />
        <h1>Staff sign-in</h1>
        <p className="sub">Sign in with your admin-panel account.</p>

        {unconfigured ? (
          <div className="admin-warn" role="alert">
            <LuTriangleAlert aria-hidden="true" />
            <div>
              Supabase env vars are not set on this deployment, so sign-in is disabled. See{' '}
              <b>ADMIN_PANEL.md</b> for the setup steps.
            </div>
          </div>
        ) : null}

        {notice ? (
          <div className="admin-error" role="alert">
            <LuTriangleAlert aria-hidden="true" />
            <div>{notice}</div>
          </div>
        ) : null}

        <LoginForm disabled={unconfigured} />
        <Link className="back" href="/tr">← Back to the website</Link>
      </div>
    </div>
  );
}
