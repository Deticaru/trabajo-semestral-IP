import { NavLink } from "react-router-dom";

const SellerNavbar = () => (
  <nav className="bg-gray-800 p-4 flex gap-4">
    <NavLink to="/seller" className="text-white font-bold">
      Panel
    </NavLink>
    <NavLink to="/seller/inventory" className="text-white">
      Inventario
    </NavLink>
    <NavLink to="/seller/orders" className="text-white">
      Pedidos
    </NavLink>
  </nav>
);

export default SellerNavbar;
