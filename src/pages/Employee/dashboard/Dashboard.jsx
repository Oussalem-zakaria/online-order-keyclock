import React, { useEffect, useState } from "react";
import { FaExclamation, FaRoute, FaTruck, FaUser } from "react-icons/fa";

import { Button } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SideBar from "../../../components/common/SideBar";
import Header from "../../../components/common/Header";
import ToastMessage from "../../../components/common/ToastMessage";
import Heading from "../../../components/common/Heading";
import Widget from "../../../components/common/Widget";
import { SidebarResponsiveAdmin } from "../../../components/common/SidebarResponsiveAdmin";
import { getAllOrders } from "../../../redux/ordersSlice";

function Dashboard() {

  const dispatch = useDispatch();
  const [notification, setNotification] = useState({ message: "", type: "" });
  const products = useSelector((state) => state.product.products);
  const orders = useSelector((state) => state.order.orders);

  const triggerNotification = (message, type) => {
    setNotification({ message, type });
  };

  useEffect(() => {
    triggerNotification("Bienvenue sur votre tableau de bord", "info");
    dispatch(getAllOrders());
  }, [dispatch]);

  if(!orders){
    return (
      <div className="flex justify-center align-middle">
        <Button variant="text" loading={true}>
          Loading
        </Button>
      </div>
    );
  }

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
            <div className="grid grid-cols-1 md:grid-cols-2 bg-white py-6 px-4 rounded-lg gap-6">
              <Widget name="Total Commandes" color="bg-gray-800" value={orders.length} />
              <Widget 
                name="Les Commandes En attente" 
                color="bg-yellow-700" 
                value={orders.filter(order => order.status === "En attente").length} 
              />
              <Widget name="Les Commandes En préparation" color="bg-blue-500" value={orders.filter(order => order.status === "En préparation").length} />
              <Widget name="Les Commandes Expédiée" color="bg-green-500" value={orders.filter(order => order.status === "Expédiée").length}  />
              <Widget name="Les Commandes Livrée" color="bg-purple-500" value={orders.filter(order => order.status === "Livrée").length}  />
              <Widget name="Les Commandes Annulée" color="bg-red-500" value={orders.filter(order => order.status === "Annulée").length}  />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
