import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import type { ConsumptionEntry } from '../types';
import { HistoryList } from './HistoryList';

const baseEntry: ConsumptionEntry = {
  id: 'entry-1',
  vehicleProfile: 'byd-king',
  distanceKm: 100,
  electricKwhPer100Km: 10,
  fuelLitersPer100Km: 5,
  readingKind: 'trip',
  recordedAt: '2026-07-10',
  notes: ''
};

describe('HistoryList', () => {
  it('shows km/L for each saved entry', () => {
    render(
      <HistoryList
        entries={[baseEntry]}
        energyEquivalentKwhPerLiter={8.9}
        onSelect={vi.fn()}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />
    );

    expect(screen.getByText('20 km/L')).toBeTruthy();
  });

  it('shows a no-fuel label when the entry has no fuel consumption', () => {
    render(
      <HistoryList
        entries={[{ ...baseEntry, fuelLitersPer100Km: 0 }]}
        energyEquivalentKwhPerLiter={8.9}
        onSelect={vi.fn()}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />
    );

    expect(screen.getByText('Sem uso de combustivel')).toBeTruthy();
  });
});
