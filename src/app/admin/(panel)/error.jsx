'use client';

import { LuRefreshCw, LuTriangleAlert } from 'react-icons/lu';

export default function PanelError({ error, reset }) {
  return (
    <div className="panel-card" role="alert">
      <h2>
        <LuTriangleAlert aria-hidden="true" style={{ verticalAlign: '-3px', marginRight: 8, color: 'var(--a-red)' }} />
        Something went wrong
      </h2>
      <p style={{ marginTop: 0, color: 'var(--a-ink-2)' }}>
        This page could not be loaded{error?.message ? `: ${error.message}` : '.'}
      </p>
      <button type="button" className="btn" onClick={reset}>
        <LuRefreshCw aria-hidden="true" /> Try again
      </button>
    </div>
  );
}
