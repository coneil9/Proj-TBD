import { useMemo, useState } from 'react';
import { Preset } from '../utils/storage';

type Props = {
  presets: Preset[];
  onSave: (name: string) => void;
  onLoad: (preset: Preset) => void;
};

const builtinPresets: Preset[] = [
  {
    id: 'sunset',
    name: 'Sunset',
    builtIn: true,
    type: 'linear',
    angle: 120,
    stops: [
      { id: 's1', color: '#ff7e5f', position: 0 },
      { id: 's2', color: '#feb47b', position: 50 },
      { id: 's3', color: '#ff7f50', position: 100 },
    ],
  },
  {
    id: 'ocean',
    name: 'Ocean',
    builtIn: true,
    type: 'linear',
    angle: 200,
    stops: [
      { id: 'o1', color: '#0ea5e9', position: 0 },
      { id: 'o2', color: '#22d3ee', position: 50 },
      { id: 'o3', color: '#0f172a', position: 100 },
    ],
  },
  {
    id: 'candy',
    name: 'Candy',
    builtIn: true,
    type: 'radial',
    angle: 0,
    stops: [
      { id: 'c1', color: '#ff80b5', position: 0 },
      { id: 'c2', color: '#9089fc', position: 50 },
      { id: 'c3', color: '#22d3ee', position: 100 },
    ],
  },
];

const PresetsPanel = ({ presets, onSave, onLoad }: Props) => {
  const [name, setName] = useState('');

  const combinedPresets = useMemo(() => {
    const custom = presets.filter((p) => !p.builtIn);
    return [...builtinPresets, ...custom];
  }, [presets]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSave(name.trim());
    setName('');
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-slate-100">Presets</h3>
          <p className="text-xs text-slate-400">Load built-ins or save your own.</p>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {combinedPresets.map((preset) => (
          <button
            key={preset.id}
            type="button"
            onClick={() => onLoad(preset)}
            className="group rounded-xl border border-white/10 bg-white/5 p-3 text-left transition hover:border-cyan-400/50"
          >
            <div className="text-sm font-semibold text-slate-100">{preset.name}</div>
            <div className="text-[11px] text-slate-400 capitalize">{preset.type} gradient</div>
            <div className="mt-2 flex items-center gap-1">
              {preset.stops.slice(0, 4).map((stop) => (
                <span
                  key={stop.id}
                  className="h-2 w-6 rounded-full border border-white/10"
                  style={{ backgroundColor: stop.color }}
                />
              ))}
            </div>
          </button>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name your preset"
          className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100"
        />
        <button
          type="submit"
          className="px-3 py-2 text-sm rounded-lg border border-cyan-400/40 text-cyan-200 bg-cyan-500/10"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default PresetsPanel;
