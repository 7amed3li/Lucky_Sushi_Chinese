import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/adminAuth';
import LoginForm from './LoginForm';
import '../admin.css';

export const metadata = { title: 'Admin Login | Lucky Sushi' };
export const dynamic = 'force-dynamic';

export default async function AdminLoginPage() {
  const session = await getAdminSession();
  if (session) redirect('/admin');

  const configured = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY)
  );

  return (
    <div className="admin-root">
      <div className="admin-login-wrap">
        <div className="admin-login-card">
          <h1>Lucky Sushi — Admin</h1>
          <p className="sub">Sign in with your panel account.</p>
          {!configured ? (
            <div className="admin-warn">
              Supabase env vars are not set on this deployment, so sign-in is
              disabled. See <b>ADMIN_PANEL.md</b> for the setup steps.
            </div>
          ) : null}
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
