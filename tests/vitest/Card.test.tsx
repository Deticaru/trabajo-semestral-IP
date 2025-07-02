import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import Card from '../src/components/Card/Card';

// Mock mínimo para evitar error de contexto
vi.mock('../../frontend/src/context/CartContext', () => ({
  useCart: () => ({ addToCart: () => {} })
}));

describe('Card', () => {
  it('no permite reducir la cantidad por debajo de 1', async () => {
    render(
      <Card
        id="1"
        image="img.jpg"
        title="Producto Test"
        description="desc"
        price={1000}
        cartQuantity={0}
      />
    );
    const minus = screen.getByRole('button', { name: /-/ });
    const quantity = screen.getByText('1');
    await userEvent.click(minus);
    expect(quantity.textContent).toBe('1');
  });
});
