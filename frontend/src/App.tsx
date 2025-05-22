import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import Catalog from "./pages/Catalog/Catalog";
import Product from "./pages/Product/Product";
import Cart from "./pages/Cart/Cart";
import BackToTop from "./components/BackToTop/BackToTop";
import Profile from "./pages/Profile/Profile";
import SellerDashboard from "./pages/Seller/SellerDashboard";
import SellerInventory from "./pages/Seller/SellerInventory";
import SellerOrders from "./pages/Seller/SellerOrders";
import WarehouseDashboard from "./pages/Warehouse/WarehouseDashboard";
import WarehouseInventory from "./pages/Warehouse/WarehouseInventory";
import WarehouseOrders from "./pages/Warehouse/WarehouseOrders";
import AccountantDashboard from "./pages/Accountant/AccountantDashboard";
import AccountantPayments from "./pages/Accountant/AccountantPayments";
import AccountantReports from "./pages/Accountant/AccountantReports";
import AdminDashboard from "./pages/Administrator/AdminDashboard";
import AdminUsers from "./pages/Administrator/AdminUsers";
import AdminPromotions from "./pages/Administrator/AdminPromotions";
import AdminActivity from "./pages/Administrator/AdminActivity";
import AdminProducts from "./pages/Administrator/AdminProducts";
import AdminCategories from "./pages/Administrator/AdminCategories";
import AdminBrands from "./pages/Administrator/AdminBrands";
import AdminUsersC from "./pages/Administrator/AdminUsersC";
import WebpayReturn from "./pages/Cart/WebpayReturn";
import "./App.css";
import Checkout from "./pages/Checkout/Checkout";

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/seller" element={<SellerDashboard />} />
          <Route path="/seller/inventory" element={<SellerInventory />} />
          <Route path="/seller/orders" element={<SellerOrders />} />
          <Route path="/warehouse" element={<WarehouseDashboard />} />
          <Route path="/warehouse/inventory" element={<WarehouseInventory />} />
          <Route path="/warehouse/orders" element={<WarehouseOrders />} />
          <Route path="/accountant" element={<AccountantDashboard />} />
          <Route path="/accountant/payments" element={<AccountantPayments />} />
          <Route path="/accountant/reports" element={<AccountantReports />} />
          <Route path="/administrator" element={<AdminDashboard />} />
          <Route path="/administrator/users" element={<AdminUsers />} />
          <Route
            path="/administrator/promotions"
            element={<AdminPromotions />}
          />
          <Route path="/administrator/activity" element={<AdminActivity />} />
          <Route path="/webpay/return" element={<WebpayReturn />} />
          <Route path="/administrator/products" element={<AdminProducts />} />
          <Route
            path="/administrator/categories"
            element={<AdminCategories />}
          />
          <Route path="/administrator/brands" element={<AdminBrands />} />
          <Route path="/administrator/usersC" element={<AdminUsersC />} />
        </Routes>
      </Router>
      <BackToTop />
    </CartProvider>
  );
}

export default App;
