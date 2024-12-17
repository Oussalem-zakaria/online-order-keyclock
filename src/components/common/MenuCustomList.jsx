import React, { useEffect } from "react";
import {
  Menu,
  MenuHandler,
  MenuList,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
} from "@material-tailwind/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import avatar from "../../assets/imgs/avatar.png";
import keycloak from "../../config/keycloak";

export function MenuCustomList({ user, pathToProfile }) {
  const [openMenu, setOpenMenu] = React.useState(false);
  const primaryColor = useSelector((state) => state.settings.primaryColor);
  const [size, setSize] = React.useState(null);

  const navigate = useNavigate();

  const handleOpen = (value) => {
    setSize(value);
  };

  const handleLogout = () => {
    keycloak.logout({ redirectUri: "http://localhost:3000/" });
  };

  const openProfile = () => {
    if(user.roles.includes("ADMIN") || user.roles.includes("EMPLOYEE")){
      keycloak.accountManagement();
    }
  };

  useEffect(() => {
    console.log("User Roles", user.roles);
  }, [user]);

  return (
    <>
      <Menu open={openMenu} handler={setOpenMenu} allowHover>
        <MenuHandler>
          <div className="flex items-center space-x-3 border-l-2 border-white h-9 pl-5 cursor-pointer">
            <div className="w-10 h-10 bg-gray-300 rounded-full">
              <img
                src={avatar}
                alt="Avatar"
                className="w-full h-full rounded-full"
              />
            </div>
            <div className="text-white">
              <p className="font-bold capitalize">
                {user.firstName + " " + user.lastName}
              </p>
              <p className="text-sm capitalize">
                {
                  // si reoles contient admin alors afficher Admin sinon si EMPLOYEE alors afficher Employé sinon afficher utilisateur
                  user.roles.includes("ADMIN")
                    ? "Admin"
                    : user.roles.includes("EMPLOYEE")
                    ? "Employé"
                    : "Utilisateur"
                }
              </p>
            </div>
            <div className="flex self-baseline">
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`h-3.5 w-3.5 transition-transform text-white ${
                  openMenu ? "rotate-180" : ""
                }`}
              />
            </div>
          </div>
        </MenuHandler>
        <MenuList className="w-1/3 py-4">
          <div className="flex justify-between">
            <div className="px-3 py-2 text-gray-700 flex space-x-3">
              <div className="w-12 h-w-12 bg-gray-300 rounded-full">
                <img
                  src={avatar}
                  alt="Avatar"
                  className="w-full h-full rounded-full"
                />
              </div>
              <div className="flex flex-col justify-between">
                <p className="font-bold text-sm capitalize">
                  {user.firstName + " " + user.lastName}
                </p>
                <p className="text-sm">{user.email}</p>
              </div>
            </div>
            <div className="px-4 py-3 flex align-middle items-center">
              <Link
                to={pathToProfile}
                className={`text-${primaryColor}-500 hover:underline font-bold text-sm`}
                onClick={openProfile}
              >
                Mon Profile
              </Link>
            </div>
          </div>
          <div className="px-4 py-2 border-t flex space-x-2 items-center justify-center">
            <div>
              <FaSignOutAlt className="text-red-500" />
            </div>
            <button
              // onClick={() => handleOpen("sm")}
              onClick={handleLogout}
              className="text-red-500 hover:underline font-bold"
            >
              Déconnexion
            </button>
          </div>
        </MenuList>
      </Menu>
      {/* <Dialog open={size === "sm"} size={"sm"} handler={() => handleOpen(null)}>
        <DialogHeader>Se déconnecter</DialogHeader>
        <DialogBody>
          <h2 className="text-2xl font-semiBold">
            Êtes-vous sûr de vouloir vous déconnecter ?
          </h2>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => handleOpen(null)} // Correct usage
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color={primaryColor}
            onClick={handleLogout} // Correct usage
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog> */}
    </>
  );
}
