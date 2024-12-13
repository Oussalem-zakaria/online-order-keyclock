import React from "react";
import {
  FaUser,
  FaTruck,
  FaUsers,
  FaRoute,
  FaChartBar,
  FaUserCircle,
  FaBell,
  FaCog,
  FaTachometerAlt,
} from "react-icons/fa";
import { SidebarResponsive } from "./SidebarResponsive";

export function SidebarResponsiveAdmin() {
  const links1 = [
    { name: "Dashboard", href: "/admin/dashboard", icon: <FaTachometerAlt /> },
    { name: "Utilisateurs", href: "/admin/utilisateurs", icon: <FaUsers /> },
    { name: "Conducteur", href: "/admin/conducteur", icon: <FaUser /> },
    { name: "Véhicules", href: "/admin/vehicules", icon: <FaTruck /> },
    { name: "Trajets", href: "/admin/trajets", icon: <FaRoute /> },
    { name: "Statistiques", href: "/admin/statistiques", icon: <FaChartBar /> },
  ];

  const links2 = [
    { name: "Profile", href: "/admin/profile", icon: <FaUserCircle /> },
    { name: "Notifications", href: "/admin/notifications", icon: <FaBell /> },
    { name: "Paramètres Système", href: "/admin/parametres", icon: <FaCog /> },
  ];

  return (
    <>
      <SidebarResponsive links1={links1} links2={links2} />
    </>
  );
}
