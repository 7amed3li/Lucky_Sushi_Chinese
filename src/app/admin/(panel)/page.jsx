import { getAdminSession } from '@/lib/adminAuth';
import { createSupabaseAdminClient } from '@/lib/supabase/admin';

export const metadata = { title: 'Admin Dashboard | Lucky Sushi' };
export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const session = await getAdminSession();
  const profile = session?.profile;

  const admin = createSupabaseAdminClient();
  let stats = null;
  if (admin) {
    const [menuCount, availableCount, profilesRes] = await Promise.all([
      admin.from('menu_items').select('id', { count: 'exact', head: true }),
      admin
        .from('menu_items')
        .select('id', { count: 'exact', head: true })
        .eq('availability', true),
      admin.from('profiles').select('role, is_active'),
    ]);
    const byRole = { developer: 0, owner: 0, admin: 0 };
    for (const row of profilesRes.data ?? []) {
      if (row.is_active && byRole[row.role] !== undefined) byRole[row.role] += 1;
    }
    stats = {
      menuTotal: menuCount.count ?? 0,
      menuAvailable: availableCount.count ?? 0,
      usersTotal: (profilesRes.data ?? []).length,
      byRole,
    };
  }

  return (
    <>
      <h1>Dashboard</h1>
      <p className="lede">
        Welcome{profile?.display_name ? `, ${profile.display_name}` : ''}. You are
        signed in as <b>{profile?.role}</b>.
      </p>

      {!admin ? (
        <div className="admin-warn">
          <b>Setup incomplete:</b> SUPABASE_SERVICE_ROLE_KEY is not set, so the
          panel cannot read or write the database yet. Add it to the server
          environment (see ADMIN_PANEL.md), then reload this page.
        </div>
      ) : null}

      {stats ? (
        <div className="stat-grid">
          <div className="stat-card">
            <div className="num">{stats.menuTotal}</div>
            <div className="lbl">Menu items in database</div>
          </div>
          <div className="stat-card">
            <div className="num">{stats.menuAvailable}</div>
            <div className="lbl">Available on the website</div>
          </div>
          <div className="stat-card">
            <div className="num">{stats.usersTotal}</div>
            <div className="lbl">Panel accounts</div>
          </div>
          <div className="stat-card">
            <div className="num">{stats.byRole.developer}</div>
            <div className="lbl">Active developers</div>
          </div>
        </div>
      ) : null}

      <div className="panel-card">
        <h2>Role hierarchy</h2>
        <div className="hierarchy">
          <div className="step">
            <b>👑 Developer</b>
            <span>Top level — adds owners &amp; admins, changes any role, full menu control</span>
          </div>
          <span className="arrow">→</span>
          <div className="step">
            <b>Owner</b>
            <span>Adds &amp; manages admin accounts, full menu control</span>
          </div>
          <span className="arrow">→</span>
          <div className="step">
            <b>Admin</b>
            <span>Menu control only (add / edit / price / availability)</span>
          </div>
        </div>
      </div>

      <div className="panel-card">
        <h2>How the menu works</h2>
        <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6 }}>
          The website reads its menu from the PostgreSQL database (Supabase
          table <code>menu_items</code>). Anything you change here — prices,
          names, availability — is what the website shows. If the database is
          ever unreachable, the website automatically falls back to its
          built-in static menu, so it never goes down.
        </p>
      </div>
    </>
  );
}
