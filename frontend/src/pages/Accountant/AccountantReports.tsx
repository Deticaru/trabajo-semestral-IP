// src/pages/Accountant/AccountantReports.tsx
import AccountantPanelMenu from "./AccountantPanelMenu";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const AccountantReports = () => (
  <>
    <Navbar />
    <div className="min-h-screen bg-gray-50 flex">
      <AccountantPanelMenu />
      <main className="flex-1 px-10 py-10">
        <h2 className="text-2xl font-bold text-indigo-800 mb-8">Reportes</h2>
        <div className="bg-white rounded-2xl shadow p-6 flex flex-col gap-6">
          <button className="bg-green-700 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-800 transition">
            Generar Reporte de Ventas
          </button>
          <button className="bg-yellow-400 text-indigo-900 px-6 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition">
            Generar Reporte de Pagos Confirmados
          </button>
          <button className="bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-800 transition">
            Generar Reporte de Entregas
          </button>
          <div className="flex gap-4 mt-4">
            <button className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900 transition">
              Exportar PDF
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
              Exportar Excel
            </button>
          </div>
        </div>
      </main>
    </div>
    <Footer />
  </>
);

export default AccountantReports;
