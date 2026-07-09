import type { CalculatedMetrics, ConsumptionEntry } from '../types';

export const DEFAULT_EQUIVALENT_KWH_PER_LITER = 8.9;

export function calculateMetrics(
  entry: Pick<ConsumptionEntry, 'distanceKm' | 'electricKwhPer100Km' | 'fuelLitersPer100Km'>,
  energyEquivalentKwhPerLiter: number
): CalculatedMetrics {
  const totalElectricKwh = (entry.distanceKm * entry.electricKwhPer100Km) / 100;
  const totalFuelLiters = (entry.distanceKm * entry.fuelLitersPer100Km) / 100;
  const equivalentFuelKwh = totalFuelLiters * energyEquivalentKwhPerLiter;
  const totalEquivalentKwh = totalElectricKwh + equivalentFuelKwh;

  return {
    totalElectricKwh,
    totalFuelLiters,
    electricKwhPerKm: entry.electricKwhPer100Km / 100,
    fuelLitersPerKm: entry.fuelLitersPer100Km / 100,
    kmPerLiter: totalFuelLiters === 0 ? null : entry.distanceKm / totalFuelLiters,
    totalEquivalentKwh,
    electricShare: totalEquivalentKwh === 0 ? 0 : totalElectricKwh / totalEquivalentKwh,
    fuelShare: totalEquivalentKwh === 0 ? 0 : equivalentFuelKwh / totalEquivalentKwh
  };
}

export function formatNumber(value: number, maximumFractionDigits = 2): string {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 0,
    maximumFractionDigits
  }).format(value);
}
