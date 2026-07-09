import type { AppSettings } from '../types';

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

      <p className="helper-text">
        Valor padrao: 8.9 kWh/L. Ajuste se quiser usar outra referencia energetica para gasolina.
      </p>
    </section>
  );
}
