import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Card from '../src/components/Card/Card';
import '@testing-library/jest-dom';

// Mocks
const addToCartMock = vi.fn();
vi.mock('../src/context/CartContext', () => ({
  useCart: () => ({ addToCart: addToCartMock })
}));
vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn()
}));

globalThis.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([{ stock: 10 }])
  })
) as any;

describe('Card (unit-ish)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (fetch as any).mockClear();
    addToCartMock.mockClear();
  });

  it('renderiza el título, descripción y precio', async () => {
    render(<Card id="1" image="img.jpg" title="Producto Test" description="desc" price={1000} cartQuantity={0} />);
    expect(screen.getByText('Producto Test')).toBeInTheDocument();
    expect(screen.getByText('desc')).toBeInTheDocument();
    expect(screen.getByText('$1000')).toBeInTheDocument();
  });

  it('muestra la cantidad inicial en 1', async () => {
    render(<Card id="1" image="img.jpg" title="Test" description="desc" price={1000} cartQuantity={0} />);
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('no permite reducir la cantidad por debajo de 1', async () => {
    render(<Card id="1" image="img.jpg" title="Test" description="desc" price={1000} cartQuantity={0} />);
    const minus = screen.getByRole('button', { name: '-' });
    fireEvent.click(minus);
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('aumenta la cantidad al hacer click en +', async () => {
    render(<Card id="1" image="img.jpg" title="Test" description="desc" price={1000} cartQuantity={0} />);
    // Espera a que el botón de agregar esté habilitado (stock cargado)
    await waitFor(() => expect(screen.getByLabelText('Agregar al carrito')).not.toBeDisabled());
    const plus = screen.getByRole('button', { name: '+' });
    fireEvent.click(plus);
    const counter = plus.parentElement;
    const span = counter?.querySelector('span');
    await waitFor(() => {
      expect(span).toHaveTextContent('2');
    });
  });

  it('deshabilita el botón de agregar si no hay stock', async () => {
    (fetch as any).mockImplementationOnce(() => Promise.resolve({ ok: true, json: () => Promise.resolve([{ stock: 0 }]) }));
    render(<Card id="1" image="img.jpg" title="Test" description="desc" price={1000} cartQuantity={0} />);
    await waitFor(() => expect(screen.getByLabelText('Agregar al carrito')).toBeDisabled());
  });

  it('llama a addToCart al hacer click en agregar', async () => {
    render(<Card id="1" image="img.jpg" title="Test" description="desc" price={1000} cartQuantity={0} />);
    const btn = await screen.findByLabelText('Agregar al carrito');
    fireEvent.click(btn);
    expect(addToCartMock).toHaveBeenCalled();
  });
});
