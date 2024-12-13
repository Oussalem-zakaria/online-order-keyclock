import { Route, Routes } from "react-router-dom";
import Home from "../pages/Admin/Home";
import Products from "../pages/Admin/Products";
import Employee from "../pages/Admin/Employee";
import OrderHistory from "../pages/Admin/OrderHistory";
import Problems from "../pages/Admin/Problems";
import Profile from "../pages/Admin/Profile";
import Settings from "../pages/Admin/Settings";

function UserRoutes() {
  return (
    <Routes>
      <Route path="/admin/dashboard" element={<Home />} />
      <Route path="/admin/produits" element={<Products />} />
      <Route path="/admin/employes" element={<Employee />} />
      <Route path="/admin/historique" element={<OrderHistory />} />
      <Route path="/admin/problemes" element={<Problems />} />
      <Route path="/admin/profil" element={<Profile />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}

export default UserRoutes;
