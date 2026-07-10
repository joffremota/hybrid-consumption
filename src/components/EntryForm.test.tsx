import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { EntryForm } from './EntryForm';

describe('EntryForm', () => {
  it('accepts negative electric energy readings', async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();

    render(<EntryForm onSubmit={handleSubmit} onCancelEdit={vi.fn()} />);

    await user.type(screen.getByLabelText(/Distancia/i), '50');
    await user.type(screen.getByLabelText(/Energia/i), '-0.4');
    await user.type(screen.getByLabelText(/Combustivel/i), '5');
    await user.click(screen.getByRole('button', { name: /Calcular e salvar/i }));

    expect(handleSubmit).toHaveBeenCalledOnce();
    expect(handleSubmit.mock.calls[0][0]).toMatchObject({
      distanceKm: 50,
      electricKwhPer100Km: -0.4,
      fuelLitersPer100Km: 5,
      readingKind: 'cumulative'
    });
  });
});
