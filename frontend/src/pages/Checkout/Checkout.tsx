import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import "../Login/Login.css";

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
  });
  const [error, setError] = useState("");
  const [deliveryType, setDeliveryType] = useState<"store" | "home">("store");
  const [addressType, setAddressType] = useState<"my" | "other">("my");
  const [customAddress, setCustomAddress] = useState("");
  const [fade, setFade] = useState("fade-in");

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDeliveryChange = (type: "store" | "home") => {
    setFade("fade-out");
    setTimeout(() => {
      setDeliveryType(type);
      setFade("fade-in");
    }, 300);
  };

  const handleAddressTypeChange = (type: "my" | "other") => {
    setFade("fade-out");
    setTimeout(() => {
      setAddressType(type);
      setFade("fade-in");
    }, 300);
  };

  const handleCustomAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAddress(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      setError("Por favor completa todos los campos obligatorios.");
      return;
    }
    if (deliveryType === "home" && addressType === "other" && !customAddress) {
      setError("Por favor ingresa la dirección de despacho.");
      return;
    }
    // Aquí podrías enviar los datos al backend o continuar con el flujo de pago
    clearCart();
    navigate("/success");
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-100">
        <div className="max-w-2xl mx-auto py-12 px-4">
          <h1 className="text-3xl font-bold mb-8 text-gray-900">Checkout</h1>
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Datos de envío</h2>
            <div className="mb-4">
              <label className="block mb-1 font-medium text-gray-800">Nombre</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 bg-white"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-medium text-gray-800">Correo electrónico</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 bg-white"
                required
              />
            </div>
            {/* Selección de tipo de entrega */}
            <div className="mb-4">
              <label className="block mb-2 font-medium text-gray-800">Tipo de entrega</label>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 text-gray-800">
                  <input
                    type="radio"
                    name="deliveryType"
                    checked={deliveryType === "store"}
                    onChange={() => handleDeliveryChange("store")}
                  />
                  Retiro en Tienda
                </label>
                <label className="flex items-center gap-2 text-gray-800">
                  <input
                    type="radio"
                    name="deliveryType"
                    checked={deliveryType === "home"}
                    onChange={() => handleDeliveryChange("home")}
                  />
                  Despacho a Domicilio
                </label>
              </div>
            </div>
            {/* Fade para opciones de despacho */}
            <div className={deliveryType === "home" ? fade : "hidden"}>
              <div className="mb-4">
                <label className="block mb-2 font-medium text-gray-800">Dirección de despacho</label>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 text-gray-800">
                    <input
                      type="radio"
                      name="addressType"
                      checked={addressType === "my"}
                      onChange={() => handleAddressTypeChange("my")}
                    />
                    Usar mi Dirección
                  </label>
                  <label className="flex items-center gap-2 text-gray-800">
                    <input
                      type="radio"
                      name="addressType"
                      checked={addressType === "other"}
                      onChange={() => handleAddressTypeChange("other")}
                    />
                    Otra Dirección
                  </label>
                </div>
                {addressType === "other" && (
                  <input
                    type="text"
                    name="customAddress"
                    value={customAddress}
                    onChange={handleCustomAddress}
                    className="w-full border border-gray-300 rounded px-3 py-2 mt-3 text-gray-900 bg-white"
                    placeholder="Dirección de despacho"
                  />
                )}
              </div>
            </div>
            <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-900">Resumen de compra</h2>
            {cart.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-lg text-gray-600 mb-6">Tu carrito está vacío.</p>
              </div>
            ) : (
              <>
                <ul className="mb-4">
                  {cart.map((item) => (
                    <li key={item.id} className="flex justify-between py-1 text-gray-700">
                      <span>{item.title} x{item.quantity}</span>
                      <span>${(item.price * item.quantity).toLocaleString()}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex justify-between font-bold text-lg mb-6">
                  <span>Total:</span>
                  <span>${total.toLocaleString()}</span>
                </div>
              </>
            )}
            {error && <div className="text-red-600 mb-4">{error}</div>}
            <button
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-6 py-3 rounded transition"
              disabled={cart.length === 0}
            >
              Realizar pedido
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Checkout;
