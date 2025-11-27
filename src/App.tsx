import CSSExportPanel from './components/CSSExportPanel';
import GradientControls from './components/GradientControls';
import GradientPreview from './components/GradientPreview';

const App = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-10 h-80 w-80 bg-cyan-500/20 blur-[120px]" />
        <div className="absolute right-[-10%] top-20 h-96 w-96 bg-fuchsia-500/20 blur-[130px]" />
        <div className="absolute left-1/3 bottom-[-10%] h-96 w-96 bg-amber-400/10 blur-[120px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-10 flex flex-col gap-10">
        <header className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs text-slate-200">
              <span className="h-2 w-2 rounded-full bg-cyan-300 animate-pulse" />
              Live design session
            </div>
            <div className="text-xs uppercase tracking-[0.28em] text-cyan-300 font-semibold">
              Gradient Lab
            </div>
            <h1 className="text-3xl sm:text-4xl font-semibold leading-tight">
              Aesthetic Gradient Composer
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl">
              Design interactive gradients, preview instantly, and export clean CSS. We&apos;ll plug
              in the state + logic next; for now this is the polished shell.
            </p>
          </div>
          <div className="text-sm text-slate-300 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 shadow-inner">
            <div className="text-xs uppercase tracking-[0.24em] text-slate-400 mb-1">Phase</div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span className="font-semibold text-white">03</span>
              <span className="text-slate-400">Layout & styling scaffold</span>
            </div>
          </div>
        </header>

        <main className="grid gap-6 lg:grid-cols-[1.05fr_1fr]">
          <div className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-lg p-6 shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
              <GradientControls />
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-lg p-6 shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
              <CSSExportPanel />
            </div>
          </div>
          <GradientPreview />
        </main>

        <footer className="text-sm text-slate-400 border-t border-white/10 pt-4">
          Up next: wire state, gradient logic, controls, preview sync, and copy-to-clipboard.
        </footer>
      </div>
    </div>
  );
};

export default App;
