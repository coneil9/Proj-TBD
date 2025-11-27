import { useEffect, useMemo, useState } from 'react';
import CSSExportPanel from './components/CSSExportPanel';
import GradientControls from './components/GradientControls';
import GradientPreview from './components/GradientPreview';
import PresetsPanel from './components/PresetsPanel';
import { GradientState, GradientType } from './types/gradient';
import {
  buildCssGradientString,
  clamp,
  defaultGradient,
  normalizeStops,
} from './utils/gradient';
import {
  loadGradientFromLocalStorage,
  loadPresets,
  Preset,
  saveGradientToLocalStorage,
  savePresets,
} from './utils/storage';

const App = () => {
  const [gradient, setGradient] = useState<GradientState>(() => {
    const saved = loadGradientFromLocalStorage();
    return saved ?? defaultGradient;
  });
  const [presets, setPresets] = useState<Preset[]>(() => loadPresets());

  const gradientString = useMemo(() => buildCssGradientString(gradient), [gradient]);

  useEffect(() => {
    saveGradientToLocalStorage(gradient);
  }, [gradient]);

  const handleTypeChange = (type: GradientType) => {
    setGradient((prev) => ({ ...prev, type }));
  };

  const handleAngleChange = (angle: number) => {
    setGradient((prev) => ({ ...prev, angle: clamp(angle, 0, 360) }));
  };

  const handleStopChange = (id: string, partial: Partial<GradientState['stops'][number]>) => {
    setGradient((prev) => ({
      ...prev,
      stops: normalizeStops(
        prev.stops.map((stop) =>
          stop.id === id
            ? { ...stop, ...partial, position: clamp(partial.position ?? stop.position, 0, 100) }
            : stop,
        ),
      ),
    }));
  };

  const handleAddStop = () => {
    setGradient((prev) => {
      const sorted = normalizeStops(prev.stops);
      // Insert new stop in the widest gap for a sensible default placement.
      let maxGap = -1;
      let insertAt = 50;
      for (let i = 0; i < sorted.length - 1; i += 1) {
        const gap = sorted[i + 1].position - sorted[i].position;
        if (gap > maxGap) {
          maxGap = gap;
          insertAt = Math.round(sorted[i].position + gap / 2);
        }
      }
      const nextStop = {
        id: crypto.randomUUID(),
        color: '#ffffff',
        position: insertAt,
      };
      return { ...prev, stops: normalizeStops([...prev.stops, nextStop]) };
    });
  };

  const handleRemoveStop = (id: string) => {
    setGradient((prev) => ({ ...prev, stops: prev.stops.filter((stop) => stop.id !== id) }));
  };

  // Move a color stop up/down to tweak ordering without changing positions.
  const handleReorderStop = (id: string, direction: 'up' | 'down') => {
    setGradient((prev) => {
      const idx = prev.stops.findIndex((stop) => stop.id === id);
      if (idx === -1) return prev;

      const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
      if (targetIdx < 0 || targetIdx >= prev.stops.length) return prev;

      const nextStops = [...prev.stops];
      const [moved] = nextStops.splice(idx, 1);
      nextStops.splice(targetIdx, 0, moved);

      return { ...prev, stops: nextStops };
    });
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`background: ${gradientString};`);
    } catch (err) {
      console.error('Failed to copy gradient CSS', err);
    }
  };

  const handleSavePreset = (name: string) => {
    const newPreset: Preset = {
      ...gradient,
      id: crypto.randomUUID(),
      name,
    };
    setPresets((prev) => {
      const next = [...prev, newPreset];
      savePresets(next);
      return next;
    });
  };

  const handleLoadPreset = (preset: Preset) => {
    setGradient({
      type: preset.type,
      angle: preset.angle,
      stops: preset.stops,
    });
  };

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
              <span className="font-semibold text-white">07</span>
              <span className="text-slate-400">Presets & persistence</span>
            </div>
          </div>
        </header>

        <main className="grid gap-6 lg:grid-cols-[1.05fr_1fr]">
          <div className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-lg p-6 shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
              <GradientControls
                state={gradient}
                onTypeChange={handleTypeChange}
                onAngleChange={handleAngleChange}
                onStopChange={handleStopChange}
                onAddStop={handleAddStop}
                onRemoveStop={handleRemoveStop}
                onReorderStop={handleReorderStop}
              />
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-lg p-6 shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
              <CSSExportPanel gradientString={gradientString} onCopy={handleCopy} />
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-lg p-6 shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
              <PresetsPanel presets={presets} onSave={handleSavePreset} onLoad={handleLoadPreset} />
            </div>
          </div>
          <GradientPreview gradientString={gradientString} />
        </main>

        <footer className="text-sm text-slate-400 border-t border-white/10 pt-4">
          Next: small UX polish and responsive tweaks.
        </footer>
      </div>
    </div>
  );
};

export default App;
