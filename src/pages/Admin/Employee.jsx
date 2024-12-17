import React, { useEffect, useState } from "react";
import SideBar from "../../components/common/SideBar";
import Header from "../../components/common/Header";
import ToastMessage from "../../components/common/ToastMessage";
import SearchAndFilter from "../../components/common/SearchAndFilter";
import GenericTable from "../../components/common/GenericTable";
import { getAllEmployees } from "../../redux/employeeSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
} from "@material-tailwind/react";

function Employee() {
  // const products = useSelector((state) => state.product.products);
  const employees = useSelector((state) => state.employee.employees);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [sortBy, setSortBy] = useState("");
  const dispatch = useDispatch();

  const triggerNotification = (message, type) => {
    setNotification({ message, type });
  };

  // Charger les employés depuis Keycloak
  useEffect(() => {
    // triggerNotification("Chargement des employés...", "info");
    dispatch(getAllEmployees());
  }, []);

  useEffect(() => {
    setFilteredEmployees(employees);
    console.log("ZIKI $$$$ :", employees);
  }, [employees, dispatch]);

  const handleSearch = (searchTerm) => {
    const filtered = employees.filter(
      (employee) =>
        employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.lastName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEmployees(filtered);
  };

  const handleSort = (sortBy) => {
    setSortBy(sortBy);
  };

  const employeeColumns = [
    { label: "Nom d'utilisateur", field: "username" },
    { label: "Email", field: "email" },
    { label: "Prénom", field: "firstName" },
    { label: "Nom", field: "lastName" },
  ];

  const employeeData = filteredEmployees.map((employee) => ({
    username: employee.username,
    email: employee.email || "Non disponible",
    firstName: employee.firstName || "Non spécifié",
    lastName: employee.lastName || "Non spécifié",
    data: {
      id: employee.id,
      username: employee.username,
      email: employee.email,
    },
  }));

  if (!employees || employees.length === 0) {
    return (
      <div className="flex justify-center align-middle">
        <Button variant="text" loading={true}>
          Loading
        </Button>
      </div>
    );
  }

  return (
    <div className="flex bg-gray-100">
      <div>
        <SideBar />
      </div>
      <div className="flex flex-col space-y-5 w-full">
        <div>
          <Header pathToProfile={"/admin/profile"} />
          <ToastMessage
            message={notification.message}
            type={notification.type}
          />
        </div>
        <div className="p-6">
          <SearchAndFilter
            onSearch={handleSearch}
            // btnName="Ajouter un Employé"
            sortedByColumns={employeeColumns}
            onSort={handleSort}
            DialogSize={"xxl"}
          />
          <div className="flex flex-col space-y-5 w-full bg-white px-4 py-4">
            <h1 className="text-2xl text-gray-800 font-bold mb-4">
              Liste des Employés
            </h1>
            {employeeData.length > 0 ? (
              <GenericTable columns={employeeColumns} data={employeeData} />
            ) : (
              <div className="text-center text-gray-500 text-xl">
                Aucun employé trouvé
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Employee;