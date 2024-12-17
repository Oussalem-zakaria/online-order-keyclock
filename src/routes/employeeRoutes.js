import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Employee/dashboard/Dashboard";
import Products from "../pages/Admin/products/Products";
import EmployeeOrderPage from "../pages/Employee/orders/EmployeeOrderPage";
import Problems from "../pages/Admin/Problems";
import Profile from "../pages/Admin/Profile";
import Settings from "../pages/Admin/Settings";

function EmployeRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/employee/accueil" element={<Dashboard />} />
      <Route path="/employee/produits" element={<Products />} />
      <Route path="/employee/orders" element={<EmployeeOrderPage />} />
      <Route path="/employee/profil" element={<Profile />} />
      <Route path="/employee/settings" element={<Settings />} />
    </Routes>
  );
}

export default EmployeRoutes;
