import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Hero from '../src/components/Hero/Hero';
import '@testing-library/jest-dom';

describe('Hero', () => {
  it('renderiza el título principal', () => {
    render(
      <MemoryRouter>
        <Hero />
      </MemoryRouter>
    );
    expect(
      screen.getByText('Herramientas profesionales para tus proyectos')
    ).toBeInTheDocument();
  });

  it('renderiza el texto descriptivo', () => {
    render(
      <MemoryRouter>
        <Hero />
      </MemoryRouter>
    );
    expect(
      screen.getByText(/Encuentra todo lo que necesitas/i)
    ).toBeInTheDocument();
  });

  it('renderiza el botón "Ver productos" con el enlace correcto', () => {
    render(
      <MemoryRouter>
        <Hero />
      </MemoryRouter>
    );
    const link = screen.getByRole('link', { name: /ver productos/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/catalog');
  });

  it('renderiza el botón "Contactar" con el enlace correcto', () => {
    render(
      <MemoryRouter>
        <Hero />
      </MemoryRouter>
    );
    const link = screen.getByRole('link', { name: /contactar/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/contact');
  });

  it('renderiza la imagen de fondo con el alt correcto', () => {
    render(
      <MemoryRouter>
        <Hero />
      </MemoryRouter>
    );
    const img = screen.getByAltText('Ferretería profesional');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', expect.stringContaining('unsplash.com'));
  });

  it('la sección principal tiene la clase bg-gray-900', () => {
    render(
      <MemoryRouter>
        <Hero />
      </MemoryRouter>
    );
    // Selecciona el primer <section> del documento
    const section = document.querySelector('section');
    expect(section).toHaveClass('bg-gray-900');
  });
});
