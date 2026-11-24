'use client';

import { useEffect, useState } from 'react';

const ALL_ROLES = ['developer', 'owner', 'admin'];

export default function UsersManager({ me }) {
  const isDeveloper = me.role === 'developer';
  const creatableRoles = isDeveloper ? ALL_ROLES : ['admin'];

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [form, setForm] = useState({
    email: '',
    password: '',
    display_name: '',
    role: 'admin',
  });
  const [busy, setBusy] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/users');
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to load users.');
      setUsers(data.users ?? []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function callApi(method, payload, okMessage) {
    setError('');
    setNotice('');
    const res = await fetch('/api/admin/users', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || 'Action failed.');
      return false;
    }
    if (okMessage) setNotice(okMessage);
    await load();
    return true;
  }

  async function addUser(event) {
    event.preventDefault();
    setBusy(true);
    const ok = await callApi('POST', form, `Account created for ${form.email}.`);
    setBusy(false);
    if (ok) {
      setForm({ email: '', password: '', display_name: '', role: 'admin' });
    }
  }

  function canManage(target) {
    if (target.id === me.id) return false;
    if (isDeveloper) return true;
    // Owners manage admins only.
    return target.role === 'admin';
  }

  function roleOptionsFor(target) {
    if (isDeveloper) return ALL_ROLES;
    return ['admin'];
  }

  return (
    <>
      <h1>Users &amp; roles</h1>
      <p className="lede">
        {isDeveloper
          ? 'As developer you can add owners and admins, change any role, deactivate or delete accounts.'
          : 'As owner you can add admin accounts and manage them. Only a developer can add or change owners.'}
      </p>

      {error ? <div className="admin-error">{error}</div> : null}
      {notice ? <div className="admin-ok">{notice}</div> : null}

      <div className="panel-card">
        <h2>Add a panel account</h2>
        <form onSubmit={addUser}>
          <div className="form-grid">
            <div className="field">
              <label>Email</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="person@example.com"
              />
            </div>
            <div className="field">
              <label>Password (min. 8 characters)</label>
              <input
                type="password"
                required
                minLength={8}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>
            <div className="field">
              <label>Display name</label>
              <input
                type="text"
                value={form.display_name}
                onChange={(e) => setForm({ ...form, display_name: e.target.value })}
                placeholder="e.g. Restaurant Manager"
              />
            </div>
            <div className="field">
              <label>Role</label>
              <select
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              >
                {creatableRoles.map((r) => (
                  <option key={r} value={r}>
                    {r === 'developer' ? '👑 Developer' : r === 'owner' ? 'Owner' : 'Admin'}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button className="btn" type="submit" disabled={busy}>
            {busy ? 'Creating…' : 'Create account'}
          </button>
        </form>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Account</th>
              <th>Role</th>
              <th>Active</th>
              <th>Since</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5}>Loading…</td>
              </tr>
            ) : (
              users.map((user) => {
                const manageable = canManage(user);
                const isSelf = user.id === me.id;
                return (
                  <tr key={user.id}>
                    <td>
                      <b>{user.display_name || user.email}</b>
                      <div className="muted">
                        {user.email}
                        {isSelf ? ' · (you)' : ''}
                      </div>
                    </td>
                    <td>
                      {manageable ? (
                        <select
                          value={user.role}
                          style={{ width: 'auto' }}
                          onChange={(e) =>
                            callApi(
                              'PATCH',
                              { id: user.id, role: e.target.value },
                              `Role updated for ${user.email}.`
                            )
                          }
                        >
                          {roleOptionsFor(user).map((r) => (
                            <option key={r} value={r}>
                              {r}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <span className={`role-badge role-${user.role}`}>{user.role}</span>
                      )}
                    </td>
                    <td>
                      {manageable || isDeveloper ? (
                        <label className="switch">
                          <input
                            type="checkbox"
                            checked={user.is_active}
                            disabled={isSelf}
                            onChange={(e) =>
                              callApi(
                                'PATCH',
                                { id: user.id, is_active: e.target.checked },
                                `${user.email} ${e.target.checked ? 'activated' : 'deactivated'}.`
                              )
                            }
                          />
                          <span className="track" />
                        </label>
                      ) : (
                        <span className={`pill ${user.is_active ? 'on' : 'off'}`}>
                          {user.is_active ? 'active' : 'off'}
                        </span>
                      )}
                    </td>
                    <td className="muted">
                      {user.created_at
                        ? new Date(user.created_at).toLocaleDateString()
                        : '—'}
                    </td>
                    <td>
                      {isDeveloper && !isSelf ? (
                        <button
                          className="btn danger small"
                          onClick={() => {
                            if (
                              window.confirm(
                                `Delete the account ${user.email} permanently?`
                              )
                            ) {
                              callApi('DELETE', { id: user.id }, `Deleted ${user.email}.`);
                            }
                          }}
                        >
                          Delete
                        </button>
                      ) : null}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
