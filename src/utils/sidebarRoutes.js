import {
  FaChartBar,
  FaHistory,
  FaHome,
  FaShoppingBag,
  FaTachometerAlt,
  FaUser,
  FaUsers,
} from "react-icons/fa";

export const adminRoutes = [
  { name: "Dashboard", href: "/admin/dashboard", icon: <FaTachometerAlt /> },
  // { name: "Utilisateurs", href: "/admin/utilisateurs", icon: <FaUsers /> },
  { name: "Gestion des Employés", href: "/admin/employes", icon: <FaUser /> },
  { name: "Gestion des Clients", href: "/admin/clients", icon: <FaUsers /> },
  { name: "Gestion des Produits", href: "/admin/produits", icon: <FaShoppingBag /> },
  { name: "Commandes récentes", href: "/admin/orders", icon: <FaShoppingBag /> },
  {
    name: "Historique des Commandes",
    href: "/admin/audit",
    icon: <FaHistory />,
  },
];

export const employeeRoutes = [
  { name: "Dashboard", href: "/employee/accueil", icon: <FaTachometerAlt /> },
  {
    name: "Gestion des Commandes",
    href: "/employee/orders",
    icon: <FaShoppingBag />,
  },
];

export const userRoutes = [
  { name: "Accueil", href: "/", icon: <FaHome /> },
  {
    name: "Commandes",
    href: "/user/mes-commmandes",
    icon: <FaShoppingBag />,
  },
];
