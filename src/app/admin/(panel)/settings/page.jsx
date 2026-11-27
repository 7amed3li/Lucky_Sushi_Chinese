import { getAdminSession } from '@/lib/adminAuth';
import { prettyRole } from '../../format';
import PasswordForm from './PasswordForm';

export const metadata = { title: 'Account' };
export const dynamic = 'force-dynamic';

export default async function SettingsPage() {
  const session = await getAdminSession();
  const profile = session?.profile;
  const email = profile?.email ?? '';

  return (
    <>
      <header className="page-head">
        <h1>Account</h1>
        <p className="lede">
          Signed in as <b>{profile?.display_name || email}</b>
          {profile?.display_name ? ` (${email})` : ''} ·{' '}
          <span className={`role-badge role-${profile?.role}`}>{prettyRole(profile?.role)}</span>
        </p>
      </header>
      <PasswordForm email={email} />
    </>
  );
}
