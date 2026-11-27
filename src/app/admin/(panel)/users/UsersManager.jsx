'use client';

import { useCallback, useEffect, useState } from 'react';
import { LuRefreshCw, LuTrash2, LuTriangleAlert, LuUserPlus } from 'react-icons/lu';
import { prettyRole } from '../../format';
import { ConfirmDialog, Flash, Modal, PasswordInput, adminFetch, useFlash } from '../../ui';

const ALL_ROLES = ['developer', 'owner', 'admin'];
const EMPTY_FORM = { email: '', password: '', display_name: '', role: 'admin' };

function formatDate(value) {
  if (!value) return '—';
  return new Date(value).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export default function UsersManager({ me }) {
  const isDeveloper = me.role === 'developer';
  const creatableRoles = isDeveloper ? ALL_ROLES : ['admin'];

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [pending, setPending] = useState(() => new Set());
  const [creating, setCreating] = useState(false); // dialog open
  const [form, setForm] = useState(EMPTY_FORM);
  const [formError, setFormError] = useState('');
  const [saving, setSaving] = useState(false);
  const [toDelete, setToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const { flash, show: showFlash, dismiss } = useFlash();

  const load = useCallback(async () => {
    setLoading(true);
    setLoadError('');
    try {
      const data = await adminFetch('/api/admin/users');
      setUsers(data.users ?? []);
    } catch (err) {
      setLoadError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  function setPendingId(id, on) {
    setPending((prev) => {
      const next = new Set(prev);
      if (on) next.add(id);
      else next.delete(id);
      return next;
    });
  }

  /** PATCH one account and update just that row (no full-table reload). */
  async function patchUser(user, changes, okMessage) {
    setPendingId(user.id, true);
    try {
      const data = await adminFetch('/api/admin/users', {
        method: 'PATCH',
        body: { id: user.id, ...changes },
      });
      setUsers((prev) => prev.map((u) => (u.id === user.id ? data.user : u)));
      showFlash(okMessage);
    } catch (err) {
      showFlash(err.message, 'error');
    } finally {
      setPendingId(user.id, false);
    }
  }

  async function createUser(event) {
    event.preventDefault();
    if (saving) return;
    setFormError('');
    if (form.password.length < 8) {
      setFormError('The password must be at least 8 characters.');
      return;
    }
    setSaving(true);
    try {
      const data = await adminFetch('/api/admin/users', { method: 'POST', body: form });
      setUsers((prev) => [...prev, data.user]);
      showFlash(`Account created for ${data.user.email}.`);
      setCreating(false);
      setForm(EMPTY_FORM);
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function confirmDelete() {
    if (!toDelete) return;
    setDeleting(true);
    try {
      await adminFetch('/api/admin/users', { method: 'DELETE', body: { id: toDelete.id } });
      setUsers((prev) => prev.filter((u) => u.id !== toDelete.id));
      showFlash(`Deleted ${toDelete.email}.`);
      setToDelete(null);
    } catch (err) {
      showFlash(err.message, 'error');
    } finally {
      setDeleting(false);
    }
  }

  function canManage(target) {
    if (target.id === me.id) return false;
    if (isDeveloper) return true;
    return target.role === 'admin'; // owners manage admins only
  }

  return (
    <>
      <header className="page-head">
        <h1>Users &amp; roles</h1>
        <p className="lede">
          {isDeveloper
            ? 'As developer you can add owners and admins, change any role, deactivate or delete accounts.'
            : 'As owner you can add admin accounts and manage them. Only a developer can add or change owners.'}
        </p>
      </header>

      <div className="admin-toolbar">
        <button
          type="button"
          className="btn"
          onClick={() => {
            setFormError('');
            setCreating(true);
          }}
        >
          <LuUserPlus aria-hidden="true" /> Add account
        </button>
      </div>

      {loadError ? (
        <div className="admin-error" role="alert">
          <LuTriangleAlert aria-hidden="true" />
          <div style={{ flex: 1 }}>{loadError}</div>
          <button type="button" className="btn small secondary" onClick={load}>
            <LuRefreshCw aria-hidden="true" /> Retry
          </button>
        </div>
      ) : null}

      <div className="admin-list">
        <div className="list-head user-cols" aria-hidden="true">
          <span>Account</span>
          <span>Role</span>
          <span>Active</span>
          <span>Since</span>
          <span />
        </div>

        {loading
          ? [0, 1, 2].map((i) => (
              <div key={i} className="sk-row">
                <div style={{ flex: 1 }}>
                  <div className="skeleton" style={{ height: 14, width: '40%', marginBottom: 8 }} />
                  <div className="skeleton" style={{ height: 11, width: '55%' }} />
                </div>
              </div>
            ))
          : null}

        {users.map((user) => {
          const manageable = canManage(user);
          const isSelf = user.id === me.id;
          const busy = pending.has(user.id);
          return (
            <div key={user.id} className="mrow user-cols">
              <div className="c-main">
                <div className="item-name">{user.display_name || user.email}</div>
                <div className="item-sub">
                  {user.display_name ? `${user.email}` : ''}
                  {isSelf ? `${user.display_name ? ' · ' : ''}you` : ''}
                </div>
              </div>

              <div className="c-role">
                {manageable ? (
                  <select
                    value={user.role}
                    disabled={busy}
                    aria-label={`Role for ${user.email}`}
                    onChange={(e) =>
                      patchUser(user, { role: e.target.value }, `Role updated for ${user.email}.`)
                    }
                  >
                    {(isDeveloper ? ALL_ROLES : ['admin']).map((r) => (
                      <option key={r} value={r}>
                        {prettyRole(r)}
                      </option>
                    ))}
                  </select>
                ) : (
                  <span className={`role-badge role-${user.role}`}>{prettyRole(user.role)}</span>
                )}
              </div>

              <div className="c-active">
                {manageable ? (
                  <label className="switch" title={user.is_active ? 'Active' : 'Deactivated'}>
                    <input
                      type="checkbox"
                      checked={user.is_active}
                      disabled={busy}
                      aria-label={`${user.email} is active`}
                      onChange={(e) =>
                        patchUser(
                          user,
                          { is_active: e.target.checked },
                          `${user.email} ${e.target.checked ? 'activated' : 'deactivated'}.`
                        )
                      }
                    />
                    <span className="track" />
                  </label>
                ) : (
                  <span className={`pill ${user.is_active ? 'on' : 'off'}`}>
                    {user.is_active ? 'Active' : 'Off'}
                  </span>
                )}
              </div>

              <div className="c-since muted">{formatDate(user.created_at)}</div>

              <div className="c-act">
                {isDeveloper && !isSelf ? (
                  <button
                    type="button"
                    className="btn danger-ghost small"
                    onClick={() => setToDelete(user)}
                    aria-label={`Delete ${user.email}`}
                  >
                    <LuTrash2 aria-hidden="true" /> Delete
                  </button>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>

      {creating ? (
        <Modal title="Add a panel account" onClose={() => (saving ? undefined : setCreating(false))}>
          <form onSubmit={createUser}>
            <div className="modal-body">
              {formError ? (
                <div className="admin-error" role="alert">
                  <LuTriangleAlert aria-hidden="true" />
                  <div>{formError}</div>
                </div>
              ) : null}
              <label className="field">
                <span className="lbl">Email</span>
                <input
                  type="email"
                  required
                  autoComplete="off"
                  autoCapitalize="none"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="person@example.com"
                />
              </label>
              <label className="field">
                <span className="lbl">Password (min. 8 characters)</span>
                <PasswordInput
                  value={form.password}
                  minLength={8}
                  autoComplete="new-password"
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
              </label>
              <label className="field">
                <span className="lbl">Display name</span>
                <input
                  type="text"
                  value={form.display_name}
                  onChange={(e) => setForm({ ...form, display_name: e.target.value })}
                  placeholder="e.g. Restaurant Manager"
                />
              </label>
              <label className="field" style={{ marginBottom: 0 }}>
                <span className="lbl">Role</span>
                <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
                  {creatableRoles.map((r) => (
                    <option key={r} value={r}>
                      {prettyRole(r)}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="modal-actions">
              <button type="button" className="btn secondary" onClick={() => setCreating(false)} disabled={saving}>
                Cancel
              </button>
              <button type="submit" className="btn" disabled={saving}>
                {saving ? 'Creating…' : 'Create account'}
              </button>
            </div>
          </form>
        </Modal>
      ) : null}

      {toDelete ? (
        <ConfirmDialog
          title="Delete this account?"
          message={`${toDelete.email} will lose access immediately and the account will be removed permanently.`}
          confirmLabel="Delete account"
          danger
          busy={deleting}
          onConfirm={confirmDelete}
          onCancel={() => setToDelete(null)}
        />
      ) : null}

      <Flash flash={flash} onClose={dismiss} />
    </>
  );
}
