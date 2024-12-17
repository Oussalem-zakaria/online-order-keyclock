import React, { useEffect, useState } from "react";
import { FaExclamation, FaRoute, FaTruck, FaUser } from "react-icons/fa";

import { Button } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SideBar from "../../components/common/SideBar";
import Header from "../../components/common/Header";
import ToastMessage from "../../components/common/ToastMessage";
import Heading from "../../components/common/Heading";
import Widget from "../../components/common/Widget";
import { SidebarResponsiveAdmin } from "../../components/common/SidebarResponsiveAdmin";
import { getAllProducts } from "../../redux/productsSlice";
import { getAllOrders } from "../../redux/ordersSlice";
import { getAllCustomers } from "../../redux/customerSlice";
import { getAllEmployees } from "../../redux/employeeSlice";

function Home() {

  const dispatch = useDispatch();
  const [notification, setNotification] = useState({ message: "", type: "" });
  const products = useSelector((state) => state.product.products);
  const orders = useSelector((state) => state.order.orders);
  const customers = useSelector((state) => state.customer.customers);
  const employees = useSelector((state) => state.employee.employees);

  const triggerNotification = (message, type) => {
    setNotification({ message, type });
  };

  useEffect(() => {
    triggerNotification("Bienvenue sur votre tableau de bord", "info");
    dispatch(getAllProducts());
    dispatch(getAllOrders());
    dispatch(getAllCustomers());
    dispatch(getAllEmployees());
  }, [dispatch]);

  if(!orders || !products || !customers || !employees){
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
            <div className="grid grid-cols-1 md:grid-cols-4 bg-white py-6 px-4 rounded-lg gap-6">
              <Widget name="Total Produits" color="bg-teal-400" value={products.length} />
              <Widget name="Total Employées" color="bg-indigo-400" value={employees.length} />
              <Widget name="Total Commandes" color="bg-green-500" value={orders.length} />
              <Widget name="Total Clients" color="bg-orange-500" value={customers.length} />
            </div>
            <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
            <div className="py-5">
              <Heading text={"Commandes Récentes"} />
            </div>
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-blue-100">
                  <th className="p-1.5 text-start">ID</th>
                  <th className="p-1.5 text-start">Client</th>
                  <th className="p-1.5 text-start">Montant</th>
                  <th className="p-1.5 text-start">La Date</th>
                  <th className="p-1.5 text-start">Statut</th>
                </tr>
              </thead>
              <tbody>
              {
                orders.map((order) => {return (
                        <tr className="border-b bg-gray-100">
                          <td className="p-2">#{order.id}</td>
                          <td className="p-2">{order.customerId}</td>
                          <td className="p-2">{order.total_price}</td>
                          <td className="p-2">{order.orderDate}</td>
                          <td className="p-2 text-green-500">
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
                        </tr>
                        )}
                )
              }
              </tbody>
            </table>
          </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
