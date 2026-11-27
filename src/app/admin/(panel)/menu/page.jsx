import { getAdminSession, hasRoleAtLeast } from '@/lib/adminAuth';
import MenuManager from './MenuManager';
import SiteSourceNotice from '../SiteSourceNotice';

export const metadata = { title: 'Menu items' };
export const dynamic = 'force-dynamic';

export default async function AdminMenuPage() {
  const session = await getAdminSession();
  const canDelete = hasRoleAtLeast(session?.profile, 'owner');
  return (
    <>
      <SiteSourceNotice />
      <MenuManager canDelete={canDelete} />
    </>
  );
}
