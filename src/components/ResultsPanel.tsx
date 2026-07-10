import type { ConsumptionEntry, AppSettings } from '../types';
import { calculateMetrics, formatNumber } from '../utils/calculations';

interface ResultsPanelProps {
  selectedEntry: ConsumptionEntry | null;
  settings: AppSettings;
}

export function ResultsPanel({ selectedEntry, settings }: ResultsPanelProps) {
  if (!selectedEntry) {
    return (
      <section className="panel panel-results empty-state">
        <p className="eyebrow">Resultados</p>
        <h2>Adicione uma medicao para ver o comparativo</h2>
      </section>
    );
  }

  const metrics = calculateMetrics(selectedEntry, settings.energyEquivalentKwhPerLiter);
  const hasElectricRecovery = metrics.electricRecoveredKwh > 0;

  return (
    <section className="panel panel-results">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Resultados</p>
          <h2>Participacao energetica</h2>
        </div>
        <span className="pill">{selectedEntry.readingKind === 'cumulative' ? 'Acumulada' : 'Trecho'}</span>
      </div>

      <div className="share-grid">
        <article className="share-card electric">
          <span>{hasElectricRecovery ? 'Saldo eletrico' : 'Eletricidade'}</span>
          <strong>{formatNumber(metrics.electricShare * 100)}%</strong>
          <small>
            {hasElectricRecovery
              ? `${formatNumber(metrics.electricRecoveredKwh)} kWh recuperados`
              : `${formatNumber(metrics.electricConsumedKwh)} kWh totais`}
          </small>
        </article>

        <article className="share-card fuel">
          <span>Combustivel</span>
          <strong>{formatNumber(metrics.fuelShare * 100)}%</strong>
          <small>{formatNumber(metrics.totalFuelLiters)} L totais</small>
        </article>
      </div>

      <div className="metrics-grid">
        <article className="metric-card">
          <span>{hasElectricRecovery ? 'Saldo kWh/km' : 'kWh/km'}</span>
          <strong>{formatNumber(metrics.electricKwhPerKm, 3)}</strong>
        </article>
        <article className="metric-card">
          <span>L/km</span>
          <strong>{formatNumber(metrics.fuelLitersPerKm, 3)}</strong>
        </article>
        <article className="metric-card">
          <span>km/L</span>
          <strong>{metrics.kmPerLiter === null ? 'Sem uso de combustivel' : formatNumber(metrics.kmPerLiter, 2)}</strong>
        </article>
        <article className="metric-card">
          <span>Energia equivalente total</span>
          <strong>{formatNumber(metrics.totalEquivalentKwh)} kWh-eq</strong>
        </article>
        <article className="metric-card">
          <span>Distancia analisada</span>
          <strong>{formatNumber(selectedEntry.distanceKm)} km</strong>
        </article>
      </div>
    </section>
  );
}
