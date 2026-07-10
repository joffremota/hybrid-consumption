import type { ConsumptionEntry } from '../types';
import { calculateMetrics, formatNumber } from '../utils/calculations';

interface HistoryListProps {
  entries: ConsumptionEntry[];
  energyEquivalentKwhPerLiter: number;
  onSelect: (entry: ConsumptionEntry) => void;
  onEdit: (entry: ConsumptionEntry) => void;
  onDelete: (entryId: string) => void;
}

export function HistoryList({
  entries,
  energyEquivalentKwhPerLiter,
  onSelect,
  onEdit,
  onDelete
}: HistoryListProps) {
  return (
    <section className="panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Historico</p>
          <h2>Medicoes salvas no navegador</h2>
        </div>
      </div>

      {entries.length === 0 ? (
        <p className="empty-copy">Nenhuma medicao salva ainda.</p>
      ) : (
        <div className="history-list">
          {entries.map((entry) => {
            const metrics = calculateMetrics(entry, energyEquivalentKwhPerLiter);
            const electricSummary =
              metrics.electricRecoveredKwh > 0
                ? `${formatNumber(metrics.electricRecoveredKwh)} kWh recuperados`
                : `${formatNumber(metrics.electricShare * 100)}% eletrico`;

            return (
              <article key={entry.id} className="history-item">
                <button type="button" className="history-main" onClick={() => onSelect(entry)}>
                  <div>
                    <strong>{entry.vehicleProfile === 'byd-king' ? 'BYD King' : 'PHEV generico'}</strong>
                    <span>{entry.recordedAt}</span>
                  </div>
                  <div>
                    <strong>{formatNumber(entry.distanceKm)} km</strong>
                    <span>
                      {electricSummary} / {formatNumber(metrics.fuelShare * 100)}% combustivel
                    </span>
                  </div>
                </button>
                <div className="history-actions">
                  <button type="button" className="ghost-button" onClick={() => onEdit(entry)}>
                    Editar
                  </button>
                  <button type="button" className="ghost-button danger" onClick={() => onDelete(entry.id)}>
                    Excluir
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
