import Home from './pages/Home'

function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      <header className="p-6 bg-slate-800 shadow-lg">
        <h1 className="text-3xl font-bold text-sky-400">Kashmir Travel App</h1>
      </header>
      <main className="flex-grow p-6">
        <Home />
      </main>
      <footer className="p-4 bg-slate-800 text-center text-slate-400">
        © 2026 Kashmir Travel App
      </footer>
    </div>
  )
}

export default App
