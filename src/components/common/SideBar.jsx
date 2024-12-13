import React from "react";
import {
  FaUser,
  FaTachometerAlt,
  FaUsers,
  FaChartBar,
  FaUserCircle,
  FaBell,
  FaCog,
  FaShoppingBag,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import icon from "../../assets/imgs/logo.png";
import {
  adminRoutes,
  employeeRoutes,
  userRoutes,
} from "../../utils/sidebarRoutes";

function SideBar() {
  const appName = useSelector((state) => state.settings.appName);
  const primaryColor = useSelector((state) => state.settings.primaryColor);
  const currentUser = useSelector((state) => state.user.currentUser);

  const location = useLocation();

  // si reoles contient admin alors links1 = adminRoutes sinon si EMPLOYEE alors links1 = employeeRoutes sinon links1 = userRoutes
  const links1 = currentUser.roles.includes("ADMIN")
    ? adminRoutes
    : currentUser.roles.includes("EMPLOYEE")
    ? employeeRoutes
    : userRoutes;

  const links2 = [
    { name: "Profile", href: "/admin/profile", icon: <FaUserCircle /> },
    { name: "Notifications", href: "/admin/notifications", icon: <FaBell /> },
    {
      name: "Paramètres Système",
      href: "/admin/parametres/theme",
      icon: <FaCog />,
    },
  ];

  return (
    <div className="w-64 bg-white flex flex-col p-4 pt-0 pr-0 min-h-full">
      <div className="flex items-center justify-center h-20">
        <h1 className={`text-2xl font-bold text-blue-500`}>
          {/* {appName} */}
          <img
            className="-left-3 top-2 relative"
            src={icon}
            alt="Logo"
            width={100}
          />
        </h1>
      </div>
      <nav>
        <div className="flex flex-col space-y-5 relative">
          <div>
            {links1.map((link, index) => (
              <Link
                key={index}
                to={link.href}
                className={`flex items-center p-2 my-4 hover:text-blue-500 transition-colors duration-200 ${
                  location.pathname === link.href
                    ? `border-r-4 border-blue-500 text-blue-500`
                    : "text-gray-700"
                }`}
              >
                <span className="text-xl mr-3">{link.icon}</span>
                <span className="text-base font-medium">{link.name}</span>
              </Link>
            ))}
          </div>
          <div>
            {links2.map((link, index) => (
              <Link
                key={index}
                to={link.href}
                className={`flex items-center p-2 my-4 hover:text-blue-500 transition-colors duration-200 ${
                  location.pathname === link.href
                    ? `border-r-4 border-blue-500 text-blue-500`
                    : "text-gray-700"
                }`}
              >
                <span className="text-xl mr-3">{link.icon}</span>
                <span className="text-base font-medium">{link.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default SideBar;
