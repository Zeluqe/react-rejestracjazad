import { useState } from 'react'

export function App() {
  const [count, setCount] = useState(0)

  return (
    <main className="card">
      <div className="badge">
        <span className="badge-dot" />
        <span>React + Vite</span>
      </div>
      <h1>Aplikacja React</h1>
      <p className="description">
        Projekt został pomyślnie utworzony i jest gotowy do dalszego rozwoju.
      </p>

      <div className="counter-section">
        <button
          type="button"
          className="primary-btn"
          onClick={() => setCount((prev) => prev + 1)}
        >
          Kliknięcia: {count}
        </button>
        <span className="status-text">
          {count === 0 ? 'Kliknij przycisk, aby przetestować stan' : `Licznik działa poprawnie (${count})`}
        </span>
      </div>
    </main>
  )
}

export default App
