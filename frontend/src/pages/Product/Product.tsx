import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import styled from "styled-components";
import { useCart } from "../../context/CartContext";

const Product = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<any>(null);

  const { addToCart } = useCart();

  useEffect(() => {
    if (!id) return;
    fetch(`http://localhost:8000/api/productos/${id}/`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch(() => setProduct(null));
  }, [id]);

  if (!product) return null;

  return (
    <PageWrapper>
      <Navbar />
      <ContentWrapper>
        <ProductContainer>
          <ImageSection>
            <ProductImage
              src={
                product.imagenes && product.imagenes.length > 0
                  ? product.imagenes[0].imagen_producto
                  : ""
              }
              alt={product.nom_producto}
            />
          </ImageSection>
          <InfoSection>
            <h1>{product.nom_producto}</h1>
            <Category>
              Categoría:{" "}
              {product.categoria
                ? product.categoria.nom_categoria
                : "Sin categoría"}
            </Category>
            <Marca>
              Marca: {product.marca ? product.marca.nom_marca : "Sin marca"}
            </Marca>
            <Sku>SKU: {product.sku ? product.sku : "N/A"}</Sku>
            <Stock>
              Unidades disponibles: {product.stock ? product.stock : "N/A"}
            </Stock>
            <Price>${Number(product.precio_producto).toLocaleString()}</Price>
            <ShortDesc>{product.desc_producto}</ShortDesc>
            <LongDesc>
              {product.descripcion_larga ? product.descripcion_larga : ""}
            </LongDesc>
            <Actions>
              <Counter>
                <CounterButton
                  onClick={() => setQuantity((q) => (q > 1 ? q - 1 : 1))}
                >
                  -
                </CounterButton>
                <span>{quantity}</span>
                <CounterButton onClick={() => setQuantity((q) => q + 1)}>
                  +
                </CounterButton>
              </Counter>
              <AddButton
                aria-label="Agregar al carrito"
                onClick={() =>
                  addToCart({
                    id: product.id,
                    title: product.nom_producto,
                    image:
                      product.imagenes && product.imagenes.length > 0
                        ? product.imagenes[0].imagen_producto
                        : "",
                    price: product.precio_producto,
                    quantity,
                  })
                }
              >
                {/* ...icono SVG... */}
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                >
                  <path
                    d="M7.2998 5H22L20 12H8.37675M21 16H9L7 3H4M4 8H2M5 11H2M6 14H2M10 20C10 20.5523 9.55228 21 9 21C8.44772 21 8 20.5523 8 20C8 19.4477 8.44772 19 9 19C9.55228 19 10 19.4477 10 20ZM21 20C21 20.5523 20.5523 21 20 21C19.4477 21 19 20.5523 19 20C19 19.4477 19.4477 19 20 19C20.5523 19 21 19.4477 21 20Z"
                    stroke="#ffffff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </AddButton>
            </Actions>
          </InfoSection>
        </ProductContainer>
      </ContentWrapper>
      <Footer />
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ProductContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 900px;
  margin: 2.5rem auto 2rem auto;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(165, 29, 45, 0.08);
  padding: 2.5rem 2rem;
  gap: 2.5rem;
`;

const ImageSection = styled.div`
  flex: 1 1 320px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProductImage = styled.img`
  width: 320px;
  height: 320px;
  object-fit: contain;
  border-radius: 12px;
  background: #f9f9f9;
  box-shadow: 0 2px 12px rgba(165, 29, 45, 0.07);
`;

const InfoSection = styled.div`
  flex: 2 1 400px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  h1 {
    font-size: 2rem;
    font-weight: 700;
    color: #a51d2d;
    margin-bottom: 0.5rem;
  }
`;

const Category = styled.div`
  color: #a51d2d;
  font-weight: 500;
  margin-bottom: 0.2rem;
`;

const Sku = styled.div`
  color: #888;
  font-size: 0.98rem;
  margin-bottom: 0.2rem;
`;

const Stock = styled.div`
  color: #444;
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

const Price = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #a51d2d;
  margin-bottom: 1rem;
`;

const ShortDesc = styled.div`
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 0.5rem;
`;

const LongDesc = styled.div`
  font-size: 1rem;
  color: #555;
  margin-bottom: 1.2rem;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.7rem;
`;

const Counter = styled.div`
  display: flex;
  align-items: center;
  background: #f3f3f3;
  border-radius: 6px;
  padding: 0.25rem 0.5rem;
  gap: 0.5rem;
  font-size: 1rem;
`;

const CounterButton = styled.button`
  background: #e5e5e5;
  border: none;
  border-radius: 4px;
  width: 28px;
  height: 28px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #d1d1d1;
  }
`;

const AddButton = styled.button`
  background: #a51d2d;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  &:hover {
    background: #7c1622;
  }
`;

const Marca = styled.div`
  color: #a51d2d;
  font-weight: 500;
  margin-bottom: 0.2rem;
`;

export default Product;
