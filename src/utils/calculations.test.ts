import { describe, expect, it } from 'vitest';
import { calculateMetrics } from './calculations';

describe('calculateMetrics', () => {
  it('calculates totals for a simple 100 km case', () => {
    const result = calculateMetrics(
      {
        distanceKm: 100,
        electricKwhPer100Km: 10,
        fuelLitersPer100Km: 5
      },
      8.9
    );

    expect(result.totalElectricKwh).toBe(10);
    expect(result.totalFuelLiters).toBe(5);
    expect(result.totalEquivalentKwh).toBe(54.5);
    expect(result.electricShare).toBeCloseTo(10 / 54.5);
  });

  it('calculates totals for the provided cumulative sample', () => {
    const result = calculateMetrics(
      {
        distanceKm: 374,
        electricKwhPer100Km: 1.9,
        fuelLitersPer100Km: 5
      },
      8.9
    );

    expect(result.totalElectricKwh).toBeCloseTo(7.106, 3);
    expect(result.totalFuelLiters).toBeCloseTo(18.7, 3);
    expect(result.fuelShare).toBeGreaterThan(result.electricShare);
  });

  it('returns zero shares when both sources are zero', () => {
    const result = calculateMetrics(
      {
        distanceKm: 50,
        electricKwhPer100Km: 0,
        fuelLitersPer100Km: 0
      },
      8.9
    );

    expect(result.electricShare).toBe(0);
    expect(result.fuelShare).toBe(0);
  });
});
