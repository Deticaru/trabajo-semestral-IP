import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ContactForm from '../src/components/ContactForm/ContactForm';
import '@testing-library/jest-dom';

vi.mock('axios', () => ({
  default: { post: vi.fn() }
}));
vi.mock('@emailjs/browser', () => ({
  default: { send: vi.fn() }
}));
import axios from 'axios';
import emailjs from '@emailjs/browser';

const fillForm = () => {
  fireEvent.change(screen.getByPlaceholderText('Tu nombre'), { target: { value: 'Juan' } });
  fireEvent.change(screen.getByPlaceholderText('Tu correo electrónico'), { target: { value: 'juan@mail.com' } });
  fireEvent.change(screen.getByPlaceholderText('Tu mensaje'), { target: { value: 'Hola!' } });
};

describe('ContactForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (axios.post as any).mockReset && (axios.post as any).mockReset();
    (emailjs.send as any).mockReset && (emailjs.send as any).mockReset();
  });

  it('renderiza los campos de nombre, email y mensaje', () => {
    render(<ContactForm />);
    expect(screen.getByPlaceholderText('Tu nombre')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Tu correo electrónico')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Tu mensaje')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /enviar/i })).toBeInTheDocument();
  });

  it('el botón muestra "Enviando..." y se deshabilita al enviar', async () => {
    (axios.post as any).mockResolvedValue({});
    (emailjs.send as any).mockResolvedValue({});
    render(<ContactForm />);
    fillForm();
    fireEvent.click(screen.getByRole('button', { name: /enviar/i }));
    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByRole('button')).toHaveTextContent('Enviando...');
    await waitFor(() => expect(screen.getByRole('button')).not.toBeDisabled());
  });

  it('llama a axios.post y emailjs.send al enviar', async () => {
    (axios.post as any).mockResolvedValue({});
    (emailjs.send as any).mockResolvedValue({});
    render(<ContactForm />);
    fillForm();
    fireEvent.click(screen.getByRole('button', { name: /enviar/i }));
    await waitFor(() => expect(axios.post).toHaveBeenCalled());
    await waitFor(() => expect(emailjs.send).toHaveBeenCalled());
  });

  it('muestra mensaje de éxito tras envío exitoso', async () => {
    (axios.post as any).mockResolvedValue({});
    (emailjs.send as any).mockResolvedValue({});
    render(<ContactForm />);
    fillForm();
    fireEvent.click(screen.getByRole('button', { name: /enviar/i }));
    await waitFor(() => expect(emailjs.send).toHaveBeenCalled());
    await waitFor(() => expect(screen.getByText(/¡Mensaje enviado correctamente!/)).toBeInTheDocument(), { timeout: 2000 });
  });

  it('muestra mensaje de error si ocurre un error', async () => {
    (axios.post as any).mockRejectedValue(new Error('fail'));
    render(<ContactForm />);
    fillForm();
    fireEvent.click(screen.getByRole('button', { name: /enviar/i }));
    await waitFor(() => expect(screen.getByText(/Hubo un error/)).toBeInTheDocument());
  });

  it('limpia los campos tras un envío exitoso', async () => {
    (axios.post as any).mockResolvedValue({});
    (emailjs.send as any).mockResolvedValue({});
    render(<ContactForm />);
    fillForm();
    fireEvent.click(screen.getByRole('button', { name: /enviar/i }));
    await waitFor(() => expect(emailjs.send).toHaveBeenCalled());
    await waitFor(() => expect(screen.getByText(/¡Mensaje enviado correctamente!/)).toBeInTheDocument(), { timeout: 2000 });
    await waitFor(() => expect(screen.getByPlaceholderText('Tu nombre')).toHaveValue(''));
    expect(screen.getByPlaceholderText('Tu correo electrónico')).toHaveValue('');
    expect(screen.getByPlaceholderText('Tu mensaje')).toHaveValue('');
  });
});
