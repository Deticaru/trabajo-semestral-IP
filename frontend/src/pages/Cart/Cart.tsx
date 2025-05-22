import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import CartItem from "../../components/CartItem/CartItem";
import { useCart } from "../../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Cart = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    const buy_order = `order_${Date.now()}`;
    const session_id = `session_${Date.now()}`;
    const amount = total;
    const return_url = `${window.location.origin}/webpay/return`;
    try {
      const res = await axios.post("http://localhost:8000/api/webpay/create/", {
        buy_order,
        session_id,
        amount,
        return_url,
      });
      const { url, token } = res.data;
      // Crear y enviar formulario POST a Webpay
      const form = document.createElement("form");
      form.method = "POST";
      form.action = url;
      form.style.display = "none";
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = "token_ws";
      input.value = token;
      form.appendChild(input);
      document.body.appendChild(form);
      form.submit();
    } catch (err) {
      alert("Error al iniciar el pago");
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-100">
        <div className="max-w-3xl mx-auto py-12 px-4">
          <h1 className="text-3xl font-bold mb-8 text-gray-900">Tu Carrito</h1>
          {cart.length === 0 ? (
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
          ) : (
            <>
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
                  className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-6 py-3 rounded transition"
                  onClick={handleCheckout}
                >
                  Realizar compra
                </button>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Cart;
