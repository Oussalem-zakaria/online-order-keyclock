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
  { name: "Employés", href: "/admin/employes", icon: <FaUser /> },
  { name: "Clients", href: "/admin/clients", icon: <FaUsers /> },
  { name: "Produits", href: "/admin/produits", icon: <FaShoppingBag /> },
  {
    name: "Historique des Commandes",
    href: "/admin/historique",
    icon: <FaHistory />,
  },
  {
    name: "Problèmes Signalés",
    href: "/admin/problemes",
    icon: <FaChartBar />,
  },
];

export const employeeRoutes = [
  { name: "Dashboard", href: "/employee/dashboard", icon: <FaTachometerAlt /> },
  {
    name: "Commandes",
    href: "/employee/orders",
    icon: <FaShoppingBag />,
  },
];

export const userRoutes = [
  { name: "Accueil", href: "/", icon: <FaHome /> },
  {
    name: "Commandes",
    href: "/user/orders",
    icon: <FaShoppingBag />,
  },
];
