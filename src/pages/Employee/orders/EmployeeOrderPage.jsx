import React, { useEffect, useState } from "react";
import { FaExclamation, FaRoute, FaTruck, FaUser } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setUser } from "../../../redux/userSlice";
import Client from "../../../WebPages/Client/Client";
import SideBar from "../../../components/common/SideBar";
import Header from "../../../components/common/Header";
import { SidebarResponsiveAdmin } from "../../../components/common/SidebarResponsiveAdmin";
import ToastMessage from "../../../components/common/ToastMessage";
import Heading from "../../../components/common/Heading";
import GenericTable from "../../../components/common/GenericTable";
import SearchAndFilter from "../../../components/common/SearchAndFilter";
// import FormAddOrder from "./FormAddOrder";
import { deleteOrder, getAllOrders, updateOrder } from "../../../redux/ordersSlice";
import { getCustomer,getAllCustomers } from "../../../redux/customerSlice";
import {
  Button,
} from "@material-tailwind/react";

function EmployeeOrderPage() {
    const dispatch = useDispatch();
 const OrderStatus = ["En attente", "En préparation", "Expédiée", "Livrée", "Annulée"];
  const [notification, setNotification] = useState({ message: "", type: "" });
  const orders = useSelector((state) => state.order.orders);

  const triggerNotification = (message, type) => {
    setNotification({ message, type });
  };

  useEffect(() => {
    triggerNotification("Bienvenue sur votre tableau de bord", "info");
    dispatch(getAllOrders());
    // dispatch(getAllCustomers());
  }, [dispatch]);

  const handleStatusChange = (id, newStatus) => {
    // Trouver la commande actuelle depuis le state
    const orderToUpdate = orders.find((order) => order.id === id);

    if (!orderToUpdate) {
      triggerNotification("Commande introuvable", "error");
      return;
    }

    // Mettre à jour le statut dans l'objet complet
    const updatedOrder = { ...orderToUpdate, status: newStatus };

    // Dispatch l'action Redux pour mettre à jour la commande complète
    dispatch(updateOrder({ orderId: id, orderData: updatedOrder }))
      .then(() => {
        triggerNotification("Le statut de la commande a été mis à jour avec succès", "success");
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour de la commande :", error);
        triggerNotification("Une erreur est survenue lors de la mise à jour du statut", "error");
      });
  };

  if (!orders || orders.length === 0) {
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
      <SideBar />
      <div className="flex flex-col space-y-5 w-full">
      <Header pathToProfile="/admin/profile" SidebarResponsive={SidebarResponsiveAdmin} />
      <ToastMessage message={notification.message} type={notification.type} />

      <div className="p-6">
      <div className="max-w-6xl mx-auto p-6">
      <div className="pb-4">
        <Heading text="Gestion des Commandes" />
      </div>
      <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-lg border border-gray-200 rounded-lg">
      <thead>
      <tr className="bg-blue-50 text-gray-700 uppercase text-sm leading-normal">
      <th className="py-3 px-6 text-left">ID</th>
      <th className="py-3 px-6 text-left">Client ID</th>
      <th className="py-3 px-6 text-left">Total</th>
      <th className="py-3 px-6 text-center">Statut</th>
      <th className="py-3 px-6 text-center">Actions</th>
      </tr>
      </thead>
        <tbody className="text-gray-600 text-sm font-medium">
          {orders.map((order) => (
            <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="py-3 px-6">{order.id}</td>
              <td className="py-3 px-6">{order.customerId}</td>
              <td className="py-3 px-6">{order.total_price} MAD</td>
              <td className="py-3 px-6 text-center">
                <span
                  className={`py-1 px-3 rounded-full text-white text-xs ${
                    order.status === "En attente" ? "bg-yellow-800" :
                    order.status === "En préparation" ? "bg-blue-500" :
                    order.status === "Expédiée" ? "bg-green-500" :
                    order.status === "Livrée" ? "bg-purple-500" : "bg-red-500"
                  }`}
                >
                  {order.status}
                </span>
              </td>
              <td className="py-3 px-6 text-center">
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                  className="py-1 px-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {OrderStatus.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      </div>
      </div>
      </div>
      </div>
    </>
  );
}

export default EmployeeOrderPage;