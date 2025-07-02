import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import BackToTop from '../src/components/BackToTop/BackToTop';

// Mock scrollTo
beforeEach(() => {
  window.scrollTo = vi.fn();
});

describe('BackToTop (unit-ish)', () => {
  it('no muestra el botón si scrollY <= 200', () => {
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true });
    render(<BackToTop />);
    expect(screen.queryByRole('button')).toBeNull();
  });

  it('muestra el botón si scrollY > 200', () => {
    Object.defineProperty(window, 'scrollY', { value: 300, writable: true });
    render(<BackToTop />);
    // Simula scroll
    fireEvent.scroll(window);
    expect(screen.queryByRole('button')).not.toBeNull();
  });

  it('al hacer click en el botón llama a scrollTo', () => {
    Object.defineProperty(window, 'scrollY', { value: 300, writable: true });
    render(<BackToTop />);
    fireEvent.scroll(window);
    const btn = screen.getByRole('button');
    fireEvent.click(btn);
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });

  it('el botón tiene la clase button', () => {
    Object.defineProperty(window, 'scrollY', { value: 300, writable: true });
    render(<BackToTop />);
    fireEvent.scroll(window);
    const btn = screen.getByRole('button');
    expect(btn.className).toContain('button');
  });

  it('el botón no aparece tras desmontar el componente', () => {
    Object.defineProperty(window, 'scrollY', { value: 300, writable: true });
    const { unmount } = render(<BackToTop />);
    fireEvent.scroll(window);
    unmount();
    expect(screen.queryByRole('button')).toBeNull();
  });
});
