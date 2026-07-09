import { useEffect, useState } from 'react';
import type { ConsumptionEntry, ReadingKind, VehicleProfile } from '../types';

interface EntryFormProps {
  initialEntry?: ConsumptionEntry | null;
  onSubmit: (entry: ConsumptionEntry) => void;
  onCancelEdit: () => void;
}

interface FormState {
  vehicleProfile: VehicleProfile;
  distanceKm: string;
  electricKwhPer100Km: string;
  fuelLitersPer100Km: string;
  readingKind: ReadingKind;
  recordedAt: string;
  notes: string;
}

const emptyState: FormState = {
  vehicleProfile: 'byd-king',
  distanceKm: '',
  electricKwhPer100Km: '',
  fuelLitersPer100Km: '',
  readingKind: 'cumulative',
  recordedAt: new Date().toISOString().slice(0, 10),
  notes: ''
};

function toFormState(entry: ConsumptionEntry): FormState {
  return {
    vehicleProfile: entry.vehicleProfile,
    distanceKm: String(entry.distanceKm),
    electricKwhPer100Km: String(entry.electricKwhPer100Km),
    fuelLitersPer100Km: String(entry.fuelLitersPer100Km),
    readingKind: entry.readingKind,
    recordedAt: entry.recordedAt,
    notes: entry.notes
  };
}

export function EntryForm({ initialEntry, onSubmit, onCancelEdit }: EntryFormProps) {
  const [form, setForm] = useState<FormState>(emptyState);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    setForm(initialEntry ? toFormState(initialEntry) : emptyState);
    setError('');
  }, [initialEntry]);

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const distanceKm = Number(form.distanceKm);
    const electricKwhPer100Km = Number(form.electricKwhPer100Km);
    const fuelLitersPer100Km = Number(form.fuelLitersPer100Km);

    if (distanceKm <= 0 || Number.isNaN(distanceKm)) {
      setError('Informe uma distancia maior que zero.');
      return;
    }

    if (electricKwhPer100Km < 0 || Number.isNaN(electricKwhPer100Km)) {
      setError('Consumo eletrico invalido.');
      return;
    }

    if (fuelLitersPer100Km < 0 || Number.isNaN(fuelLitersPer100Km)) {
      setError('Consumo de combustivel invalido.');
      return;
    }

    onSubmit({
      id: initialEntry?.id ?? crypto.randomUUID(),
      vehicleProfile: form.vehicleProfile,
      distanceKm,
      electricKwhPer100Km,
      fuelLitersPer100Km,
      readingKind: form.readingKind,
      recordedAt: form.recordedAt,
      notes: form.notes.trim()
    });

    if (!initialEntry) {
      setForm(emptyState);
    }
    setError('');
  }

  return (
    <section className="panel panel-form">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Nova medicao</p>
          <h2>{initialEntry ? 'Editar registro' : 'Registrar leitura'}</h2>
        </div>
        {initialEntry ? (
          <button type="button" className="ghost-button" onClick={onCancelEdit}>
            Cancelar edicao
          </button>
        ) : null}
      </div>

      <form className="form-grid" onSubmit={handleSubmit}>
        <label>
          Perfil do veiculo
          <select
            value={form.vehicleProfile}
            onChange={(event) => updateField('vehicleProfile', event.target.value as VehicleProfile)}
          >
            <option value="byd-king">BYD King</option>
            <option value="generic-phev">Hibrido plug-in generico</option>
          </select>
        </label>

        <label>
          Tipo da leitura
          <select
            value={form.readingKind}
            onChange={(event) => updateField('readingKind', event.target.value as ReadingKind)}
          >
            <option value="cumulative">Acumulada</option>
            <option value="trip">Trecho</option>
          </select>
        </label>

        <label>
          Distancia (km)
          <input
            type="number"
            min="0.1"
            step="0.1"
            value={form.distanceKm}
            onChange={(event) => updateField('distanceKm', event.target.value)}
            placeholder="374"
          />
        </label>

        <label>
          Energia (kWh/100 km)
          <input
            type="number"
            min="0"
            step="0.1"
            value={form.electricKwhPer100Km}
            onChange={(event) => updateField('electricKwhPer100Km', event.target.value)}
            placeholder="1.9"
          />
        </label>

        <label>
          Combustivel (L/100 km)
          <input
            type="number"
            min="0"
            step="0.1"
            value={form.fuelLitersPer100Km}
            onChange={(event) => updateField('fuelLitersPer100Km', event.target.value)}
            placeholder="5.0"
          />
        </label>

        <label>
          Data
          <input
            type="date"
            value={form.recordedAt}
            onChange={(event) => updateField('recordedAt', event.target.value)}
          />
        </label>

        <label className="full-width">
          Observacoes
          <textarea
            rows={3}
            value={form.notes}
            onChange={(event) => updateField('notes', event.target.value)}
            placeholder="Ex.: AEC cumulativo do app da BYD"
          />
        </label>

        {error ? <p className="form-error">{error}</p> : null}

        <div className="full-width form-actions">
          <button type="submit" className="primary-button">
            {initialEntry ? 'Salvar alteracoes' : 'Calcular e salvar'}
          </button>
        </div>
      </form>

      <p className="helper-text">
        Para BYD King, use os dados do app como aparecem em "AEC cumulativo" ou "Energia ult. 50 km".
      </p>
    </section>
  );
}
