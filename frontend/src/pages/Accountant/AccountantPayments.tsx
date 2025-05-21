// src/pages/Accountant/AccountantPayments.tsx
import AccountantPanelMenu from "./AccountantPanelMenu";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const mockPayments = [
  { id: 1, tipo: "WebPay", estado: "Confirmado", monto: 50000 },
  { id: 2, tipo: "Transferencia", estado: "Pendiente", monto: 120000 },
];

const AccountantPayments = () => (
  <>
    <Navbar />
    <div className="min-h-screen bg-gray-50 flex">
      <AccountantPanelMenu />
      <main className="flex-1 px-10 py-10">
        <h2 className="text-2xl font-bold text-indigo-800 mb-8">Pagos</h2>
        <div className="bg-white rounded-2xl shadow p-6">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="py-2 px-3">ID</th>
                <th className="py-2 px-3">Tipo</th>
                <th className="py-2 px-3">Estado</th>
                <th className="py-2 px-3">Monto</th>
                <th className="py-2 px-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {mockPayments.map((p) => (
                <tr key={p.id} className="border-b last:border-b-0">
                  <td className="py-2 px-3">{p.id}</td>
                  <td className="py-2 px-3">{p.tipo}</td>
                  <td className="py-2 px-3">
                    {p.estado === "Confirmado" ? (
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded font-semibold text-sm">
                        Confirmado
                      </span>
                    ) : (
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded font-semibold text-sm">
                        Pendiente
                      </span>
                    )}
                  </td>
                  <td className="py-2 px-3">${p.monto.toLocaleString()}</td>
                  <td className="py-2 px-3">
                    {p.tipo === "Transferencia" && p.estado === "Pendiente" && (
                      <button className="bg-indigo-700 text-white px-3 py-1 rounded hover:bg-indigo-800 transition">
                        Confirmar Pago
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
    <Footer />
  </>
);

export default AccountantPayments;
