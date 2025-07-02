import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../src/components/Navbar/Navbar';
import { CartContext } from '../src/context/CartContext';
import '@testing-library/jest-dom';

// Mock localStorage
global.localStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
} as any;

global.window = Object.create(window);
global.window.location = { reload: vi.fn() } as any;

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const cartMock = [
  { id: 1, name: 'Martillo', quantity: 2 },
  { id: 2, name: 'Clavos', quantity: 3 },
];

const renderNavbar = (cart = cartMock, animateCart = false) =>
  render(
    <CartContext.Provider value={{ cart, animateCart }}>
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    </CartContext.Provider>
  );

describe('Navbar', () => {
  beforeEach(() => {
    (global.localStorage.getItem as any).mockReset && (global.localStorage.getItem as any).mockReset();
    (global.localStorage.setItem as any).mockReset && (global.localStorage.setItem as any).mockReset();
    (global.localStorage.removeItem as any).mockReset && (global.localStorage.removeItem as any).mockReset();
    (window.location.reload as any).mockReset && (window.location.reload as any).mockReset();
    mockNavigate.mockReset();
    // Mock fetch for sucursales
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([
          { id: 1, nom_sucursal: 'Central' },
          { id: 2, nom_sucursal: 'Norte' },
        ]),
      })
    ) as any;
  });
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renderiza el nombre de la marca y los enlaces principales', async () => {
    renderNavbar();
    expect(await screen.findByText('Ferremas')).toBeInTheDocument();
    expect(screen.getByText('Catálogo')).toBeInTheDocument();
    expect(screen.getByText('Contacto')).toBeInTheDocument();
  });

  it('renderiza el input de búsqueda y permite escribir', async () => {
    renderNavbar();
    const input = screen.getByPlaceholderText('Buscar...');
    expect(input).toBeInTheDocument();
    fireEvent.change(input, { target: { value: 'martillo' } });
    expect(input).toHaveValue('martillo');
  });

  it('renderiza el botón de carrito y muestra el badge con la suma de cantidades', async () => {
    renderNavbar();
    const cartButton = screen.getByLabelText('Ver carrito');
    expect(cartButton).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument(); // 2+3
  });

  it('renderiza el select de sucursales y muestra las opciones', async () => {
    renderNavbar();
    const select = await screen.findByRole('combobox');
    expect(select).toBeInTheDocument();
    expect(screen.getByText('Central')).toBeInTheDocument();
    expect(screen.getByText('Norte')).toBeInTheDocument();
  });

  it('permite cambiar el valor del input de búsqueda y dispara navegación al buscar', async () => {
    renderNavbar();
    const input = screen.getByPlaceholderText('Buscar...');
    fireEvent.change(input, { target: { value: 'clavo' } });
    const button = screen.getByRole('button', { name: /buscar/i });
    fireEvent.click(button);
    expect(mockNavigate).toHaveBeenCalledWith('/catalog?search=clavo');
  });

  it('muestra el enlace de login si no está autenticado', async () => {
    (global.localStorage.getItem as any).mockImplementation((key: string) => {
      if (key === 'access_token') return null;
      return null;
    });
    renderNavbar();
    expect(await screen.findByText('Iniciar Sesión')).toBeInTheDocument();
  });
});
