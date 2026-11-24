'use client';

import { useEffect, useMemo, useState } from 'react';

const EMPTY_ITEM = {
  id: '',
  name_tr: '',
  name_en: '',
  name_ar: '',
  name_zh: '',
  description_tr: '',
  description_en: '',
  description_ar: '',
  description_zh: '',
  ingredients: '',
  portion_or_pieces: '',
  price: '',
  currency: 'TL',
  category: '',
  tags: '',
  allergens: '',
  image: '',
  availability: true,
};

function toForm(item) {
  if (!item) return { ...EMPTY_ITEM };
  return {
    ...EMPTY_ITEM,
    ...item,
    price: item.price ?? '',
    ingredients: (item.ingredients ?? []).join(', '),
    tags: (item.tags ?? []).join(', '),
    allergens: (item.allergens ?? []).join(', '),
  };
}

export default function MenuManager({ canDelete }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [editing, setEditing] = useState(null); // null | {isNew, form}
  const [busy, setBusy] = useState(false);

  async function load() {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/menu');
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to load menu.');
      setItems(data.items ?? []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const categories = useMemo(
    () => [...new Set(items.map((i) => i.category).filter(Boolean))].sort(),
    [items]
  );

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    return items.filter((item) => {
      if (category !== 'all' && item.category !== category) return false;
      if (!q) return true;
      return [item.id, item.name_en, item.name_tr, item.name_ar, item.name_zh]
        .filter(Boolean)
        .some((v) => v.toLowerCase().includes(q));
    });
  }, [items, search, category]);

  async function toggleAvailability(item) {
    setError('');
    const res = await fetch('/api/admin/menu', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: item.id, availability: !item.availability }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || 'Update failed.');
      return;
    }
    setItems((prev) => prev.map((i) => (i.id === item.id ? data.item : i)));
  }

  async function remove(item) {
    if (!window.confirm(`Delete "${item.name_en || item.id}" permanently?`)) return;
    setError('');
    const res = await fetch('/api/admin/menu', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: item.id }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || 'Delete failed.');
      return;
    }
    setItems((prev) => prev.filter((i) => i.id !== item.id));
    setNotice(`Deleted ${item.id}.`);
  }

  async function save(event) {
    event.preventDefault();
    setBusy(true);
    setError('');
    const form = editing.form;
    const payload = { ...form, price: Number(form.price) };
    try {
      const res = await fetch('/api/admin/menu', {
        method: editing.isNew ? 'POST' : 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Save failed.');
      setItems((prev) => {
        const rest = prev.filter((i) => i.id !== data.item.id);
        return [...rest, data.item].sort(
          (a, b) =>
            String(a.category).localeCompare(String(b.category)) ||
            Number(a.price) - Number(b.price)
        );
      });
      setNotice(editing.isNew ? `Added ${data.item.id}.` : `Saved ${data.item.id}.`);
      setEditing(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  function setField(name, value) {
    setEditing((prev) => ({ ...prev, form: { ...prev.form, [name]: value } }));
  }

  return (
    <>
      <h1>Menu items</h1>
      <p className="lede">
        {items.length} items in the database. Changes here are live on the
        website.
      </p>

      {error ? <div className="admin-error">{error}</div> : null}
      {notice ? <div className="admin-ok">{notice}</div> : null}

      <div className="admin-toolbar">
        <div className="grow">
          <input
            type="text"
            placeholder="Search by name or id…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ width: 'auto', minWidth: 170 }}
        >
          <option value="all">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <button
          className="btn"
          onClick={() => setEditing({ isNew: true, form: { ...EMPTY_ITEM } })}
        >
          + Add item
        </button>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th></th>
              <th>Item</th>
              <th>Category</th>
              <th>Price</th>
              <th>On site</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6}>Loading…</td>
              </tr>
            ) : visible.length === 0 ? (
              <tr>
                <td colSpan={6}>No items match.</td>
              </tr>
            ) : (
              visible.map((item) => (
                <tr key={item.id}>
                  <td>
                    {item.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img className="thumb" src={item.image} alt="" loading="lazy" />
                    ) : null}
                  </td>
                  <td>
                    <b>{item.name_en || item.name_tr || item.id}</b>
                    <div className="muted">
                      {item.id}
                      {item.name_tr && item.name_en ? ` · ${item.name_tr}` : ''}
                    </div>
                  </td>
                  <td>{item.category}</td>
                  <td>
                    {item.price} {item.currency || 'TL'}
                  </td>
                  <td>
                    <label className="switch" title="Show on website">
                      <input
                        type="checkbox"
                        checked={Boolean(item.availability)}
                        onChange={() => toggleAvailability(item)}
                      />
                      <span className="track" />
                    </label>
                  </td>
                  <td>
                    <div className="row-actions">
                      <button
                        className="btn secondary small"
                        onClick={() =>
                          setEditing({ isNew: false, form: toForm(item) })
                        }
                      >
                        Edit
                      </button>
                      {canDelete ? (
                        <button
                          className="btn danger small"
                          onClick={() => remove(item)}
                        >
                          Delete
                        </button>
                      ) : null}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {editing ? (
        <div className="modal-backdrop" onClick={() => setEditing(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h2>{editing.isNew ? 'Add menu item' : `Edit ${editing.form.id}`}</h2>
            <form onSubmit={save}>
              <div className="form-grid">
                <div className="field">
                  <label>Item id (URL slug)</label>
                  <input
                    type="text"
                    required
                    disabled={!editing.isNew}
                    value={editing.form.id}
                    onChange={(e) => setField('id', e.target.value)}
                    placeholder="set-canada"
                  />
                </div>
                <div className="field">
                  <label>Category</label>
                  <input
                    type="text"
                    required
                    list="menu-categories"
                    value={editing.form.category ?? ''}
                    onChange={(e) => setField('category', e.target.value)}
                    placeholder="sushi-sets"
                  />
                  <datalist id="menu-categories">
                    {categories.map((c) => (
                      <option key={c} value={c} />
                    ))}
                  </datalist>
                </div>
                <div className="field">
                  <label>Price</label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    value={editing.form.price}
                    onChange={(e) => setField('price', e.target.value)}
                  />
                </div>
                <div className="field">
                  <label>Portion / pieces</label>
                  <input
                    type="text"
                    value={editing.form.portion_or_pieces ?? ''}
                    onChange={(e) => setField('portion_or_pieces', e.target.value)}
                    placeholder="32 pcs"
                  />
                </div>
              </div>

              <div className="form-grid">
                <div className="field">
                  <label>Name (Türkçe)</label>
                  <input type="text" value={editing.form.name_tr ?? ''} onChange={(e) => setField('name_tr', e.target.value)} />
                </div>
                <div className="field">
                  <label>Name (English)</label>
                  <input type="text" value={editing.form.name_en ?? ''} onChange={(e) => setField('name_en', e.target.value)} />
                </div>
                <div className="field">
                  <label>Name (العربية)</label>
                  <input type="text" value={editing.form.name_ar ?? ''} onChange={(e) => setField('name_ar', e.target.value)} />
                </div>
                <div className="field">
                  <label>Name (中文)</label>
                  <input type="text" value={editing.form.name_zh ?? ''} onChange={(e) => setField('name_zh', e.target.value)} />
                </div>
              </div>

              <div className="field">
                <label>Description (English)</label>
                <textarea value={editing.form.description_en ?? ''} onChange={(e) => setField('description_en', e.target.value)} />
              </div>
              <div className="form-grid">
                <div className="field">
                  <label>Description (Türkçe)</label>
                  <textarea value={editing.form.description_tr ?? ''} onChange={(e) => setField('description_tr', e.target.value)} />
                </div>
                <div className="field">
                  <label>Description (العربية)</label>
                  <textarea value={editing.form.description_ar ?? ''} onChange={(e) => setField('description_ar', e.target.value)} />
                </div>
              </div>
              <div className="field">
                <label>Description (中文)</label>
                <textarea value={editing.form.description_zh ?? ''} onChange={(e) => setField('description_zh', e.target.value)} />
              </div>

              <div className="form-grid">
                <div className="field">
                  <label>Ingredients (comma separated)</label>
                  <input type="text" value={editing.form.ingredients} onChange={(e) => setField('ingredients', e.target.value)} />
                </div>
                <div className="field">
                  <label>Tags (comma separated)</label>
                  <input type="text" value={editing.form.tags} onChange={(e) => setField('tags', e.target.value)} />
                </div>
                <div className="field">
                  <label>Allergens (comma separated)</label>
                  <input type="text" value={editing.form.allergens} onChange={(e) => setField('allergens', e.target.value)} />
                </div>
                <div className="field">
                  <label>Image path</label>
                  <input type="text" value={editing.form.image ?? ''} onChange={(e) => setField('image', e.target.value)} placeholder="/images/canada-set.webp" />
                </div>
              </div>

              <div className="field">
                <label style={{ display: 'flex', gap: 8, alignItems: 'center', fontWeight: 600 }}>
                  <input
                    type="checkbox"
                    checked={Boolean(editing.form.availability)}
                    onChange={(e) => setField('availability', e.target.checked)}
                    style={{ width: 'auto' }}
                  />
                  Available on the website
                </label>
              </div>

              <div className="modal-actions">
                <button type="button" className="btn secondary" onClick={() => setEditing(null)}>
                  Cancel
                </button>
                <button type="submit" className="btn" disabled={busy}>
                  {busy ? 'Saving…' : 'Save item'}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
