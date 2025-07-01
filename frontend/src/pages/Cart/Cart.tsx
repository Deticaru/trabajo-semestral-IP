import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import CartItem from "../../components/CartItem/CartItem";
import { useCart } from "../../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import './Cart.css'

const Cart = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [cartStocks, setCartStocks] = useState<{ [key: string]: number }>({});
  const [checkingStock, setCheckingStock] = useState(true);

  useEffect(() => {
    if (!cart || cart.length === 0) {
      setCartStocks({});
      setCheckingStock(false);
      return;
    }
    setCheckingStock(true);
    const sucursal = JSON.parse(localStorage.getItem("sucursal") || '{"id":1}');
    const fetchStocks = async () => {
      const stocks: { [key: string]: number } = {};
      await Promise.all(
        cart.map(async (item) => {
          try {
            const res = await fetch(`http://localhost:8000/api/stocksucursal/?sucursal=${sucursal.id}&producto=${item.id}`);
            if (!res.ok) {
              stocks[item.id] = 0;
              return;
            }
            const data = await res.json();
            stocks[item.id] = Array.isArray(data) && data.length > 0 ? data[0].stock : 0;
          } catch {
            stocks[item.id] = 0;
          }
        })
      );
      setCartStocks(stocks);
      setCheckingStock(false);
    };
    fetchStocks();
  }, [cart]);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleNext = () => {
    const token = localStorage.getItem("access_token");
    if (token) {
      navigate("/checkout");
    } else {
      navigate("/login?next=/checkout");
    }
  };

  // Verificar si hay productos con cantidad mayor al stock
  const invalidItems = cart.filter(
    (item) => cartStocks[item.id] !== undefined && item.quantity > cartStocks[item.id]
  );

  if (!cart || cart.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-lg text-gray-600 mb-6">
          Tu carrito está vacío.
        </p>
        <Link
          to="/catalog"
          className="inline-block px-6 py-3 bg-red-700 text-white rounded hover:bg-red-800 transition"
        >
          Ir al catálogo
        </Link>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-100">
        <div className="max-w-3xl mx-auto py-12 px-4">
          <h1 className="text-3xl font-bold mb-8 text-gray-900">Tu Carrito</h1>
          {checkingStock ? (
            <div className="mb-4 text-blue-700">Verificando stock actual...</div>
          ) : invalidItems.length > 0 ? (
            <div className="mb-4 text-red-700 font-semibold">
              Algunos productos tienen menos stock disponible que la cantidad en tu carrito. Ajusta las cantidades para continuar.
              <ul className="list-disc ml-6 mt-2">
                {invalidItems.map((item) => (
                  <li key={item.id}>
                    {item.title}: en carrito {item.quantity}, stock disponible {cartStocks[item.id] ?? 0}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          <div className="divide-y">
            {cart.map((item) => (
              <CartItem key={item.id} item={item} maxStock={cartStocks[item.id]} />
            ))}
          </div>
          <div className="flex justify-between items-center mt-8">
            <div>
              <button
                className="text-sm text-red-700 hover:underline"
                onClick={clearCart}
              >
                Vaciar carrito
              </button>
            </div>
            <div className="text-xl font-bold text-gray-900">
              Total: ${total.toLocaleString()}
            </div>
          </div>
          <div className="mt-8 text-right">
            <button
              className={`btn-next bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded transition${invalidItems.length > 0 ? ' disButton' : ''}`}
              onClick={handleNext}
              disabled={checkingStock || invalidItems.length > 0}
            >
              Siguiente
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Cart;
