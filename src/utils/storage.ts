import type { AppSettings, ConsumptionEntry } from '../types';
import { DEFAULT_EQUIVALENT_KWH_PER_LITER } from './calculations';

const HISTORY_KEY = 'hybrid-consumption:history';
const SETTINGS_KEY = 'hybrid-consumption:settings';

export function loadHistory(): ConsumptionEntry[] {
  const raw = localStorage.getItem(HISTORY_KEY);
  if (!raw) {
    return [];
  }

  try {
    return JSON.parse(raw) as ConsumptionEntry[];
  } catch {
    return [];
  }
}

export function saveHistory(entries: ConsumptionEntry[]): void {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(entries));
}

export function loadSettings(): AppSettings {
  const raw = localStorage.getItem(SETTINGS_KEY);
  if (!raw) {
    return { energyEquivalentKwhPerLiter: DEFAULT_EQUIVALENT_KWH_PER_LITER };
  }

  try {
    return JSON.parse(raw) as AppSettings;
  } catch {
    return { energyEquivalentKwhPerLiter: DEFAULT_EQUIVALENT_KWH_PER_LITER };
  }
}

export function saveSettings(settings: AppSettings): void {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}
