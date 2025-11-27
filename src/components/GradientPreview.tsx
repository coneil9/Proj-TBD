const demoGradient =
  'linear-gradient(120deg, #7c3aed 0%, #22d3ee 50%, #f59e0b 100%)';

const GradientPreview = () => {
  return (
    <div className="relative h-full">
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/10 via-fuchsia-500/10 to-amber-400/10 blur-3xl" />
      <div className="relative rounded-3xl border border-white/10 bg-slate-900/80 backdrop-blur-md shadow-[0_20px_80px_rgba(0,0,0,0.45)] overflow-hidden">
        <div className="flex items-center justify-between px-6 pt-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-fuchsia-300 font-semibold">
              Live Preview
            </p>
            <h2 className="text-xl font-semibold">Gradient Canvas</h2>
            <p className="text-sm text-slate-300">
              This panel will reflect every change in real time.
            </p>
          </div>
          <div className="px-3 py-1 text-xs rounded-full bg-white/10 border border-white/10 text-slate-200">
            Responsive
          </div>
        </div>
        <div className="p-6">
          <div className="relative aspect-[4/3] rounded-2xl border border-white/10 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(255,255,255,0.06),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.08),transparent_30%),radial-gradient(circle_at_30%_80%,rgba(255,255,255,0.05),transparent_35%)]" />
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: demoGradient,
              }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.08),transparent_55%)]" />
            <div className="absolute bottom-4 right-4 px-3 py-1 text-xs rounded-lg bg-black/40 border border-white/10 text-slate-100 backdrop-blur">
              Placeholder gradient · will bind to state
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradientPreview;
