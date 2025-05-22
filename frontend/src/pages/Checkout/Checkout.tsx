import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useCart } from "../../context/CartContext";
import axios from "axios";
import "../Login/Login.css";

const Checkout = () => {
  const { cart } = useCart();
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
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.email) {
      setError("Por favor completa todos los campos obligatorios.");
      return;
    }
    if (deliveryType === "home" && addressType === "other" && !customAddress) {
      setError("Por favor ingresa la dirección de despacho.");
      return;
    }
    if (cart.length === 0) return;
    setLoading(true);
    try {
      // 1. Guardar carrito y datos en backend antes de redirigir a Webpay
      const pedidoRes = await axios.post("http://localhost:8000/api/guardar-carrito/", {
        cart,
        name: form.name,
        email: form.email,
        address: deliveryType === "home" ? (addressType === "other" ? customAddress : form.address) : "Retiro en tienda",
        deliveryType,
        addressType,
      }, { withCredentials: true }); // importante para sesión

      const pedido_id = pedidoRes.data.pedido_id; // <-- Asegúrate que el backend lo devuelva así
      if (!pedido_id) throw new Error("No se pudo obtener el ID del pedido");

      // 2. Crear orden Webpay, usando el id del pedido en buy_order
      const orderData = {
        buy_order: `ORD-${pedido_id}-${Date.now()}`,
        session_id: form.email,
        amount: total,
        return_url: `${window.location.origin}/checkout/webpay-return`,
      };
      const res = await axios.post("http://localhost:8000/api/webpay/create/", orderData);
      const { url, token } = res.data;
      // Create and submit form to Webpay
      const formEl = document.createElement("form");
      formEl.method = "POST";
      formEl.action = url;
      formEl.style.display = "none";
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = "token_ws";
      input.value = token;
      formEl.appendChild(input);
      document.body.appendChild(formEl);
      formEl.submit();
    } catch (err: any) {
      setError("Error al iniciar el pago. Intenta nuevamente.");
      setLoading(false);
    }
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
              disabled={cart.length === 0 || loading}
            >
              {loading ? "Redirigiendo a Webpay..." : "Realizar pedido"}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Checkout;
