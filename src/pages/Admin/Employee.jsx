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
import { getAllProducts } from "../../redux/productsSlice";
import { deleteCustomer, getAllCustomers } from "../../redux/customerSlice";
import SearchAndFilter from "../../components/common/SearchAndFilter";
import GenericTable from "../../components/common/GenericTable";

function Employee() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  // const drivers = useSelector((state) => state.driver.drivers);
  const customers = useSelector((state) => state.product.customers);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const primaryColor = useSelector((state) => state.settings.primaryColor);
  const [notification, setNotification] = useState({ message: "", type: "" });

  const triggerNotification = (message, type) => {
    setNotification({ message, type });
  };

  useEffect(() => {
    triggerNotification("Bienvenue sur votre tableau de bord", "info");
    dispatch(getAllCustomers());
  }, []);

  useEffect(() => {
    setFilteredCustomers(customers);
    console.log("ZIKI $$$$ :", customers);
  }, [customers]);

  const customerColumns = [
    { label: "Nom", field: "lastName" },
    { label: "Prénom", field: "firstName" },
    { label: "Email", field: "email" },
  ];

  const customerData = filteredCustomers.map((customer) => ({
    lastName: customer.lastName,
    firstName: customer.firstName,
    email: customer.email,
    data: {
      id: customer.id,
      lastName: customer.lastName,
      firstName: customer.firstName,
      email: customer.email,
    },
  }));

  const handleSearch = (searchTerm) => {
    const filtered = customers.filter((customer) => {
      customer.firstName.toLowerCase().includes(searchTerm.toLowerCase());
      customer.lastName.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFilteredCustomers(filtered);
  };

  const handleSort = (sortBy) => {
    setSortBy(sortBy);
  };

  const handleDelete = (row) => {
    console.log("Delete this row:", row);
    dispatch(deleteCustomer(row.id))
      .then(() => {
        triggerNotification(
          `client ${row.firstName} ${row.lastName} supprimé avec succès`,
          "success"
        );
      })
      .catch((error) => {
        console.error(
          `Erreur lors de la suppression du client ${row.firstName} ${row.lastName}`,
          error
        );
        triggerNotification(
          `Erreur lors de la suppression du client ${row.firstName} ${row.lastName}`,
          "error"
        );
      });
  };

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
            {/* <div className="pb-8 w-max">
              <Heading text={"Liste des employés"} />
            </div> */}

            <div className="flex space-x-3">
              <SearchAndFilter
                onSearch={handleSearch}
                onAddUser={() => setIsModalOpen(true)}
                onSort={handleSort}
                btnName="Ajouter un Produit"
                sortedByColumns={customerColumns}
                DialogSize={"xxl"}
              >
                {/* <FormAddDriver btnName={"Ajouter un Conducteur"} /> */}
              </SearchAndFilter>
            </div>
            <div className="flex flex-col space-y-5 w-full bg-white px-4 py-4">
              <h1 className="text-2xl text-gray-800 font-bold mb-4">
                Liste des Clients
              </h1>
              {customerData.length > 0 ? (
                <GenericTable
                  columns={customerColumns}
                  data={customerData}
                  // DialogContent={FormViewDriver}
                  // FormElement={FormAddDriver}
                  deleteHandler={handleDelete}
                />
              ) : (
                <div className="text-center text-gray-500 text-xl">
                  Aucun client trouvé
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Employee;
