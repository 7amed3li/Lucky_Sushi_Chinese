import { redirect } from 'next/navigation';
import { getAdminSession, hasRoleAtLeast } from '@/lib/adminAuth';
import UsersManager from './UsersManager';

export const metadata = { title: 'Users & roles' };
export const dynamic = 'force-dynamic';

export default async function AdminUsersPage() {
  const session = await getAdminSession();
  if (!hasRoleAtLeast(session?.profile, 'owner')) redirect('/admin');

  return (
    <UsersManager
      me={{ id: session.profile.id, role: session.profile.role }}
    />
  );
}
