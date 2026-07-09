import { useEffect, useMemo, useState } from 'react';
import { EntryForm } from './components/EntryForm';
import { HistoryList } from './components/HistoryList';
import { ResultsPanel } from './components/ResultsPanel';
import { SettingsPanel } from './components/SettingsPanel';
import type { AppSettings, ConsumptionEntry } from './types';
import { loadHistory, loadSettings, saveHistory, saveSettings } from './utils/storage';

function sortEntries(entries: ConsumptionEntry[]): ConsumptionEntry[] {
  return [...entries].sort((a, b) => b.recordedAt.localeCompare(a.recordedAt));
}

export default function App() {
  const readmeUrl = 'https://github.com/joffremota/hybrid-consumption#readme';

  const [entries, setEntries] = useState<ConsumptionEntry[]>(() => sortEntries(loadHistory()));
  const [settings, setSettings] = useState<AppSettings>(() => loadSettings());
  const [selectedEntryId, setSelectedEntryId] = useState<string | null>(entries[0]?.id ?? null);
  const [editingEntry, setEditingEntry] = useState<ConsumptionEntry | null>(null);

  useEffect(() => {
    saveHistory(entries);
  }, [entries]);

  useEffect(() => {
    saveSettings(settings);
  }, [settings]);

  const selectedEntry = useMemo(
    () => entries.find((entry) => entry.id === selectedEntryId) ?? null,
    [entries, selectedEntryId]
  );

  function upsertEntry(entry: ConsumptionEntry) {
    setEntries((current) => {
      const exists = current.some((item) => item.id === entry.id);
      const updated = exists ? current.map((item) => (item.id === entry.id ? entry : item)) : [entry, ...current];
      return sortEntries(updated);
    });
    setSelectedEntryId(entry.id);
    setEditingEntry(null);
  }

  function deleteEntry(entryId: string) {
    setEntries((current) => {
      const nextEntries = current.filter((entry) => entry.id !== entryId);
      if (selectedEntryId === entryId) {
        setSelectedEntryId(nextEntries[0]?.id ?? null);
      }
      return nextEntries;
    });
    if (editingEntry?.id === entryId) {
      setEditingEntry(null);
    }
  }

  return (
    <div className="app-shell">
      <header className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Open source utility</p>
          <h1>Consumo de hibrido sem depender do app da montadora</h1>
          <p>
            Compare quanto do seu uso veio de eletricidade e quanto veio de combustivel com base nas leituras
            por 100 km.
          </p>
          <div className="hero-actions">
            <a className="primary-link" href={readmeUrl} target="_blank" rel="noreferrer">
              Ver README e instrucoes
            </a>
          </div>
        </div>
        <div className="hero-highlight">
          <span>Exemplo real</span>
          <strong>374 km</strong>
          <small>1.9 kWh/100 km + 5.0 L/100 km</small>
        </div>
      </header>

      <main className="content-grid">
        <div className="left-column">
          <EntryForm initialEntry={editingEntry} onSubmit={upsertEntry} onCancelEdit={() => setEditingEntry(null)} />
          <SettingsPanel settings={settings} onChange={setSettings} />
        </div>

        <div className="right-column">
          <ResultsPanel selectedEntry={selectedEntry} settings={settings} />
          <HistoryList
            entries={entries}
            energyEquivalentKwhPerLiter={settings.energyEquivalentKwhPerLiter}
            onSelect={(entry) => setSelectedEntryId(entry.id)}
            onEdit={setEditingEntry}
            onDelete={deleteEntry}
          />
        </div>
      </main>
    </div>
  );
}
