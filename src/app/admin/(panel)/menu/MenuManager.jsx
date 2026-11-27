'use client';

import { useCallback, useDeferredValue, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import {
  LuImageOff,
  LuPencil,
  LuPlus,
  LuRefreshCw,
  LuSearch,
  LuTrash2,
  LuTriangleAlert,
} from 'react-icons/lu';
import { prettyCategory } from '../../format';
import { ConfirmDialog, Flash, Modal, adminFetch, useFlash } from '../../ui';

const PAGE_SIZE = 40;
const ID_PATTERN = /^[a-z0-9][a-z0-9_-]{1,79}$/;

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
  const form = { ...EMPTY_ITEM };
  for (const key of Object.keys(EMPTY_ITEM)) {
    if (item[key] !== undefined && item[key] !== null) form[key] = item[key];
  }
  form.price = item.price ?? '';
  form.ingredients = (item.ingredients ?? []).join(', ');
  form.tags = (item.tags ?? []).join(', ');
  form.allergens = (item.allergens ?? []).join(', ');
  return form;
}

const itemLabel = (item) => item.name_en || item.name_tr || item.id;

function formatPrice(item) {
  const n = Number(item.price);
  const shown = Number.isFinite(n) ? n.toLocaleString('tr-TR') : item.price;
  return `${shown} ${item.currency || 'TL'}`;
}

function sortItems(list) {
  return [...list].sort(
    (a, b) =>
      String(a.category).localeCompare(String(b.category)) ||
      Number(a.price) - Number(b.price)
  );
}

