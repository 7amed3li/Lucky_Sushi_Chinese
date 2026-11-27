import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getAdminAuthState, hasRoleAtLeast } from '@/lib/adminAuth';
import { prettyRole } from '../format';
import AdminNav from './AdminNav';
import SignOutButton from './SignOutButton';

export const dynamic = 'force-dynamic';

function initials(profile) {
  const source = (profile.display_name || profile.email || '?').trim();
  const parts = source.split(/[\s@._-]+/).filter(Boolean);
  return ((parts[0]?.[0] ?? '?') + (parts[1]?.[0] ?? '')).toUpperCase();
}

export default async function AdminPanelLayout({ children }) {
  const state = await getAdminAuthState();
  if (state.status !== 'ok') redirect('/admin/login');

  const { profile } = state;
  const canManageUsers = hasRoleAtLeast(profile, 'owner');

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <Link href="/admin" className="admin-brand" aria-label="Lucky Sushi admin — dashboard">
          <Image src="/logo-icon.webp" alt="" width={40} height={40} priority />
          <span className="txt">
            <span className="name">Lucky Sushi</span>
            <span className="tag">Admin</span>
          </span>
        </Link>

        <div className="admin-user">
          <div className="avatar" aria-hidden="true">{initials(profile)}</div>
          <div className="who">
            <div className="nm">{profile.display_name || profile.email}</div>
            <div className="em">{profile.display_name ? profile.email : ' '}</div>
            <span className={`role-badge role-${profile.role}`}>{prettyRole(profile.role)}</span>
          </div>
        </div>

        <AdminNav canManageUsers={canManageUsers} />

        <div className="foot">
          <SignOutButton />
        </div>
      </aside>
      <main className="admin-main" id="admin-main">{children}</main>
    </div>
  );
}
