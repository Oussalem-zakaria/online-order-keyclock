import React, { useEffect, useState } from "react";
import { FaExclamation, FaRoute, FaTruck, FaUser } from "react-icons/fa";

import { Button } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SideBar from "../../components/common/SideBar";
import Header from "../../components/common/Header";
import ToastMessage from "../../components/common/ToastMessage";
import Heading from "../../components/common/Heading";
import { SidebarResponsiveAdmin } from "../../components/common/SidebarResponsiveAdmin";
import { setUser } from "../../redux/userSlice";

function OrderHistory() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  // const drivers = useSelector((state) => state.driver.drivers);

  const primaryColor = useSelector((state) => state.settings.primaryColor);
  const [notification, setNotification] = useState({ message: "", type: "" });

  const triggerNotification = (message, type) => {
    setNotification({ message, type });
  };

  useEffect(() => {
    triggerNotification("Bienvenue sur votre tableau de bord", "info");
  }, []);

  return (
    <>
      <div className="flex bg-gray-100">
        <div>
          <SideBar />
        </div>
        <div className="flex flex-col space-y-5 w-full">
          <div>
            <Header
              pathToProfile={"/admin/profile"}
              SidebarResponsive={SidebarResponsiveAdmin}
            />

            <ToastMessage
              message={notification.message}
              type={notification.type}
            />
          </div>
          <div className="p-6">
            <div className="pb-8 w-max">
              <Heading text={"Tableau de bord"} />
            </div>

            <div className="pb-8 w-max">
              {/* <p
                className={`text-lg text-gray-700 border-b-2 border-${primaryColor}-500 font-semibold`}
              >
                Statistique
              </p> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderHistory;
