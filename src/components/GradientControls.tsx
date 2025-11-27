const GradientControls = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-300 font-semibold">Phase 3</p>
          <h2 className="text-xl font-semibold">Gradient Controls</h2>
          <p className="text-sm text-slate-400">Interactive inputs will plug in here next.</p>
        </div>
        <span className="px-3 py-1 rounded-full text-xs bg-white/10 text-slate-200 border border-white/10">
          Layout scaffold
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
          <h3 className="text-sm font-semibold text-slate-100">Gradient Type</h3>
          <p className="text-xs text-slate-400 mt-1">Linear / Radial toggle coming soon.</p>
          <div className="mt-3 h-10 rounded-xl border border-dashed border-white/15 bg-white/5" />
        </div>
        <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
          <h3 className="text-sm font-semibold text-slate-100">Angle</h3>
          <p className="text-xs text-slate-400 mt-1">Slider + numeric input for linear mode.</p>
          <div className="mt-3 h-10 rounded-xl border border-dashed border-white/15 bg-white/5" />
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-slate-100">Color Stops</h3>
            <p className="text-xs text-slate-400 mt-1">
              Add, remove, reorder, tweak color + position.
            </p>
          </div>
          <button className="px-3 py-1 text-xs rounded-lg border border-cyan-400/40 text-cyan-200 bg-cyan-500/10">
            + Add stop
          </button>
        </div>
        <div className="mt-4 space-y-3">
          {[1, 2, 3].map((idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3"
            >
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-cyan-400 to-fuchsia-500 border border-white/10" />
              <div className="flex-1">
                <div className="h-2 rounded-full bg-white/10">
                  <div className="h-full w-1/2 rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500" />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">Position slider placeholder</p>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-slate-400">
                <span className="px-2 py-1 rounded-lg bg-white/5 border border-white/10">#AABBCC</span>
                <button className="px-2 py-1 rounded-lg border border-white/10 hover:border-red-400/60 hover:text-red-200 transition">
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GradientControls;
