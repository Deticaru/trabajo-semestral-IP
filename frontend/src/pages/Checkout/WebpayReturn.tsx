import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const WebpayReturn = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token_ws = params.get("token_ws") || (document.forms[0]?.token_ws?.value ?? "");
    const tbk_token = params.get("TBK_TOKEN");
    const tbk_order = params.get("TBK_ORDEN_COMPRA");
    const tbk_session = params.get("TBK_ID_SESION");

    // Si viene de anulación Webpay
    if (tbk_token && tbk_order && tbk_session) {
      navigate("/checkout/webpay-cancelled");
      return;
    }
    if (!token_ws) {
      setError("No se recibió token_ws");
      setLoading(false);
      return;
    }
    axios
      .post("http://localhost:8000/api/webpay/commit/", { token_ws })
      .then((res) => {
        setResult(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Error al confirmar el pago");
        setLoading(false);
      });
  }, [location]);

  if (loading) return <div className="p-8 text-center">Procesando pago...</div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;

  return (
    <div className="max-w-xl mx-auto p-8 bg-white rounded shadow mt-12">
      <h2 className="text-2xl font-bold mb-4">
        {result.status === "AUTHORIZED"
          ? "¡Pago exitoso!"
          : "Pago rechazado"}
      </h2>
      <div className="mb-2">Orden: {result.buy_order}</div>
      <div className="mb-2">Monto: ${result.amount}</div>
      <div className="mb-2">Código autorización: {result.authorization_code}</div>
      <div className="mb-2">Fecha: {result.transaction_date}</div>
      <div className="mb-2">Tipo de pago: {result.payment_type_code}</div>
      <div className="mb-2">Cuotas: {result.installments_number}</div>
      <div className="mb-2">Tarjeta: **** **** **** {result.card_detail?.card_number}</div>
      <div className="mt-4">
        <a href="/catalog" className="text-blue-600 hover:underline">Volver al catálogo</a>
      </div>
    </div>
  );
};

export default WebpayReturn;
