function PersonaSwitcher({ personas, activePersonaId, onSwitch }) {
  return (
    <nav className="persona-switcher">
      <p className="switcher-label">Choose a persona</p>
      <div className="persona-list">
        {Object.values(personas).map((persona) => {
          const isActive = persona.id === activePersonaId
          return (
            <button
              key={persona.id}
              className={`persona-card ${isActive ? 'active' : ''}`}
              style={{ '--color': persona.color }}
              onClick={() => onSwitch(persona.id)}
              aria-pressed={isActive}
            >
              <div
                className="persona-avatar"
                style={{ background: isActive ? persona.color : 'transparent', borderColor: persona.color }}
              >
                {persona.initials}
              </div>
              <div className="persona-info">
                <span className="persona-name">{persona.name}</span>
                <span className="persona-role">{persona.title}</span>
              </div>
              {isActive && <span className="active-indicator" />}
            </button>
          )
        })}
      </div>
      <style>{`
        .persona-switcher {
          padding: 16px 16px 8px;
          flex: 1;
          overflow-y: auto;
        }
        .switcher-label {
          font-size: 10px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--text-muted);
          margin-bottom: 10px;
          padding: 0 4px;
        }
        .persona-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .persona-card {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 12px;
          border-radius: 12px;
          border: 1px solid transparent;
          background: transparent;
          cursor: pointer;
          text-align: left;
          transition: all 0.15s ease;
          position: relative;
          color: var(--text-secondary);
          width: 100%;
        }
        .persona-card:hover {
          background: var(--bg-card);
          color: var(--text-primary);
          border-color: var(--border);
        }
        .persona-card.active {
          background: var(--bg-card);
          border-color: color-mix(in srgb, var(--color) 40%, transparent);
          color: var(--text-primary);
        }
        .persona-avatar {
          width: 40px;
          height: 40px;
          border-radius: 11px;
          border: 2px solid;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          font-weight: 700;
          flex-shrink: 0;
          color: var(--color);
          transition: all 0.15s ease;
        }
        .persona-card.active .persona-avatar {
          color: white;
        }
        .persona-info {
          flex: 1;
          min-width: 0;
        }
        .persona-name {
          display: block;
          font-size: 14px;
          font-weight: 600;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .persona-role {
          display: block;
          font-size: 11px;
          color: var(--text-muted);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .active-indicator {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--color);
          flex-shrink: 0;
        }
        @media (max-width: 700px) {
          .persona-switcher { padding: 10px; }
          .persona-list { flex-direction: row; gap: 8px; }
          .persona-card { flex-direction: column; align-items: center; padding: 10px 8px; gap: 6px; min-width: 80px; flex: 1; }
          .persona-info { text-align: center; }
          .persona-name { font-size: 11px; }
          .persona-role { display: none; }
          .active-indicator { position: absolute; top: 8px; right: 8px; }
          .switcher-label { display: none; }
        }
      `}</style>
    </nav>
  )
}

export default PersonaSwitcher
