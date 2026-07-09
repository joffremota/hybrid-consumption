export type ReadingKind = 'trip' | 'cumulative';

export type VehicleProfile = 'generic-phev' | 'byd-king';

export interface ConsumptionEntry {
  id: string;
  vehicleProfile: VehicleProfile;
  distanceKm: number;
  electricKwhPer100Km: number;
  fuelLitersPer100Km: number;
  readingKind: ReadingKind;
  recordedAt: string;
  notes: string;
}

export interface AppSettings {
  energyEquivalentKwhPerLiter: number;
}

export interface CalculatedMetrics {
  totalElectricKwh: number;
  totalFuelLiters: number;
  electricKwhPerKm: number;
  fuelLitersPerKm: number;
  totalEquivalentKwh: number;
  electricShare: number;
  fuelShare: number;
}
