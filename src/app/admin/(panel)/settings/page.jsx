import { getAdminSession } from '@/lib/adminAuth';
import PasswordForm from './PasswordForm';

export const dynamic = 'force-dynamic';

export default async function SettingsPage() {
  const session = await getAdminSession();
  const email = session?.profile?.email ?? '';

  return (
    <>
      <h1>Account &amp; password</h1>
      <p className="lede">
        Signed in as {email}. Use the form below to change this
        account&rsquo;s password.
      </p>
      <PasswordForm email={email} />
    </>
  );
}
