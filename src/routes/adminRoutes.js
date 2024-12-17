import { Route, Routes } from "react-router-dom";
import Products from "../pages/Admin/products/Products";
import Home from "../pages/Admin/Home";
import Problems from "../pages/Admin/Problems";
import Profile from "../pages/Admin/Profile";
import { Settings } from "lucide-react";
import Employee from "../pages/Admin/Employee";
import Customer from "../pages/Admin/customers/Customer";
import Orders from "../pages/Admin/orders/Orders";
import Audit from "../pages/Admin/audit/Audit";

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin/dashboard" element={<Home />} />
      <Route path="/admin/produits" element={<Products />} />
      <Route path="/admin/employes" element={<Employee />} />
      <Route path="/admin/clients" element={<Customer />} />
      <Route path="/admin/orders" element={<Orders />} />
      <Route path="/admin/audit" element={<Audit />} />
      <Route path="/admin/problemes" element={<Problems />} />
      <Route path="/admin/profil" element={<Profile />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}

export default AdminRoutes;
