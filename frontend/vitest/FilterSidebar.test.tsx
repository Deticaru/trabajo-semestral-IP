import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import FilterSidebar from '../src/components/FilterSidebar/FilterSidebar';
import '@testing-library/jest-dom';

const categories = [
  { id: 1, nom_categoria: 'Bebidas' },
  { id: 2, nom_categoria: 'Snacks' },
];
const filters = {
  search: '',
  categories: [],
  minPrice: '',
  maxPrice: '',
  marca: '',
};

describe('FilterSidebar', () => {
  let onFilterChange: any;
  let onSearch: any;

  beforeEach(() => {
    onFilterChange = vi.fn();
    onSearch = vi.fn((e) => e.preventDefault());
  });

  it('renderiza los campos de búsqueda, categorías, precio y marca', () => {
    render(
      <FilterSidebar categories={categories} filters={filters} onFilterChange={onFilterChange} onSearch={onSearch} />
    );
    expect(screen.getByPlaceholderText('Nombre del producto')).toBeInTheDocument();
    expect(screen.getByText('Bebidas')).toBeInTheDocument();
    expect(screen.getByText('Snacks')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Mín')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Máx')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Marca')).toBeInTheDocument();
  });

  it('llama a onFilterChange al cambiar el campo de búsqueda', () => {
    render(
      <FilterSidebar categories={categories} filters={filters} onFilterChange={onFilterChange} onSearch={onSearch} />
    );
    fireEvent.change(screen.getByPlaceholderText('Nombre del producto'), { target: { value: 'agua' } });
    expect(onFilterChange).toHaveBeenCalled();
  });

  it('llama a onFilterChange al marcar una categoría', () => {
    render(
      <FilterSidebar categories={categories} filters={filters} onFilterChange={onFilterChange} onSearch={onSearch} />
    );
    const checkbox = screen.getByLabelText('Bebidas');
    fireEvent.click(checkbox);
    expect(onFilterChange).toHaveBeenCalled();
  });

  it('llama a onFilterChange al cambiar el precio mínimo', () => {
    render(
      <FilterSidebar categories={categories} filters={filters} onFilterChange={onFilterChange} onSearch={onSearch} />
    );
    fireEvent.change(screen.getByPlaceholderText('Mín'), { target: { value: '100' } });
    expect(onFilterChange).toHaveBeenCalled();
  });

  it('llama a onFilterChange al cambiar el campo de marca', () => {
    render(
      <FilterSidebar categories={categories} filters={filters} onFilterChange={onFilterChange} onSearch={onSearch} />
    );
    fireEvent.change(screen.getByPlaceholderText('Marca'), { target: { value: 'Coca' } });
    expect(onFilterChange).toHaveBeenCalled();
  });

  it('llama a onSearch al enviar el formulario', () => {
    render(
      <FilterSidebar categories={categories} filters={filters} onFilterChange={onFilterChange} onSearch={onSearch} />
    );
    fireEvent.submit(screen.getByTestId('filter-form'));
    expect(onSearch).toHaveBeenCalled();
  });

  it('renderiza correctamente la lista de categorías recibida por props', () => {
    const customCategories = [
      { id: 10, nom_categoria: 'Herramientas' },
      { id: 20, nom_categoria: 'Materiales' },
    ];
    render(
      <FilterSidebar categories={customCategories} filters={filters} onFilterChange={onFilterChange} onSearch={onSearch} />
    );
    expect(screen.getByText('Herramientas')).toBeInTheDocument();
    expect(screen.getByText('Materiales')).toBeInTheDocument();
  });

  it('los checkboxes de categorías reflejan el estado de filters.categories', () => {
    const checkedFilters = { ...filters, categories: [1] };
    render(
      <FilterSidebar categories={categories} filters={checkedFilters} onFilterChange={onFilterChange} onSearch={onSearch} />
    );
    const checkbox = screen.getByLabelText('Bebidas');
    expect(checkbox).toBeChecked();
    const otherCheckbox = screen.getByLabelText('Snacks');
    expect(otherCheckbox).not.toBeChecked();
  });

  it('los valores de los inputs reflejan el estado de filters', () => {
    const customFilters = {
      search: 'martillo',
      categories: [],
      minPrice: '1000',
      maxPrice: '5000',
      marca: 'Stanley',
    };
    render(
      <FilterSidebar categories={categories} filters={customFilters} onFilterChange={onFilterChange} onSearch={onSearch} />
    );
    expect(screen.getByPlaceholderText('Nombre del producto')).toHaveValue('martillo');
    expect(screen.getByPlaceholderText('Mín')).toHaveValue(1000);
    expect(screen.getByPlaceholderText('Máx')).toHaveValue(5000);
    expect(screen.getByPlaceholderText('Marca')).toHaveValue('Stanley');
  });

  it('permite desmarcar una categoría si ya está seleccionada', () => {
    const checkedFilters = { ...filters, categories: [1] };
    render(
      <FilterSidebar categories={categories} filters={checkedFilters} onFilterChange={onFilterChange} onSearch={onSearch} />
    );
    const checkbox = screen.getByLabelText('Bebidas');
    fireEvent.click(checkbox);
    expect(onFilterChange).toHaveBeenCalled();
  });
});
