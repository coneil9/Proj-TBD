type Props = {
  gradientString: string;
  onCopy?: () => void;
};

const CSSExportPanel = ({ gradientString, onCopy }: Props) => {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-slate-100">CSS Export</h3>
          <p className="text-xs text-slate-400">Copy-ready gradient string.</p>
        </div>
        <button
          className="px-3 py-1 text-xs rounded-lg border border-cyan-400/40 text-cyan-200 bg-cyan-500/10"
          type="button"
          onClick={onCopy}
        >
          Copy
        </button>
      </div>
      <div className="rounded-xl border border-white/10 bg-black/40 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-slate-400 bg-white/5 border-b border-white/10">
          <span>CSS</span>
          <span className="text-cyan-200">background</span>
        </div>
        <pre className="text-xs text-slate-200 p-4 whitespace-pre-wrap font-mono">{`background: ${gradientString};`}</pre>
      </div>
    </div>
  );
};

export default CSSExportPanel;
