import React from 'react'
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Card from '../src/components/Card/Card';

vi.mock('../../frontend/src/context/CartContext', () => ({
  useCart: () => ({ addToCart: () => {} })
}));

describe('Card', () => {
  it('no permite reducir la cantidad por debajo de 1', async () => {
    render(
      <MemoryRouter>
        <Card
          id="1"
          image="img.jpg"
          title="Producto Test"
          description="desc"
          price={1000}
          cartQuantity={0}
        />
      </MemoryRouter>
    );
    const minus = screen.getByRole('button', { name: /-/ });
    const quantity = screen.getByText('1');
    await userEvent.click(minus);
    expect(quantity.textContent).toBe('1');
  });
});
