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

export function SidebarResponsiveUser() {

  const links1 = [
    {
      name: "Dashboard",
      href: "/user/dashboard",
      icon: <FaTachometerAlt className="h-5 w-5" />,
    },
    {
      name: "Trajets Assignés",
      href: "/user/assignedtrips",
      icon: <FaUsers className="h-5 w-5" />,
    },
    {
      name: "Historique des Trajets",
      href: "/user/triphistory",
      icon: <FaUser className="h-5 w-5" />,
    },
    {
      name: "Signalement de Problèmes",
      href: "/user/reportingproblems/report",
      icon: <FaTruck className="h-5 w-5" />,
    },
  ];

  const links2 = [
    {
      name: "Profile",
      href: "/user/profile",
      icon: <FaUserCircle className="h-5 w-5" />,
    },
    {
      name: "Notifications",
      href: "/user/notifications",
      icon: <FaBell className="h-5 w-5" />,
    },
    {
      name: "Paramètres Système",
      href: "/user/parametres",
      icon: <FaCog className="h-5 w-5" />,
    },
  ];

  return (
    <>
      <SidebarResponsive links1={links1} links2={links2} />
    </>
  );
}
