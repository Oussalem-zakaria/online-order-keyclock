import React from "react";
import {
  IconButton,
  Typography,
  List,
  Drawer,
  Card,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LogOutIcon } from "lucide-react";
import icon from "../../assets/imgs/icon.png";

export function SidebarResponsive({ links1, links2 }) {
  const [open, setOpen] = React.useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const appName = useSelector((state) => state.settings.appName);
  const primaryColor = useSelector((state) => state.settings.primaryColor);
  const [size, setSize] = React.useState(null);
  const navigate = useNavigate();

  const location = useLocation();

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  const handleOpen = (value) => {
    setSize(value);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login"); // Rediriger vers la page de connexion après déconnexion
  };

  return (
    <>
      <IconButton variant="text" size="lg" onClick={openDrawer}>
        {isDrawerOpen ? (
          <XMarkIcon className="h-8 w-8 stroke-2 text-white" />
        ) : (
          <Bars3Icon className="h-8 w-8 stroke-2 text-white" />
        )}
      </IconButton>
      <Drawer open={isDrawerOpen} onClose={closeDrawer}>
        <Card
          color="transparent"
          shadow={false}
          className="h-[calc(100vh-2rem)] w-full"
        >
          <div className="flex justify-center items-center">
            <img className="relative" src={icon} alt="Logo" width={130} />
          </div>
          <List className="p-0 overflow-y-scroll">
            {links1.map((link, index) => (
              <Link
                key={index}
                to={link.href}
                className={`flex items-center my-4 py-2 ps-4 hover:text-blue-500 transition-colors duration-200 ${
                  location.pathname === link.href
                    ? `border-r-4 border-blue-500 text-blue-500`
                    : "text-gray-700"
                }`}
              >
                <span className="text-xl mr-3">{link.icon}</span>
                <span className="text-base font-medium">{link.name}</span>
              </Link>
            ))}
            <hr className="my-2 border-blue-gray-50" />
            {links2.map((link, index) => (
              <Link
                key={index}
                to={link.href}
                className={`flex items-center my-4 py-2 ps-4 hover:text-blue-500 transition-colors duration-200 ${
                  location.pathname === link.href
                    ? `border-r-4 border-blue-500 text-blue-500`
                    : "text-gray-700"
                }`}
              >
                <span className="text-xl mr-3">{link.icon}</span>
                <span className="text-base font-medium">{link.name}</span>
              </Link>
            ))}
            <hr className="my-2 border-blue-gray-50" />
            <button
              onClick={() => handleOpen("sm")}
              className="flex items-center my-4 py-2 ps-4 hover:text-blue-500 transition-colors duration-200"
            >
              <span className="text-xl mr-3">
                <LogOutIcon className="h-8 w-8 stroke-2 text-red-600" />
              </span>
              <span className="text-base font-medium text-red-600">
                Déconnexion
              </span>
            </button>
          </List>
          <Dialog
            open={size === "sm"}
            size={"sm"}
            handler={() => handleOpen(null)}
          >
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
          </Dialog>
        </Card>
      </Drawer>
    </>
  );
}
