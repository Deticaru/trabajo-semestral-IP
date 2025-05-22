import React from "react";
import styled from "styled-components";

const FilterSidebar = ({
  categories,
  filters,
  onFilterChange,
  onSearch,
}: {
  categories: any[];
  filters: any;
  onFilterChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onSearch: (e: React.FormEvent) => void;
}) => (
  <Sidebar>
    <h3>Filtrar</h3>
    <form onSubmit={onSearch}>
      <div>
        <strong>Buscar producto</strong>
        <input
          type="text"
          name="search"
          placeholder="Nombre del producto"
          value={filters.search}
          onChange={onFilterChange}
          style={{ width: "100%", marginBottom: "1rem" }}
        />
        <button type="submit" style={{ width: "100%", marginBottom: "1rem" }}>
          Buscar
        </button>
      </div>
      <div>
        <strong>Categorías</strong>
        <ul>
          {categories.map((cat) => (
            <li key={cat.id}>
              <label>
                <input
                  type="checkbox"
                  name="categories"
                  value={cat.id}
                  checked={
                    Array.isArray(filters.categories) &&
                    filters.categories.includes(Number(cat.id))
                  }
                  onChange={onFilterChange}
                />{" "}
                {cat.nom_categoria}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <strong>Precio</strong>
        <div>
          <input
            type="number"
            name="minPrice"
            placeholder="Mín"
            value={filters.minPrice}
            onChange={onFilterChange}
            style={{ width: "60px" }}
          />{" "}
          -{" "}
          <input
            type="number"
            name="maxPrice"
            placeholder="Máx"
            value={filters.maxPrice}
            onChange={onFilterChange}
            style={{ width: "60px", marginLeft: "8px" }}
          />
        </div>
      </div>
      <div>
        <strong>Marca</strong>
        <input
          type="text"
          name="marca"
          placeholder="Marca"
          value={filters.marca}
          onChange={onFilterChange}
          style={{ width: "100%", marginBottom: "1rem" }}
        />
      </div>
    </form>
  </Sidebar>
);

const Sidebar = styled.aside`
  min-width: 180px;
  background: #f7f7f7;
  border-radius: 10px;
  padding: 1.5rem 1rem;
  color: #222;
  font-size: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);

  h3 {
    margin-bottom: 1rem;
    color: #a51d2d;
    font-size: 1.2rem;
    font-weight: bold;
  }

  ul {
    list-style: none;
    padding: 0;
    margin-bottom: 1.5rem;
  }

  li {
    margin-bottom: 0.5rem;
  }

  strong {
    display: block;
    margin-bottom: 0.5rem;
  }

  input[type="number"] {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 0.2rem 0.4rem;
    margin-top: 0.5rem;
  }
`;

export default FilterSidebar;
