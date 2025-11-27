import { ColorStop, GradientState, GradientType } from '../types/gradient';

type Props = {
  state: GradientState;
  onTypeChange: (type: GradientType) => void;
  onAngleChange: (angle: number) => void;
  onStopChange: (id: string, stop: Partial<ColorStop>) => void;
  onAddStop: () => void;
  onRemoveStop: (id: string) => void;
  onReorderStop: (id: string, direction: 'up' | 'down') => void;
};

const GradientControls = ({
  state,
  onTypeChange,
  onAngleChange,
  onStopChange,
  onAddStop,
  onRemoveStop,
  onReorderStop,
}: Props) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-300 font-semibold"></p>
          <h2 className="text-xl font-semibold">Gradient Controls</h2>
          <p className="text-sm text-slate-400">
            Linear/radial toggle, angle input, and editable color stops.
          </p>
        </div>
        <span className="px-3 py-1 rounded-full text-xs bg-white/10 text-slate-200 border border-white/10">
          Interactive
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
          <h3 className="text-sm font-semibold text-slate-100">Gradient Type</h3>
          <p className="text-xs text-slate-400 mt-1">Switch between linear and radial.</p>
          <div className="mt-3 flex gap-2">
            {(['linear', 'radial'] as GradientType[]).map((type) => {
              const active = state.type === type;
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => onTypeChange(type)}
                  className={`flex-1 rounded-xl border px-3 py-2 text-sm capitalize transition ${
                    active
                      ? 'border-cyan-400/60 bg-cyan-400/10 text-cyan-100 shadow-[0_0_0_1px_rgba(34,211,238,0.2)]'
                      : 'border-white/10 bg-white/5 text-slate-200 hover:border-white/30'
                  }`}
                >
                  {type}
                </button>
              );
            })}
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
          <h3 className="text-sm font-semibold text-slate-100">Angle</h3>
          <p className="text-xs text-slate-400 mt-1">Slider + numeric input for linear mode.</p>
          <div className="mt-3 flex items-center gap-3">
            <input
              type="range"
              min={0}
              max={360}
              value={state.angle}
              onChange={(e) => onAngleChange(Number(e.target.value))}
              className="w-full accent-cyan-400"
              disabled={state.type !== 'linear'}
              aria-label="Gradient angle slider"
            />
            <input
              type="number"
              min={0}
              max={360}
              value={state.angle}
              onChange={(e) => onAngleChange(Number(e.target.value))}
              className="w-20 rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-sm text-slate-100"
              disabled={state.type !== 'linear'}
              aria-label="Gradient angle numeric input"
            />
          </div>
          {state.type !== 'linear' && (
            <p className="text-[11px] text-slate-500 mt-1">Angle disabled for radial gradients.</p>
          )}
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
          <button
            className="px-3 py-1 text-xs rounded-lg border border-cyan-400/40 text-cyan-200 bg-cyan-500/10 hover:border-cyan-300/60 transition"
            type="button"
            onClick={onAddStop}
          >
            + Add stop
          </button>
        </div>
        <div className="mt-4 space-y-3">
          {state.stops.map((stop, idx) => (
            <div
              key={stop.id}
              className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3"
            >
              <input
                type="color"
                value={stop.color}
                onChange={(e) => onStopChange(stop.id, { color: e.target.value })}
                className="h-12 w-12 rounded-lg border border-white/20 bg-slate-900/60"
                aria-label={`Color stop ${idx + 1}`}
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={stop.position}
                    onChange={(e) => onStopChange(stop.id, { position: Number(e.target.value) })}
                    className="w-full accent-cyan-400"
                    aria-label={`Position for stop ${idx + 1}`}
                  />
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={stop.position}
                    onChange={(e) => onStopChange(stop.id, { position: Number(e.target.value) })}
                    className="w-16 rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-sm text-slate-100"
                    aria-label={`Numeric position for stop ${idx + 1}`}
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">Position: {stop.position}%</p>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-slate-400">
                <div className="flex flex-col gap-1">
                  <button
                    className="px-2 py-1 rounded-lg border border-white/10 hover:border-white/40 transition disabled:opacity-40"
                    type="button"
                    onClick={() => onReorderStop(stop.id, 'up')}
                    disabled={idx === 0}
                    aria-label="Move stop up"
                  >
                    ↑
                  </button>
                  <button
                    className="px-2 py-1 rounded-lg border border-white/10 hover:border-white/40 transition disabled:opacity-40"
                    type="button"
                    onClick={() => onReorderStop(stop.id, 'down')}
                    disabled={idx === state.stops.length - 1}
                    aria-label="Move stop down"
                  >
                    ↓
                  </button>
                </div>
                <button
                  className="px-2 py-1 rounded-lg border border-white/10 hover:border-red-400/60 hover:text-red-200 transition disabled:opacity-40"
                  type="button"
                  onClick={() => onRemoveStop(stop.id)}
                  disabled={state.stops.length <= 2}
                  aria-label="Remove stop"
                >
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
