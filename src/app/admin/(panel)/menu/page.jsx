import { getAdminSession, hasRoleAtLeast } from '@/lib/adminAuth';
import MenuManager from './MenuManager';

export const metadata = { title: 'Menu Items | Lucky Sushi Admin' };
export const dynamic = 'force-dynamic';

export default async function AdminMenuPage() {
  const session = await getAdminSession();
  const canDelete = hasRoleAtLeast(session?.profile, 'owner');
  return <MenuManager canDelete={canDelete} />;
}
