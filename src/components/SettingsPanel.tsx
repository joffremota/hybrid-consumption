import type { AppSettings } from '../types';
import { DEFAULT_EQUIVALENT_KWH_PER_LITER } from '../utils/calculations';

interface SettingsPanelProps {
  settings: AppSettings;
  onChange: (settings: AppSettings) => void;
}

export function SettingsPanel({ settings, onChange }: SettingsPanelProps) {
  return (
    <section className="panel settings-panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Configuracao</p>
          <h2>Equivalencia energetica</h2>
        </div>
      </div>

      <label>
        kWh equivalentes por litro de combustivel
        <input
          type="number"
          min="0.1"
          step="0.1"
          value={settings.energyEquivalentKwhPerLiter}
          onChange={(event) =>
            onChange({
              ...settings,
              energyEquivalentKwhPerLiter: Number(event.target.value)
            })
          }
        />
      </label>

      <div className="form-actions">
        <button
          type="button"
          className="ghost-button"
          onClick={() =>
            onChange({
              ...settings,
              energyEquivalentKwhPerLiter: DEFAULT_EQUIVALENT_KWH_PER_LITER
            })
          }
        >
          Restaurar default EPA / MPGe (8.9 kWh/L)
        </button>
      </div>

      <p className="helper-text">
        O valor padrao de 8.9 kWh/L vem da convencao EPA/MPGe: 33.7 kWh por galao
        americano de gasolina, o que equivale a aproximadamente 8.9 kWh por litro.
      </p>

      <p className="helper-text">
        Isso e uma referencia de comparacao energetica, nao de custo nem de
        eficiencia real do motor. Para gasolina brasileira, a equivalencia por litro
        pode variar conforme composicao e criterio adotado.
      </p>
    </section>
  );
}
