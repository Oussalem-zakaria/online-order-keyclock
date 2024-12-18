import React, { useEffect, useState } from "react";
import { FaExclamation, FaRoute, FaTruck, FaUser } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

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
import { deleteOrder, getOrdersByCustomer, updateOrder } from "../../../redux/ordersSlice";
import { getCustomer, getAllCustomers } from "../../../redux/customerSlice";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";

function CustomerOrders() {
  const dispatch = useDispatch();
  const OrderStatus = ["En attente", "En préparation", "Expédiée", "Livrée", "Annulée"];
  const [notification, setNotification] = useState({ message: "", type: "" });
  const orders = useSelector((state) => state.order.orders);
  const currentUser = useSelector((state) => state.user.currentUser);
  const [size, setSize] = useState(null);
  const [orderToCancel, setOrderToCancel] = useState(null); // Store the order to be canceled

  const triggerNotification = (message, type) => {
    setNotification({ message, type });
  };

  const handleOpen = (value) => {
    setSize(value);
  };

  useEffect(() => {
    triggerNotification("Bienvenue", "info");
    dispatch(getOrdersByCustomer(currentUser.id));
    // dispatch(getAllCustomers());
  }, [dispatch, currentUser]);

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

  const handleCancelOrder = () => {
    if (!orderToCancel) {
      triggerNotification("Aucune commande sélectionnée pour annulation", "error");
      return;
    }

    // Mettre à jour le statut de la commande à "Annulée"
    handleStatusChange(orderToCancel.id, "Annulée");
    setOrderToCancel(null); // Reset the selected order
    handleOpen(null); // Close the dialog
  };

  if (!orders) {
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
                              order.status === "En attente"
                                ? "bg-yellow-800"
                                : order.status === "En préparation"
                                ? "bg-blue-500"
                                : order.status === "Expédiée"
                                ? "bg-green-500"
                                : order.status === "Livrée"
                                ? "bg-purple-500"
                                : "bg-red-500"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="py-3 px-6 text-center">
                          <div>
                            <button
                              className={`text-red-500 hover:text-red-600 ${
                                order.status !== "En attente" ? "opacity-50 cursor-not-allowed" : ""
                              }`}
                              onClick={() => {
                                setOrderToCancel(order); // Store the order to cancel
                                handleOpen("sm");
                              }}
                              disabled={order.status !== "En attente"}
                            >
                              <MdCancel size="20" />
                            </button>
                          </div>
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

      <Dialog open={size === "sm"} size={"sm"} handler={() => handleOpen(null)}>
        <DialogHeader>Annuler la commande</DialogHeader>
        <DialogBody>
          <p>Êtes-vous sûr de vouloir annuler cette commande ?</p>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={() => handleOpen(null)} className="mr-1">
            <span>Annuler</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleCancelOrder}>
            <span>Confirmer Annulation</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default CustomerOrders;