import { useState, useRef, useEffect } from 'react'
import Message from './Message'
import TypingIndicator from './TypingIndicator'
import SuggestionChips from './SuggestionChips'

function Chat({ persona }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [error, setError] = useState(null)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const sendMessage = async (text) => {
    const userText = text.trim()
    if (!userText || isTyping) return

    setError(null)
    const userMsg = { role: 'user', content: userText }
    const updatedMessages = [...messages, userMsg]
    setMessages(updatedMessages)
    setInput('')
    setIsTyping(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          persona: persona.id,
          messages: updatedMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong.')
      }

      setMessages((prev) => [...prev, { role: 'assistant', content: data.content }])
    } catch (err) {
      setError(err.message)
    } finally {
      setIsTyping(false)
      inputRef.current?.focus()
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    sendMessage(input)
  }

  const handleChipSelect = (text) => {
    sendMessage(text)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  const isEmpty = messages.length === 0

  return (
    <div className="chat-container">
      <div className="messages-area">
        {isEmpty ? (
          <div className="empty-state">
            <div className="empty-avatar" style={{ background: persona.color }}>
              {persona.initials}
            </div>
            <h2 className="empty-name">{persona.name}</h2>
            <p className="empty-title">{persona.title}</p>
            <p className="empty-bio">{persona.bio}</p>
            <SuggestionChips
              suggestions={persona.suggestions}
              onSelect={handleChipSelect}
              color={persona.color}
            />
          </div>
        ) : (
          <div className="messages-list">
            {messages.map((msg, i) => (
              <Message key={i} message={msg} persona={persona} />
            ))}
            {isTyping && <TypingIndicator persona={persona} />}
            {error && (
              <div className="error-banner">
                <span>⚠️</span> {error}
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        )}

      </div>

      <div className="input-area">
        <form onSubmit={handleSubmit} className="input-form">
          <textarea
            ref={inputRef}
            className="chat-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Ask ${persona.name.split(' ')[0]} anything…`}
            rows={1}
            disabled={isTyping}
            style={{ '--focus-color': persona.color }}
          />
          <button
            type="submit"
            className="send-btn"
            disabled={!input.trim() || isTyping}
            style={{ background: persona.color }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </form>
        <p className="input-hint">Press Enter to send · Shift+Enter for new line</p>
      </div>

      <style>{`
        .chat-container {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .messages-area {
          flex: 1;
          overflow-y: auto;
          padding: 24px 20px;
        }
        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          max-width: 520px;
          margin: 0 auto;
          padding-top: 40px;
        }
        .empty-avatar {
          width: 72px;
          height: 72px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 26px;
          font-weight: 800;
          color: white;
          margin-bottom: 16px;
        }
        .empty-name {
          font-size: 22px;
          font-weight: 700;
          margin-bottom: 4px;
        }
        .empty-title {
          font-size: 13px;
          color: var(--text-muted);
          margin-bottom: 12px;
        }
        .empty-bio {
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 24px;
        }
        .messages-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
          max-width: 760px;
          margin: 0 auto;
        }
        .error-banner {
          background: #3a1515;
          border: 1px solid #7f2020;
          color: #ffaaaa;
          padding: 12px 16px;
          border-radius: 10px;
          font-size: 13px;
        }
        .input-area {
          border-top: 1px solid var(--border);
          padding: 16px 20px;
          background: var(--bg-secondary);
        }
        .input-form {
          display: flex;
          gap: 10px;
          align-items: flex-end;
          max-width: 760px;
          margin: 0 auto;
        }
        .chat-input {
          flex: 1;
          padding: 12px 16px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 14px;
          color: var(--text-primary);
          font-size: 14.5px;
          font-family: inherit;
          resize: none;
          outline: none;
          line-height: 1.5;
          max-height: 140px;
          transition: border-color 0.15s;
        }
        .chat-input::placeholder { color: var(--text-muted); }
        .chat-input:focus { border-color: var(--focus-color); }
        .chat-input:disabled { opacity: 0.6; cursor: not-allowed; }
        .send-btn {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          flex-shrink: 0;
          transition: opacity 0.15s, transform 0.1s;
        }
        .send-btn:disabled { opacity: 0.4; cursor: not-allowed; }
        .send-btn:not(:disabled):hover { opacity: 0.9; transform: scale(1.05); }
        .input-hint {
          font-size: 11px;
          color: var(--text-muted);
          text-align: center;
          margin-top: 8px;
        }
        @media (max-width: 700px) {
          .messages-area { padding: 16px 12px; }
          .empty-state { padding-top: 20px; }
          .input-area { padding: 12px; }
          .input-hint { display: none; }
        }
      `}</style>
    </div>
  )
}

export default Chat
