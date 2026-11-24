import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getAdminSession, hasRoleAtLeast } from '@/lib/adminAuth';
import SignOutButton from './SignOutButton';
import '../admin.css';

export const dynamic = 'force-dynamic';

const ROLE_LABEL = {
  developer: '👑 Developer',
  owner: 'Owner',
  admin: 'Admin',
};

export default async function AdminPanelLayout({ children }) {
  const session = await getAdminSession();
  if (!session) redirect('/admin/login');

  const { profile } = session;
  const canManageUsers = hasRoleAtLeast(profile, 'owner');

  return (
    <div className="admin-root">
      <div className="admin-shell">
        <aside className="admin-sidebar">
          <div className="admin-brand">
            <div className="name">Lucky Sushi</div>
            <div className="tag">Admin Panel</div>
          </div>
          <div className="admin-user">
            <div className="email">{profile.display_name || profile.email}</div>
            <span className={`role-badge role-${profile.role}`}>
              {ROLE_LABEL[profile.role]}
            </span>
          </div>
          <nav className="admin-nav">
            <Link href="/admin">Dashboard</Link>
            <Link href="/admin/menu">Menu items</Link>
            {canManageUsers ? <Link href="/admin/users">Users &amp; roles</Link> : null}
            <Link href="/admin/settings">Account &amp; password</Link>
            <Link href="/tr" target="_blank">View website ↗</Link>
          </nav>
          <div className="foot">
            <SignOutButton />
          </div>
        </aside>
        <main className="admin-main">{children}</main>
      </div>
    </div>
  );
}
