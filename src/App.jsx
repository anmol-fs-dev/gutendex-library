import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Books from './pages/Books.jsx'

const App = () => {
  return (
    <div className="app-shell">
      <header className="app-header">
        <Link to="/" className="brand">Gutendex Library</Link>
      </header>
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books/:category" element={<Books />} />
        </Routes>
      </main>
      <footer className="app-footer">
        <span>© {new Date().getFullYear()} Gutendex Demo</span>
      </footer>
    </div>
  )
}

export default App
