import { GradientState } from '../types/gradient';

const STORAGE_KEY = 'gradient-composer:last';
const PRESET_KEY = 'gradient-composer:presets';

export const saveGradientToLocalStorage = (state: GradientState) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error('Failed to persist gradient', err);
  }
};

export const loadGradientFromLocalStorage = (): GradientState | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as GradientState;
  } catch (err) {
    console.error('Failed to load gradient', err);
    return null;
  }
};

export type Preset = GradientState & { id: string; name: string; builtIn?: boolean };

export const loadPresets = (): Preset[] => {
  try {
    const raw = localStorage.getItem(PRESET_KEY);
    return raw ? (JSON.parse(raw) as Preset[]) : [];
  } catch (err) {
    console.error('Failed to load presets', err);
    return [];
  }
};

export const savePresets = (presets: Preset[]) => {
  try {
    localStorage.setItem(PRESET_KEY, JSON.stringify(presets));
  } catch (err) {
    console.error('Failed to save presets', err);
  }
};
