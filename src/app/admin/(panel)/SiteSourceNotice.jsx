import { LuInfo } from 'react-icons/lu';

/**
 * Honest note about where the public website gets its menu from.
 * The panel saves to the `menu_items` table, but the website components
 * still import the static `src/data/menuData.js` file, so edits made here
 * do not appear on the site yet.
 */
export default function SiteSourceNotice() {
  return (
    <div className="admin-warn" role="note">
      <LuInfo aria-hidden="true" />
      <div>
        <b>Heads-up:</b> the public website currently renders its built-in menu
        file, not this database. Changes saved here are stored safely, but they
        will only appear on the website once the site is switched to read the
        database menu.
      </div>
    </div>
  );
}
