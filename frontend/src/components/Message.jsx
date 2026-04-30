function Message({ message, persona }) {
  const isUser = message.role === 'user'

  return (
    <div className={`message-row ${isUser ? 'user-row' : 'ai-row'}`}>
      {!isUser && (
        <div className="msg-avatar" style={{ background: persona.color }}>
          {persona.initials}
        </div>
      )}
      <div
        className={`message-bubble ${isUser ? 'user-bubble' : 'ai-bubble'}`}
        style={!isUser ? { '--persona-color': persona.color } : undefined}
      >
        <p className="message-text">{message.content}</p>
      </div>
      <style>{`
        .message-row {
          display: flex;
          align-items: flex-end;
          gap: 10px;
          max-width: 82%;
        }
        .user-row {
          margin-left: auto;
          flex-direction: row-reverse;
        }
        .ai-row {
          margin-right: auto;
        }
        .msg-avatar {
          width: 30px;
          height: 30px;
          min-width: 30px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 700;
          color: white;
        }
        .message-bubble {
          padding: 12px 16px;
          border-radius: 18px;
          line-height: 1.65;
          font-size: 14.5px;
        }
        .user-bubble {
          background: #4f4fd4;
          color: white;
          border-radius: 18px 18px 4px 18px;
        }
        .ai-bubble {
          background: var(--bg-card);
          border: 1px solid var(--border);
          color: var(--text-primary);
          border-radius: 18px 18px 18px 4px;
          border-left: 3px solid var(--persona-color);
        }
        .message-text {
          white-space: pre-wrap;
          word-break: break-word;
        }
        @media (max-width: 700px) {
          .message-row { max-width: 95%; }
          .message-bubble { font-size: 14px; padding: 10px 14px; }
        }
      `}</style>
    </div>
  )
}

export default Message
