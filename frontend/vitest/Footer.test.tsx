import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../src/components/Footer/Footer';
import '@testing-library/jest-dom';

describe('Footer', () => {
  it('renderiza el nombre de la marca', () => {
    render(<Footer />);
    expect(screen.getByText('Ferremas')).toBeInTheDocument();
  });

  it('renderiza la descripción de la marca', () => {
    render(<Footer />);
    expect(
      screen.getByText(/Tu ferretería de confianza/i)
    ).toBeInTheDocument();
  });

  it('renderiza los enlaces rápidos con sus textos', () => {
    render(<Footer />);
    expect(screen.getByText('Catálogo')).toBeInTheDocument();
    expect(screen.getByText('Preguntas Frecuentes')).toBeInTheDocument();
    expect(screen.getByText('Contacto')).toBeInTheDocument();
  });

  it('renderiza los enlaces de redes sociales', () => {
    render(<Footer />);
    expect(screen.getByLabelText('Facebook')).toBeInTheDocument();
    expect(screen.getByLabelText('Instagram')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('los enlaces de redes sociales tienen los atributos correctos', () => {
    render(<Footer />);
    const facebook = screen.getByLabelText('Facebook');
    const instagram = screen.getByLabelText('Instagram');
    const email = screen.getByLabelText('Email');
    expect(facebook).toHaveAttribute('href', 'https://facebook.com');
    expect(facebook).toHaveAttribute('target', '_blank');
    expect(facebook).toHaveAttribute('rel', 'noopener noreferrer');
    expect(instagram).toHaveAttribute('href', 'https://instagram.com');
    expect(instagram).toHaveAttribute('target', '_blank');
    expect(instagram).toHaveAttribute('rel', 'noopener noreferrer');
    expect(email).toHaveAttribute('href', 'mailto:contacto@ferremas.cl');
  });

  it('renderiza el copyright con el año actual', () => {
    render(<Footer />);
    const year = new Date().getFullYear();
    expect(
      screen.getByText(new RegExp(`© ${year} Ferremas. Todos los derechos reservados.`))
    ).toBeInTheDocument();
  });

  it('la sección principal tiene la clase bg-gray-900', () => {
    render(<Footer />);
    // Busca el elemento <footer> y verifica la clase
    const footer = screen.getByRole('contentinfo');
    expect(footer).toHaveClass('bg-red-800'); // La clase principal del footer
  });
});
