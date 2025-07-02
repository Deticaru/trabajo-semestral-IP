import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import CartItem from '../src/components/CartItem/CartItem';
import * as CartContextModule from '../src/context/CartContext';
import '@testing-library/jest-dom';

const CartContext = CartContextModule.CartContext;

// Mock CartContext
const updateQuantityMock = vi.fn();
const removeFromCartMock = vi.fn();
const MockCartProvider = ({ children }: { children: React.ReactNode }) => (
  <CartContext.Provider value={{
    cart: [],
    addToCart: vi.fn(),
    removeFromCart: removeFromCartMock,
    updateQuantity: updateQuantityMock,
    clearCart: vi.fn(),
    animateCart: false,
  }}>
    {children}
  </CartContext.Provider>
);

const item = {
  id: '1',
  title: 'Producto Test',
  image: 'img.jpg',
  price: 1000,
  quantity: 1,
};

describe('CartItem', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renderiza título, precio y cantidad', () => {
    render(<MockCartProvider><CartItem item={item} /></MockCartProvider>);
    expect(screen.getByText('Producto Test')).toBeInTheDocument();
    expect(screen.getByText('$1,000')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('el botón - está deshabilitado si cantidad es 1', () => {
    render(<MockCartProvider><CartItem item={item} /></MockCartProvider>);
    const minus = screen.getByRole('button', { name: '-' });
    expect(minus).toBeDisabled();
  });

  it('el botón + está deshabilitado si cantidad es igual al stock máximo', () => {
    render(<MockCartProvider><CartItem item={{ ...item, quantity: 5 }} maxStock={5} /></MockCartProvider>);
    const plus = screen.getByRole('button', { name: '+' });
    expect(plus).toBeDisabled();
  });

  it('llama a updateQuantity con cantidad -1 al hacer click en -', () => {
    render(<MockCartProvider><CartItem item={{ ...item, quantity: 2 }} /></MockCartProvider>);
    const minus = screen.getByRole('button', { name: '-' });
    fireEvent.click(minus);
    expect(updateQuantityMock).toHaveBeenCalledWith('1', 1);
  });

  it('llama a updateQuantity con cantidad +1 al hacer click en +', () => {
    render(<MockCartProvider><CartItem item={item} /></MockCartProvider>);
    const plus = screen.getByRole('button', { name: '+' });
    fireEvent.click(plus);
    expect(updateQuantityMock).toHaveBeenCalledWith('1', 2);
  });

  it('llama a removeFromCart al hacer click en Eliminar', () => {
    render(<MockCartProvider><CartItem item={item} /></MockCartProvider>);
    const btn = screen.getByText('Eliminar');
    fireEvent.click(btn);
    expect(removeFromCartMock).toHaveBeenCalledWith('1');
  });
});
