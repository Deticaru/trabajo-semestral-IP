import React from "react";
import styled from "styled-components";

const FilterSidebar = () => (
  <Sidebar>
    <h3>Filtrar</h3>
    <div>
      <strong>Categorías</strong>
      <ul>
        <li>
          <input type="checkbox" /> Herramientas
        </li>
        <li>
          <input type="checkbox" /> Materiales
        </li>
        <li>
          <input type="checkbox" /> Eléctrico
        </li>
      </ul>
    </div>
    <div>
      <strong>Precio</strong>
      <div>
        <input type="number" placeholder="Mín" style={{ width: "60px" }} /> -
        <input
          type="number"
          placeholder="Máx"
          style={{ width: "60px", marginLeft: "8px" }}
        />
      </div>
    </div>
    {/* Agrega más filtros aquí */}
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
