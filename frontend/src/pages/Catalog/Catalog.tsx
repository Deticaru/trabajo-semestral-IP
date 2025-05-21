// src/pages/Catalog.jsx
import React from "react";
import Card from "../../components/Card/Card";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import FilterSidebar from "../../components/FilterSidebar/FilterSidebar";
import styled from "styled-components";
import { products } from "../../data/products"; // <--- IMPORTA AQUÍ

const Catalog = () => {
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
          <FilterSidebar />
          <CardsWrapper>
            {products.map((product) => (
              <Card
                key={product.id}
                id={product.id}
                image={product.image}
                title={product.title}
                description={product.description}
                price={product.price}
              />
            ))}
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
