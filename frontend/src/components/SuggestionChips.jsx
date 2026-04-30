function SuggestionChips({ suggestions, onSelect, color }) {
  return (
    <div className="chips-wrapper">
      <p className="chips-label">Suggested questions</p>
      <div className="chips-grid">
        {suggestions.map((s, i) => (
          <button
            key={i}
            className="chip"
            style={{ '--chip-color': color }}
            onClick={() => onSelect(s)}
          >
            {s}
          </button>
        ))}
      </div>
      <style>{`
        .chips-wrapper {
          padding: 12px 0 4px;
        }
        .chips-label {
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          color: var(--text-muted);
          margin-bottom: 10px;
        }
        .chips-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .chip {
          padding: 8px 14px;
          background: transparent;
          border: 1px solid var(--border);
          border-radius: 20px;
          color: var(--text-secondary);
          font-size: 13px;
          cursor: pointer;
          transition: all 0.15s ease;
          text-align: left;
          line-height: 1.3;
        }
        .chip:hover {
          border-color: var(--chip-color);
          color: var(--chip-color);
          background: color-mix(in srgb, var(--chip-color) 8%, transparent);
        }
      `}</style>
    </div>
  )
}

export default SuggestionChips
