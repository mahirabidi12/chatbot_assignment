import { useState } from 'react'
import PersonaSwitcher from './components/PersonaSwitcher'
import Chat from './components/Chat'
import { personas } from './data/personas'
import './App.css'

function App() {
  const [activePersonaId, setActivePersonaId] = useState('anshuman')

  const handlePersonaSwitch = (id) => {
    setActivePersonaId(id)
  }

  const activePersona = personas[activePersonaId]

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <span className="logo-icon">⚡</span>
            <span className="logo-text">Scaler Personas</span>
          </div>
          <p className="sidebar-subtitle">Talk to Scaler founders & instructors</p>
        </div>
        <PersonaSwitcher
          personas={personas}
          activePersonaId={activePersonaId}
          onSwitch={handlePersonaSwitch}
        />
        <div className="sidebar-footer">
          <p>Powered by Claude AI</p>
        </div>
      </aside>

      <main className="main-content">
        <div
          className="active-persona-bar"
          style={{ '--persona-color': activePersona.color }}
        >
          <div className="persona-avatar-sm" style={{ background: activePersona.color }}>
            {activePersona.initials}
          </div>
          <div>
            <span className="persona-name-bar">{activePersona.name}</span>
            <span className="persona-title-bar">{activePersona.title}</span>
          </div>
          <div className="persona-status">
            <span className="status-dot" />
            Active
          </div>
        </div>

        <Chat
          key={activePersonaId}
          persona={activePersona}
        />
      </main>
    </div>
  )
}

export default App
