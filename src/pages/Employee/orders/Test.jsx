import React, { useState, useEffect } from "react";

const OrderStatus = ["En attente", "En préparation", "Expédiée", "Livrée", "Annulée"];

const EmployeeOrderPage = () => {
  const [orders, setOrders] = useState([
    { id: 1, customerName: "Zakaria Oussalem", total: 120, status: "En attente" },
    { id: 2, customerName: "John Doe", total: 250, status: "En préparation" },
    { id: 3, customerName: "Alice Smith", total: 80, status: "Expédiée" },
  ]);

  const handleStatusChange = (id, newStatus) => {
    const updatedOrders = orders.map((order) =>
      order.id === id ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Gestion des Commandes</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-gray-700 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-left">Client</th>
              <th className="py-3 px-6 text-left">Total</th>
              <th className="py-3 px-6 text-center">Statut</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-medium">
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-6">{order.id}</td>
                <td className="py-3 px-6">{order.customerName}</td>
                <td className="py-3 px-6">{order.total} MAD</td>
                <td className="py-3 px-6 text-center">
                  <span
                    className={`py-1 px-3 rounded-full text-white text-xs ${
                      order.status === "En attente" ? "bg-yellow-500" :
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
  );
};

export default EmployeeOrderPage;