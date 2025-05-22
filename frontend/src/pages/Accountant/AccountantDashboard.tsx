// src/pages/Accountant/AccountantDashboard.tsx
import AccountantPanelMenu from "./AccountantPanelMenu";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { NavLink } from "react-router-dom";

const mockPayments = [
  { id: 1, tipo: "WebPay", estado: "Confirmado", monto: 50000 },
  { id: 2, tipo: "Transferencia", estado: "Pendiente", monto: 120000 },
];
const mockReports = [
  { nombre: "Ventas Mayo", fecha: "2024-05-20" },
  { nombre: "Pagos Confirmados", fecha: "2024-05-21" },
];

const AccountantDashboard = () => (
  <>
    <Navbar />
    <div className="min-h-screen bg-gray-50 flex">
      <AccountantPanelMenu />
      <main className="flex-1 px-10 py-10">
        <h1 className="text-3xl font-bold text-indigo-800 mb-8">
          Resumen del Contador
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="font-semibold text-lg mb-3 text-indigo-700">
              Últimos Pagos
            </h2>
            <ul className="space-y-2">
              {mockPayments.map((p) => (
                <li key={p.id}>
                  <span className="font-semibold">{p.tipo}:</span>{" "}
                  <span
                    className={
                      p.estado === "Confirmado"
                        ? "text-green-700"
                        : "text-yellow-700"
                    }
                  >
                    {p.estado}
                  </span>{" "}
                  <span className="text-gray-700">
                    (${p.monto.toLocaleString()})
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="font-semibold text-lg mb-3 text-indigo-700">
              Últimos Reportes
            </h2>
            <ul className="space-y-2">
              {mockReports.map((r, i) => (
                <li key={i}>
                  <span className="font-semibold">{r.nombre}</span>{" "}
                  <span className="text-gray-500">({r.fecha})</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex gap-4">
          <NavLink
            to="/accountant/payments"
            className="bg-yellow-400 text-indigo-900 px-6 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition"
          >
            Ver Pagos
          </NavLink>
          <NavLink
            to="/accountant/reports"
            className="bg-green-700 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-800 transition"
          >
            Generar Reportes
          </NavLink>
        </div>
      </main>
    </div>
    <Footer />
  </>
);

export default AccountantDashboard;
