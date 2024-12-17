import React, { useEffect, useState } from "react";
import { FaExclamation, FaRoute, FaTruck, FaUser } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SideBar from "../../../components/common/SideBar";
import Header from "../../../components/common/Header";
import { SidebarResponsiveAdmin } from "../../../components/common/SidebarResponsiveAdmin";
import ToastMessage from "../../../components/common/ToastMessage";
import Heading from "../../../components/common/Heading";
import GenericTable from "../../../components/common/GenericTable";
import SearchAndFilter from "../../../components/common/SearchAndFilter";
// import FormAddOrder from "./FormAddOrder";
import { deleteOrder, getOrdersByCustomer } from "../../../redux/ordersSlice";
import { getCustomer } from "../../../redux/customerSlice";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";

function Orders() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.orders);
  const customers = useSelector((state) => state.customer.customers || {});
  const currentUser = useSelector((state) => state.user.currentUser);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const [notification, setNotification] = useState({ message: "", type: "" });

  const triggerNotification = (message, type) => {
    setNotification({ message, type });
  };

  // Charger les commandes et récupérer les clients
  useEffect(() => {
    triggerNotification("Bienvenue sur votre tableau de bord", "info");
    console.log("USER: ", currentUser.id)
    if(currentUser.id){
      dispatch(getOrdersByCustomer(currentUser.id));
      console.log("Orders: ", orders)
    }
  }, [dispatch, currentUser]);

  useEffect(() => {
    // Récupérer tous les clients pour les commandes
    if (orders.length > 0) {
      orders.forEach((order) => {
        if (!customers[order.customerId]) {
          dispatch(getCustomer(order.customerId));
        }
      });
    }
    setFilteredOrders(orders);
  }, [orders, dispatch, customers]);

  // Trier les commandes
  useEffect(() => {
    let filtered = [...orders];
    if (sortBy) {
      filtered = filtered.sort((a, b) => {
        if (sortBy === "customerName") return a.customerName.localeCompare(b.customerName);
        if (sortBy === "totalPrice") return Number(a.totalPrice) - Number(b.totalPrice);
        if (sortBy === "date") return a.date.localeCompare(b.date);
        if (sortBy === "status") return a.status.localeCompare(b.status);
        return 0;
      });
    }
    setFilteredOrders(filtered);
  }, [sortBy, orders]);

  // Colonnes du tableau
  const orderColumns = [
    { label: "Produits Commandés", field: "products" },
    { label: "Total Price", field: "totalPrice" },
    { label: "Date", field: "date" },
    { label: "Status", field: "status" },
  ];

  // Construire les données pour le tableau
  const orderData = filteredOrders.map((order) => {
    return {
      id: order.id,
      products: (
        <details className="cursor-pointer">
          <summary className="font-medium text-blue-600">
            Voir les produits ({order.orderItems.length})
          </summary>
          <ul className="list-disc text-gray-700 bg-gray-100 ps-1 py-2">
            {order.orderItems.map((item) => (
              <li key={item.id} className="">
                <span>Produit ID: {item.productId}</span>,{" "}
                <span>Quantité: {item.quantity}</span>
              </li>
            ))}
          </ul>
        </details>
      ),
      totalPrice: order.total_price ? `${order.total_price} MAD` : "-",
      date: order.orderDate || "-",
      status: order.status ? (
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
      ) : ("-"),
      data: {
        id: order.id,
        customerId: order.customerId,
        orderItems: order.orderItems,
        status: order.status,
        total_price: order.total_price,
        orderDate: order.orderDate
      }
    };
  });

  const handleSearch = (searchTerm) => {
    const filtered = orders.filter(
      (order) =>
        order.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.productName?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOrders(filtered);
  };

  const handleSort = (sortBy) => {
    setSortBy(sortBy);
  };

  const handleDelete = (row) => {
    dispatch(deleteOrder(row.id))
      .then(() => {
        triggerNotification(
          `La commande a été supprimée avec succès`,
          "success"
        );
      })
      .catch(() => {
        triggerNotification(`Erreur lors de la suppression`, "error");
      });
  };

  return (
    <>
      <div className="flex bg-gray-100">
        <SideBar />
        <div className="flex flex-col space-y-5 w-full">
          <Header pathToProfile="/admin/profile" SidebarResponsive={SidebarResponsiveAdmin} />
          <ToastMessage message={notification.message} type={notification.type} />

          <div className="p-6">
            <SearchAndFilter
              onSearch={handleSearch}
              onAddUser={() => setIsModalOpen(true)}
              onSort={handleSort}
              // btnName="Ajouter une Commande"
              sortedByColumns={orderColumns}
            >
              {/*<FormAddOrder btnName="Ajouter une Commande" />*/}
            </SearchAndFilter>

            <div className="flex flex-col space-y-5 w-full bg-white px-4 py-4">
              <h1 className="text-2xl text-gray-800 font-bold mb-4">Liste des Commandes</h1>
              {orderData.length > 0 ? (
                <GenericTable
                  columns={orderColumns}
                  data={orderData}
                  // FormElement={FormAddOrder}
                  deleteHandler={handleDelete}
                />
              ) : (
                <div className="text-center text-gray-500 text-xl">
                  Aucune commande trouvée
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Orders;