function Thumb({ src }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) {
    return (
      <span className="thumb thumb-empty" aria-hidden="true">
        <LuImageOff />
      </span>
    );
  }
  if (src.startsWith('/')) {
    return (
      <Image
        className="thumb"
        src={src}
        alt=""
        width={52}
        height={52}
        sizes="52px"
        onError={() => setFailed(true)}
      />
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className="thumb"
      src={src}
      alt=""
      width={52}
      height={52}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}

function TextField({ label, hint, children }) {
  return (
    <label className="field">
      <span className="lbl">{label}</span>
      {children}
      {hint ? <span className="hint">{hint}</span> : null}
    </label>
  );
}

export default function MenuManager({ canDelete }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [shown, setShown] = useState(PAGE_SIZE);
  const [editing, setEditing] = useState(null); // null | { isNew, form }
  const [formError, setFormError] = useState('');
  const [saving, setSaving] = useState(false);
  const [pending, setPending] = useState(() => new Set());
  const [toDelete, setToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const { flash, show: showFlash, dismiss } = useFlash();

  const deferredSearch = useDeferredValue(search);

  const load = useCallback(async () => {
    setLoading(true);
    setLoadError('');
    try {
      const data = await adminFetch('/api/admin/menu');
      setItems(data.items ?? []);
    } catch (err) {
      setLoadError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const categoryCounts = useMemo(() => {
    const counts = new Map();
    for (const item of items) {
      if (item.category) counts.set(item.category, (counts.get(item.category) ?? 0) + 1);
    }
    return [...counts.entries()].sort(([a], [b]) => a.localeCompare(b));
  }, [items]);

  const visible = useMemo(() => {
    const q = deferredSearch.trim().toLowerCase();
    return items.filter((item) => {
      if (category !== 'all' && item.category !== category) return false;
      if (!q) return true;
      return [item.id, item.name_en, item.name_tr, item.name_ar, item.name_zh]
        .filter(Boolean)
        .some((v) => v.toLowerCase().includes(q));
    });
  }, [items, deferredSearch, category]);

  const page = visible.slice(0, shown);

  function setPendingId(id, on) {
    setPending((prev) => {
      const next = new Set(prev);
      if (on) next.add(id);
      else next.delete(id);
      return next;
    });
  }

  async function toggleAvailability(item) {
    const next = !item.availability;
    setPendingId(item.id, true);
    setItems((prev) => prev.map((i) => (i.id === item.id ? { ...i, availability: next } : i)));
    try {
      const data = await adminFetch('/api/admin/menu', {
        method: 'PATCH',
        body: { id: item.id, availability: next },
      });
      setItems((prev) => prev.map((i) => (i.id === item.id ? data.item : i)));
      showFlash(`“${itemLabel(item)}” is now ${next ? 'visible' : 'hidden'}.`);
    } catch (err) {
      setItems((prev) => prev.map((i) => (i.id === item.id ? { ...i, availability: !next } : i)));
      showFlash(err.message, 'error');
    } finally {
      setPendingId(item.id, false);
    }
  }

  async function confirmDelete() {
    if (!toDelete) return;
    setDeleting(true);
    try {
      await adminFetch('/api/admin/menu', { method: 'DELETE', body: { id: toDelete.id } });
      setItems((prev) => prev.filter((i) => i.id !== toDelete.id));
      showFlash(`Deleted “${itemLabel(toDelete)}”.`);
      setToDelete(null);
    } catch (err) {
      showFlash(err.message, 'error');
    } finally {
      setDeleting(false);
    }
  }

  function openEditor(item) {
    setFormError('');
    setEditing(item ? { isNew: false, form: toForm(item) } : { isNew: true, form: { ...EMPTY_ITEM } });
  }

  function closeEditor() {
    if (saving) return;
    setEditing(null);
    setFormError('');
  }

  function setField(name, value) {
    setEditing((prev) => (prev ? { ...prev, form: { ...prev.form, [name]: value } } : prev));
  }

  async function save(event) {
    event.preventDefault();
    if (saving || !editing) return;
    const form = editing.form;

    // Friendly client-side checks (the API validates again).
    if (editing.isNew && !ID_PATTERN.test(form.id.trim())) {
      setFormError('Item id: use 2–80 lowercase letters, numbers, dashes or underscores (e.g. set-canada).');
      return;
    }
    if (!form.category.trim()) {
      setFormError('Please choose or type a category.');
      return;
    }
    if (!form.name_en.trim() && !form.name_tr.trim() && !form.name_ar.trim() && !form.name_zh.trim()) {
      setFormError('Give the item a name in at least one language.');
      return;
    }
    const price = Number(form.price);
    if (form.price === '' || !Number.isFinite(price) || price < 0) {
      setFormError('Price must be a number, 0 or higher.');
      return;
    }

    setSaving(true);
    setFormError('');
    try {
      const data = await adminFetch('/api/admin/menu', {
        method: editing.isNew ? 'POST' : 'PATCH',
        body: { ...form, id: form.id.trim(), price },
      });
      setItems((prev) => sortItems([...prev.filter((i) => i.id !== data.item.id), data.item]));
      showFlash(editing.isNew ? `Added “${itemLabel(data.item)}”.` : `Saved “${itemLabel(data.item)}”.`);
      setEditing(null);
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSaving(false);
    }
  }

  const form = editing?.form;

  return (
    <>
      <header className="page-head">
        <h1>Menu items</h1>
        <p className="lede">
          {loading ? 'Loading the menu…' : `${items.length} items in the database.`}
        </p>
      </header>

      <div className="admin-toolbar">
        <div className="grow">
          <LuSearch aria-hidden="true" />
          <input
            type="search"
            placeholder="Search by name or id…"
            aria-label="Search menu items"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setShown(PAGE_SIZE);
            }}
          />
        </div>
        <select
          aria-label="Filter by category"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setShown(PAGE_SIZE);
          }}
        >
          <option value="all">All categories ({items.length})</option>
          {categoryCounts.map(([c, n]) => (
            <option key={c} value={c}>
              {prettyCategory(c)} ({n})
            </option>
          ))}
        </select>
        <button type="button" className="btn" onClick={() => openEditor(null)}>
          <LuPlus aria-hidden="true" /> Add item
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

      {!loading && !loadError ? (
        <p className="result-meta" aria-live="polite">
          Showing {Math.min(page.length, visible.length)} of {visible.length}
          {visible.length !== items.length ? ` (filtered from ${items.length})` : ''}
        </p>
      ) : null}

      <div className="admin-list">
        <div className="list-head menu-cols" aria-hidden="true">
          <span />
          <span>Item</span>
          <span>Category</span>
          <span>Price</span>
          <span>On site</span>
          <span />
        </div>

        {loading
          ? [0, 1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="sk-row">
                <div className="skeleton" style={{ width: 52, height: 52, borderRadius: 12, flex: 'none' }} />
                <div style={{ flex: 1 }}>
                  <div className="skeleton" style={{ height: 14, width: '50%', marginBottom: 8 }} />
                  <div className="skeleton" style={{ height: 11, width: '28%' }} />
                </div>
              </div>
            ))
          : null}

        {!loading && !loadError && visible.length === 0 ? (
          <div className="empty-state">
            <b>No items match</b>
            Try a different search or category.
          </div>
        ) : null}

        {page.map((item) => {
          const busy = pending.has(item.id);
          return (
            <div key={item.id} className={`mrow menu-cols${item.availability ? '' : ' is-off'}`}>
              <div className="c-thumb">
                <Thumb src={item.image} />
              </div>
              <div className="c-main">
                <div className="item-name">{itemLabel(item)}</div>
                <div className="item-sub">
                  {item.id}
                  {item.name_tr && item.name_en ? ` · ${item.name_tr}` : ''}
                </div>
              </div>
              <div className="c-cat">
                <span className="chip">{prettyCategory(item.category)}</span>
              </div>
              <div className="c-price">{formatPrice(item)}</div>
              <div className="c-sw">
                <label className="switch" title={item.availability ? 'Visible on website' : 'Hidden from website'}>
                  <input
                    type="checkbox"
                    checked={Boolean(item.availability)}
                    disabled={busy}
                    onChange={() => toggleAvailability(item)}
                    aria-label={`Show “${itemLabel(item)}” on the website`}
                  />
                  <span className="track" />
                </label>
              </div>
              <div className="c-act">
                <button type="button" className="btn secondary small" onClick={() => openEditor(item)}>
                  <LuPencil aria-hidden="true" /> Edit
                </button>
                {canDelete ? (
                  <button
                    type="button"
                    className="btn danger-ghost small"
                    onClick={() => setToDelete(item)}
                    aria-label={`Delete “${itemLabel(item)}”`}
                  >
                    <LuTrash2 aria-hidden="true" />
                  </button>
                ) : null}
              </div>
            </div>
          );
        })}

        {visible.length > shown ? (
          <div className="more-wrap">
            <button type="button" className="btn secondary" onClick={() => setShown((n) => n + PAGE_SIZE)}>
              Show more ({visible.length - shown} left)
            </button>
          </div>
        ) : null}
      </div>

      {editing ? (
        <Modal title={editing.isNew ? 'Add menu item' : `Edit ${form.id}`} onClose={closeEditor}>
          <form onSubmit={save} noValidate>
            <div className="modal-body">
              {formError ? (
                <div className="admin-error" role="alert">
                  <LuTriangleAlert aria-hidden="true" />
                  <div>{formError}</div>
                </div>
              ) : null}

              <div className="form-section">
                <h3>Basics</h3>
                <div className="form-grid">
                  <TextField label="Item id (URL slug)" hint={editing.isNew ? 'Lowercase, no spaces. Cannot be changed later.' : undefined}>
                    <input
                      type="text"
                      disabled={!editing.isNew}
                      value={form.id}
                      onChange={(e) => setField('id', e.target.value)}
                      placeholder="set-canada"
                      autoCapitalize="none"
                      autoCorrect="off"
                    />
                  </TextField>
                  <TextField label="Category">
                    <input
                      type="text"
                      list="menu-categories"
                      value={form.category}
                      onChange={(e) => setField('category', e.target.value)}
                      placeholder="sushi-sets"
                      autoCapitalize="none"
                    />
                    <datalist id="menu-categories">
                      {categoryCounts.map(([c]) => (
                        <option key={c} value={c} />
                      ))}
                    </datalist>
                  </TextField>
                  <TextField label="Price (TL)">
                    <input
                      type="number"
                      inputMode="decimal"
                      min="0"
                      step="0.01"
                      value={form.price}
                      onChange={(e) => setField('price', e.target.value)}
                    />
                  </TextField>
                  <TextField label="Portion / pieces">
                    <input
                      type="text"
                      value={form.portion_or_pieces}
                      onChange={(e) => setField('portion_or_pieces', e.target.value)}
                      placeholder="32 pcs"
                    />
                  </TextField>
                </div>
                <label className="check">
                  <input
                    type="checkbox"
                    checked={Boolean(form.availability)}
                    onChange={(e) => setField('availability', e.target.checked)}
                  />
                  Visible on the website
                </label>
              </div>

              <div className="form-section">
                <h3>Names</h3>
                <div className="form-grid">
                  <TextField label="English">
                    <input type="text" value={form.name_en} onChange={(e) => setField('name_en', e.target.value)} />
                  </TextField>
                  <TextField label="Türkçe">
                    <input type="text" value={form.name_tr} onChange={(e) => setField('name_tr', e.target.value)} />
                  </TextField>
                  <TextField label="العربية">
                    <input type="text" dir="auto" value={form.name_ar} onChange={(e) => setField('name_ar', e.target.value)} />
                  </TextField>
                  <TextField label="中文">
                    <input type="text" value={form.name_zh} onChange={(e) => setField('name_zh', e.target.value)} />
                  </TextField>
                </div>
              </div>

              <div className="form-section">
                <h3>Descriptions</h3>
                <TextField label="English">
                  <textarea value={form.description_en} onChange={(e) => setField('description_en', e.target.value)} />
                </TextField>
                <div className="form-grid">
                  <TextField label="Türkçe">
                    <textarea value={form.description_tr} onChange={(e) => setField('description_tr', e.target.value)} />
                  </TextField>
                  <TextField label="العربية">
                    <textarea dir="auto" value={form.description_ar} onChange={(e) => setField('description_ar', e.target.value)} />
                  </TextField>
                </div>
                <TextField label="中文">
                  <textarea value={form.description_zh} onChange={(e) => setField('description_zh', e.target.value)} />
                </TextField>
              </div>

              <div className="form-section">
                <h3>Details</h3>
                <div className="form-grid">
                  <TextField label="Ingredients" hint="Comma separated">
                    <input type="text" value={form.ingredients} onChange={(e) => setField('ingredients', e.target.value)} />
                  </TextField>
                  <TextField label="Tags" hint="Comma separated, e.g. bestseller, spicy">
                    <input type="text" value={form.tags} onChange={(e) => setField('tags', e.target.value)} />
                  </TextField>
                  <TextField label="Allergens" hint="Comma separated, e.g. gluten, fish">
                    <input type="text" value={form.allergens} onChange={(e) => setField('allergens', e.target.value)} />
                  </TextField>
                </div>
                <div className="img-field">
                  <TextField label="Image path" hint="e.g. /images/canada-set.webp">
                    <input
                      type="text"
                      value={form.image}
                      onChange={(e) => setField('image', e.target.value)}
                      placeholder="/images/canada-set.webp"
                      autoCapitalize="none"
                    />
                  </TextField>
                  <Thumb key={form.image} src={form.image} />
                </div>
              </div>
            </div>

            <div className="modal-actions">
              <button type="button" className="btn secondary" onClick={closeEditor} disabled={saving}>
                Cancel
              </button>
              <button type="submit" className="btn" disabled={saving}>
                {saving ? 'Saving…' : 'Save item'}
              </button>
            </div>
          </form>
        </Modal>
      ) : null}

      {toDelete ? (
        <ConfirmDialog
          title="Delete this item?"
          message={`“${itemLabel(toDelete)}” will be removed permanently. This cannot be undone. To just hide it, switch off “On site” instead.`}
          confirmLabel="Delete"
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
