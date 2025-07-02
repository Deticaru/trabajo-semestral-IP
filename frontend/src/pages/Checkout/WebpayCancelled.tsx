// @ts-ignore
import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const WebpayCancelled = () => {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        <div className="bg-white p-8 rounded shadow max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Compra anulada</h2>
          <p className="mb-6 text-gray-700">
            Has anulado el proceso de pago en Webpay. Si fue un error, puedes volver a intentarlo o regresar al inicio.
          </p>
          <div className="flex flex-col gap-3">
            <button
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-6 py-3 rounded transition"
              onClick={() => navigate("/checkout")}
            >
              Volver al Checkout
            </button>
            <button
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold px-6 py-3 rounded transition"
              onClick={() => navigate("/home")}
            >
              Ir al Inicio
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default WebpayCancelled;
