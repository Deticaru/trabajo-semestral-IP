import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

type CardProps = {
  id: string;
  image: string;
  title: string;
  description: string;
  price: string | number;
};

const Card: React.FC<CardProps> = ({
  id,
  image,
  title,
  description,
  price,
}) => {
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const handleDecrease = () => {
    setQuantity((q) => (q > 1 ? q - 1 : 1));
  };

  const handleIncrease = () => {
    setQuantity((q) => q + 1);
  };

  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id,
      title,
      image,
      price: Number(price),
      quantity,
    });
  };

  const goToProduct = () => {
    navigate(`/product/${id}`);
  };

  return (
    <CardWrapper>
      <Image
        src={image}
        alt={title}
        onClick={goToProduct}
        style={{ cursor: "pointer" }}
      />
      <Title onClick={goToProduct} style={{ cursor: "pointer" }}>
        {title}
      </Title>
      <Description>{description}</Description>
      <Price>${price}</Price>
      <Actions>
        <Counter>
          <CounterButton onClick={handleDecrease}>-</CounterButton>
          <span>{quantity}</span>
          <CounterButton onClick={handleIncrease}>+</CounterButton>
        </Counter>
        <AddButton onClick={handleAddToCart} aria-label="Agregar al carrito">
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
    </CardWrapper>
  );
};

const CardWrapper = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  padding: 1.5rem;
  width: 240px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.25s cubic-bezier(0.4, 2, 0.3, 1), box-shadow 0.25s;
  will-change: transform, box-shadow;

  &:hover {
    transform: scale(1.04) translateY(-6px);
    box-shadow: 0 8px 24px rgba(165, 29, 45, 0.15);
    z-index: 2;
  }
`;

const Image = styled.img`
  width: 200px;
  height: 200px;
  object-fit: contain;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const Title = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0.5rem 0 0.25rem 0;
  color: #222;
  text-align: center;
`;

const Description = styled.p`
  font-size: 0.95rem;
  color: #555;
  margin-bottom: 0.75rem;
  text-align: center;
`;

const Price = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: #a51d2d;
  margin-bottom: 1rem;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
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
  &:hover {
    background: #7c1622;
  }
`;

export default Card;
