const App = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
      <header className="px-6 py-5 border-b border-white/10">
        <div className="text-xs uppercase tracking-[0.28em] text-cyan-300 font-semibold">
          Gradient Lab
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mt-2">
          <div>
            <h1 className="text-3xl font-semibold leading-tight">Aesthetic Gradient Composer</h1>
            <p className="text-sm text-slate-300">
              Craft interactive gradients, preview instantly, and export clean CSS.
            </p>
          </div>
          <span className="text-xs text-slate-400">
            Phase 2 · Project scaffold ready for controls & preview
          </span>
        </div>
      </header>

      <main className="flex-1 px-6 py-8">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm shadow-[0_10px_50px_rgba(0,0,0,0.35)]">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-6">
              <h2 className="text-lg font-semibold mb-2">Controls</h2>
              <p className="text-sm text-slate-400">
                Gradient controls will live here in upcoming phases.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-400/30 via-fuchsia-400/20 to-amber-300/25 p-[1px]">
              <div className="h-full rounded-2xl bg-slate-900/80 p-6">
                <h2 className="text-lg font-semibold mb-2">Preview</h2>
                <p className="text-sm text-slate-400">
                  Live gradient preview area placeholder.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="px-6 py-4 border-t border-white/10 text-sm text-slate-400">
        Built with React + TypeScript + Tailwind · Gradient generator coming next.
      </footer>
    </div>
  );
};

export default App;
