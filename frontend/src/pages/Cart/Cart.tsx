import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import CartItem from "../../components/CartItem/CartItem";
import { useCart } from "../../context/CartContext";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleNext = () => {
    const token = localStorage.getItem("access_token");
    if (token) {
      navigate("/checkout");
    } else {
      navigate("/login?next=/checkout");
    }
  };

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
          <div className="divide-y">
            {cart.map((item) => (
              <CartItem key={item.id} item={item} />
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
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded transition"
              onClick={handleNext}
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
