import Link from 'next/link';
import { LuEyeOff, LuKeyRound, LuTriangleAlert, LuUsers, LuUtensilsCrossed } from 'react-icons/lu';
import { getAdminAuthState, hasRoleAtLeast } from '@/lib/adminAuth';
import { createSupabaseAdminClient } from '@/lib/supabase/admin';
import { prettyRole } from '../format';
import SiteSourceNotice from './SiteSourceNotice';

export const metadata = { title: 'Dashboard' };
export const dynamic = 'force-dynamic';

async function loadStats(admin, includeUsers) {
  const [total, available, profiles] = await Promise.all([
    admin.from('menu_items').select('id', { count: 'exact', head: true }),
    admin.from('menu_items').select('id', { count: 'exact', head: true }).eq('availability', true),
    includeUsers
      ? admin.from('profiles').select('id', { count: 'exact', head: true })
      : Promise.resolve({ count: null, error: null }),
  ]);

  const firstError = total.error || available.error || profiles.error;
  if (firstError) return { error: firstError.message };

  const menuTotal = total.count ?? 0;
  const menuAvailable = available.count ?? 0;
  return {
    menuTotal,
    menuAvailable,
    menuHidden: Math.max(menuTotal - menuAvailable, 0),
    usersTotal: includeUsers ? profiles.count ?? 0 : null,
  };
}

export default async function AdminDashboardPage() {
  const state = await getAdminAuthState();
  const profile = state.status === 'ok' ? state.profile : null;
  const canManageUsers = hasRoleAtLeast(profile, 'owner');

  const admin = createSupabaseAdminClient();
  const stats = admin ? await loadStats(admin, canManageUsers) : null;

  return (
    <>
      <header className="page-head">
        <h1>Dashboard</h1>
        <p className="lede">
          Welcome back{profile?.display_name ? `, ${profile.display_name}` : ''}. You are signed
          in as{' '}
          <span className={`role-badge role-${profile?.role}`}>{prettyRole(profile?.role)}</span>.
        </p>
      </header>

      {!admin ? (
        <div className="admin-warn">
          <LuTriangleAlert aria-hidden="true" />
          <div>
            <b>Setup incomplete:</b> <code>SUPABASE_SERVICE_ROLE_KEY</code> is not set, so the panel
            cannot read or write the database yet. Add it to the server environment (see
            ADMIN_PANEL.md), then reload this page.
          </div>
        </div>
      ) : null}

      {stats?.error ? (
        <div className="admin-error">
          <LuTriangleAlert aria-hidden="true" />
          <div>Could not read the database: {stats.error}</div>
        </div>
      ) : null}

      {stats && !stats.error ? (
        <section className="stat-grid" aria-label="Overview">
          <div className="stat-card">
            <div className="ico"><LuUtensilsCrossed aria-hidden="true" /></div>
            <div>
              <div className="num">{stats.menuTotal}</div>
              <div className="lbl">Menu items</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="ico"><LuUtensilsCrossed aria-hidden="true" /></div>
            <div>
              <div className="num">{stats.menuAvailable}</div>
              <div className="lbl">Visible items</div>
            </div>
          </div>
          <div className="stat-card warn">
            <div className="ico"><LuEyeOff aria-hidden="true" /></div>
            <div>
              <div className="num">{stats.menuHidden}</div>
              <div className="lbl">Hidden items</div>
            </div>
          </div>
          {stats.usersTotal !== null ? (
            <div className="stat-card">
              <div className="ico"><LuUsers aria-hidden="true" /></div>
              <div>
                <div className="num">{stats.usersTotal}</div>
                <div className="lbl">Panel accounts</div>
              </div>
            </div>
          ) : null}
        </section>
      ) : null}

      <section className="quick-grid" aria-label="Quick actions">
        <Link href="/admin/menu" className="quick-card">
          <span className="ico"><LuUtensilsCrossed aria-hidden="true" /></span>
          <span>
            <b>Manage menu</b>
            <span className="sub">Prices, names, photos, availability</span>
          </span>
        </Link>
        {canManageUsers ? (
          <Link href="/admin/users" className="quick-card">
            <span className="ico"><LuUsers aria-hidden="true" /></span>
            <span>
              <b>Users &amp; roles</b>
              <span className="sub">Add and manage panel accounts</span>
            </span>
          </Link>
        ) : null}
        <Link href="/admin/settings" className="quick-card">
          <span className="ico"><LuKeyRound aria-hidden="true" /></span>
          <span>
            <b>Account</b>
            <span className="sub">Change your password</span>
          </span>
        </Link>
      </section>

      <SiteSourceNotice />

      <section className="panel-card">
        <h2>Role hierarchy</h2>
        <div className="hierarchy">
          <div className="step">
            <b>Developer</b>
            <span>Top level — adds owners &amp; admins, changes any role, full menu control</span>
          </div>
          <span className="arrow" aria-hidden="true">→</span>
          <div className="step">
            <b>Owner</b>
            <span>Adds &amp; manages admin accounts, full menu control</span>
          </div>
          <span className="arrow" aria-hidden="true">→</span>
          <div className="step">
            <b>Admin</b>
            <span>Menu control only (add / edit / price / availability)</span>
          </div>
        </div>
      </section>
    </>
  );
}
