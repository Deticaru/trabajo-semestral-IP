// src/pages/Catalog.jsx
import React, { useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import FilterSidebar from "../../components/FilterSidebar/FilterSidebar";
import styled from "styled-components";

const Catalog = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: "",
    categories: [],
    minPrice: "",
    maxPrice: "",
    marca: "",
  });

  // Traer categorías
  useEffect(() => {
    fetch("http://localhost:8000/api/categorias/")
      .then((res) => res.json())
      .then(setCategories);
  }, []);

  // Traer productos
  useEffect(() => {
    fetch("http://localhost:8000/api/productos/")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Manejar cambios en los filtros
  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target;
    if (name === "categories") {
      setFilters((prev) => {
        const prevCategories = Array.isArray(prev.categories)
          ? prev.categories
          : [];
        const newCategories = checked
          ? [...prevCategories, Number(value)]
          : prevCategories.filter((id) => id !== Number(value));
        return { ...prev, categories: newCategories };
      });
    } else {
      setFilters((prev) => ({
        ...prev,
        [name]: type === "number" ? value.replace(/^0+/, "") : value,
      }));
    }
  };

  // Manejar búsqueda
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // El filtrado es en tiempo real, no necesitas hacer nada aquí
  };

  // Filtrar productos en el frontend
  const filteredProducts = products.filter((product) => {
    // Filtro por nombre
    if (
      filters.search &&
      !product.nom_producto.toLowerCase().includes(filters.search.toLowerCase())
    )
      return false;
    // Filtro por categorías
    const categoriaId =
      product.categoria?.id !== undefined && product.categoria?.id !== null
        ? Number(product.categoria.id)
        : product.tag_producto !== undefined && product.tag_producto !== null
        ? Number(product.tag_producto)
        : -1; // Usa -1 para que nunca coincida

    if (
      filters.categories.length > 0 &&
      !filters.categories.includes(categoriaId)
    )
      return false;
    // Filtro por precio
    if (
      filters.minPrice &&
      Number(product.precio_producto) < Number(filters.minPrice)
    )
      return false;
    if (
      filters.maxPrice &&
      Number(product.precio_producto) > Number(filters.maxPrice)
    )
      return false;
    // Filtro por marca
    if (
      filters.marca &&
      !(product.marca?.nom_marca || "")
        .toLowerCase()
        .includes(filters.marca.toLowerCase())
    )
      return false;
    return true;
  });

  return (
    <>
      <Navbar />
      <Main>
        <Header>
          <h1>¡Bienvenido a nuestro Catálogo!</h1>
          <p>
            Descubre los mejores productos para tus proyectos, al mejor precio y
            con la mejor calidad.
          </p>
          <div className="divider"></div>
        </Header>
        <Content>
          <FilterSidebar
            categories={categories}
            filters={filters}
            onFilterChange={handleFilterChange}
            onSearch={handleSearch}
          />
          <CardsWrapper>
            {loading ? (
              <p>Cargando productos...</p>
            ) : filteredProducts.length === 0 ? (
              <p>No hay productos disponibles.</p>
            ) : (
              filteredProducts.map((product) => {
                const img =
                  product.imagenes && product.imagenes.length > 0
                    ? product.imagenes[0].imagen_producto.startsWith("http")
                      ? product.imagenes[0].imagen_producto
                      : `http://localhost:8000${product.imagenes[0].imagen_producto}`
                    : "";
                return (
                  <Card
                    key={product.id}
                    id={product.id}
                    image={img}
                    title={product.nom_producto}
                    description={product.desc_producto}
                    price={product.precio_producto}
                  />
                );
              })
            )}
          </CardsWrapper>
        </Content>
      </Main>
      <Footer />
    </>
  );
};

const Main = styled.div`
  max-width: 60vw;
  margin: 0 auto;
  padding: 2rem 0 3rem 0;
  min-height: 100vh;
  background: #fff;

  h2 {
    text-align: center;
    color: #a51d2d;
    font-size: 2rem;
    margin-bottom: 2rem;
  }
`;

const Content = styled.div`
  display: flex;
  gap: 2rem;
`;

const CardsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem 0.2rem;
  justify-items: center;
  flex: 1;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2.5rem;

  h1 {
    font-size: 2.3rem;
    font-weight: 700;
    color: #a51d2d;
    margin-bottom: 0.5rem;
    letter-spacing: 1px;
  }

  p {
    color: #444;
    font-size: 1.15rem;
    margin-bottom: 1.2rem;
  }

  .divider {
    width: 60px;
    height: 4px;
    background: linear-gradient(90deg, #a51d2d 60%, #fbbf24 100%);
    border-radius: 2px;
    margin: 0 auto;
  }
`;

export default Catalog;
