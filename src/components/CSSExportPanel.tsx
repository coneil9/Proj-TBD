const CSSExportPanel = () => {
  const placeholder = `background: linear-gradient(120deg, #7c3aed 0%, #22d3ee 50%, #f59e0b 100%);`;

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-slate-100">CSS Export</h3>
          <p className="text-xs text-slate-400">Copy-ready gradient string.</p>
        </div>
        <button className="px-3 py-1 text-xs rounded-lg border border-cyan-400/40 text-cyan-200 bg-cyan-500/10">
          Copy
        </button>
      </div>
      <div className="rounded-xl border border-white/10 bg-black/40 overflow-hidden">
        <pre className="text-xs text-slate-200 p-4 whitespace-pre-wrap">{placeholder}</pre>
      </div>
    </div>
  );
};

export default CSSExportPanel;
