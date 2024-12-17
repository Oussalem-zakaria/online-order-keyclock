import { Route, Routes } from "react-router-dom";
import Products from "../pages/Admin/products/Products";
import CustomerOrders from "../pages/Customer/orders/CustomerOrders";
import Problems from "../pages/Admin/Problems";
import Profile from "../pages/Admin/Profile";
import Settings from "../pages/Admin/Settings";
import Home from "../pages/Customer/home/Home";

function UserRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/user/accueil" element={<Home />} />
      <Route path="/user/produits" element={<Products />} />
      <Route path="/user/mes-commmandes" element={<CustomerOrders />} />
      <Route path="/user/problemes" element={<Problems />} />
      <Route path="/user/profil" element={<Profile />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}

export default UserRoutes;
