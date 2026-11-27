export default function PanelLoading() {
  return (
    <div aria-busy="true" aria-label="Loading">
      <div className="skeleton" style={{ height: 32, width: 220, marginBottom: 10 }} />
      <div className="skeleton" style={{ height: 16, width: 'min(420px, 80%)', marginBottom: 26 }} />
      <div className="stat-grid">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="stat-card">
            <div className="skeleton" style={{ width: 46, height: 46, borderRadius: 14 }} />
            <div style={{ flex: 1 }}>
              <div className="skeleton" style={{ height: 26, width: 60, marginBottom: 8 }} />
              <div className="skeleton" style={{ height: 12, width: '70%' }} />
            </div>
          </div>
        ))}
      </div>
      <div className="admin-list">
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="sk-row">
            <div className="skeleton" style={{ width: 52, height: 52, borderRadius: 12, flex: 'none' }} />
            <div style={{ flex: 1 }}>
              <div className="skeleton" style={{ height: 14, width: '55%', marginBottom: 8 }} />
              <div className="skeleton" style={{ height: 11, width: '30%' }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
