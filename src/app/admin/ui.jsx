'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { LuCircleCheck, LuEye, LuEyeOff, LuTriangleAlert, LuX } from 'react-icons/lu';

/**
 * Auto-dismissing toast. Always rendered above modals, so a failed save is
 * never hidden behind the dialog like the old inline banners were.
 */
export function useFlash() {
  const [flash, setFlash] = useState(null);
  const timer = useRef(null);

  const show = useCallback((text, type = 'ok') => {
    clearTimeout(timer.current);
    setFlash({ text, type, id: Date.now() });
    timer.current = setTimeout(() => setFlash(null), type === 'error' ? 7000 : 3800);
  }, []);

  const dismiss = useCallback(() => {
    clearTimeout(timer.current);
    setFlash(null);
  }, []);

  useEffect(() => () => clearTimeout(timer.current), []);

  return { flash, show, dismiss };
}

export function Flash({ flash, onClose }) {
  if (!flash) return null;
  const isError = flash.type === 'error';
  return (
    <div
      key={flash.id}
      className={`flash ${isError ? 'flash-error' : 'flash-ok'}`}
      role={isError ? 'alert' : 'status'}
    >
      {isError ? <LuTriangleAlert aria-hidden="true" /> : <LuCircleCheck aria-hidden="true" />}
      <span>{flash.text}</span>
      <button type="button" onClick={onClose} aria-label="Dismiss message">
        <LuX aria-hidden="true" />
      </button>
    </div>
  );
}

/** Locks page scroll and closes on Escape while a dialog is open. */
export function useModalBehavior(onClose) {
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (event) => {
      if (event.key === 'Escape') closeRef.current?.();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, []);
}

export function Modal({ title, onClose, children, narrow = false }) {
  useModalBehavior(onClose);
  return (
    <div
      className="modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className={`modal-card${narrow ? ' narrow' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className="modal-head">
          <h2>{title}</h2>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Close">
            <LuX aria-hidden="true" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function ConfirmDialog({
  title,
  message,
  confirmLabel = 'Confirm',
  danger = false,
  busy = false,
  onConfirm,
  onCancel,
}) {
  return (
    <Modal title={title} onClose={busy ? () => {} : onCancel} narrow>
      <div className="modal-body">
        <p style={{ margin: 0, color: 'var(--a-ink-2)' }}>{message}</p>
      </div>
      <div className="modal-actions">
        <button type="button" className="btn secondary" onClick={onCancel} disabled={busy}>
          Cancel
        </button>
        <button
          type="button"
          className={`btn${danger ? ' danger' : ''}`}
          onClick={onConfirm}
          disabled={busy}
        >
          {busy ? 'Working…' : confirmLabel}
        </button>
      </div>
    </Modal>
  );
}

export function PasswordInput({
  value,
  onChange,
  autoComplete,
  required = true,
  minLength,
  placeholder,
}) {
  const [show, setShow] = useState(false);
  return (
    <div className="pw-wrap">
      <input
        type={show ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        required={required}
        minLength={minLength}
        placeholder={placeholder}
      />
      <button
        type="button"
        className="pw-toggle"
        onClick={() => setShow((s) => !s)}
        aria-label={show ? 'Hide password' : 'Show password'}
        aria-pressed={show}
      >
        {show ? <LuEyeOff aria-hidden="true" /> : <LuEye aria-hidden="true" />}
      </button>
    </div>
  );
}

/**
 * fetch wrapper for the admin API: parses JSON, turns failures into Errors
 * with a readable message and sends the user to the login page when the
 * session has expired.
 */
export async function adminFetch(url, { method = 'GET', body } = {}) {
  let res;
  try {
    res = await fetch(url, {
      method,
      headers: body ? { 'Content-Type': 'application/json' } : undefined,
      body: body ? JSON.stringify(body) : undefined,
      cache: 'no-store',
    });
  } catch {
    throw new Error('Network error — check your connection and try again.');
  }
  const data = await res.json().catch(() => ({}));
  if (res.status === 401) {
    window.location.assign('/admin/login');
    throw new Error('Your session expired — please sign in again.');
  }
  if (!res.ok) throw new Error(data.error || `Request failed (${res.status}).`);
  return data;
}
