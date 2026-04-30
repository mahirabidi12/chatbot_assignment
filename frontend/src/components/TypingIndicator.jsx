function TypingIndicator({ persona }) {
  return (
    <div className="typing-wrapper">
      <div className="typing-avatar" style={{ background: persona.color }}>
        {persona.initials}
      </div>
      <div className="typing-bubble">
        <span className="dot" />
        <span className="dot" />
        <span className="dot" />
      </div>
      <style>{`
        .typing-wrapper {
          display: flex;
          align-items: flex-end;
          gap: 10px;
          padding: 4px 0;
        }
        .typing-avatar {
          width: 30px;
          height: 30px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 700;
          color: white;
          flex-shrink: 0;
        }
        .typing-bubble {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 16px 16px 16px 4px;
          padding: 14px 18px;
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--text-muted);
          animation: bounce 1.2s infinite;
        }
        .dot:nth-child(2) { animation-delay: 0.2s; }
        .dot:nth-child(3) { animation-delay: 0.4s; }
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-6px); opacity: 1; }
        }
      `}</style>
    </div>
  )
}

export default TypingIndicator
