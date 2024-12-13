import FormAddDriver from "@/components/admin/Driver/FormAddDriver";
import FormViewDriver from "@/components/admin/Driver/FormViewDriver";
import GenericTable from "@/components/admin/common/GenericTable";
import Header from "@/components/admin/common/Header";
import Heading from "@/components/admin/common/Heading";
import SearchAndFilter from "@/components/admin/common/SearchAndFilter";
import SideBar from "@/components/admin/common/SideBar";
import { SidebarResponsiveAdmin } from "@/components/admin/common/SidebarResponsiveAdmin";
import ToastMessage from "@/components/admin/common/ToastMessage";
import { useDispatch, useSelector } from "react-redux";
import { deleteDriver, getAllDrivers, updateDriver } from "@/redux/driverSlice";
import React, { useEffect, useState } from "react";
import { Button, Switch } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

function Drivers() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const drivers = useSelector((state) => state.driver.drivers);
  const [filteredDrivers, setFilteredDrivers] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "" });

  const triggerNotification = (message, type) => {
    setNotification({ message, type });
  };

  useEffect(() => {
    dispatch(getAllDrivers());
  }, [dispatch]);

  useEffect(() => {
    setFilteredDrivers(drivers);
    console.log("ZIKI $$$$ :", drivers);
  }, [drivers]);

  useEffect(() => {
    let filtered = [...drivers];

    if (sortBy) {
      filtered = filtered.sort((a, b) => {
        if (sortBy === "nameEmail")
          return (
            a.lastname.localeCompare(b.lastname) ||
            a.email.localeCompare(b.email)
          );
        if (sortBy === "cin") return a.cin.localeCompare(b.cin);
        if (sortBy === "permis") return a.permis.localeCompare(b.permis);
        if (sortBy === "creationDate")
          return new Date(a.creationDate) - new Date(b.creationDate);
        if (sortBy === "disponibility")
          // sorted by disponibility descending
          return a.disponibility === b.disponibility
            ? 0
            : a.disponibility
            ? -1
            : 1;
        return 0;
      });
    }

    setFilteredDrivers(filtered);
  }, [sortBy, drivers]);

  const handleSearch = (searchTerm) => {
    const filtered = drivers.filter(
      (driver) =>
        driver.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        driver.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        driver.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        driver.cin.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDrivers(filtered);
  };

  const handleSort = (sortBy) => {
    setSortBy(sortBy);
  };

  const handleDelete = (row) => {
    console.log("Delete this row:", row);
    dispatch(deleteDriver(row.id))
      .then(() => {
        triggerNotification(
          `Conducteur ${row.firstname} ${row.lastname} supprimé avec succès`,
          "success"
        );
      })
      .catch((error) => {
        console.error(
          `Error while deleting the driver ${row.firstname} ${row.lastname}`,
          error
        );
        triggerNotification(
          `Erreur lors de la suppression du conducteur ${row.firstname} ${row.lastname}`,
          "error"
        );
      });
  };

  const driverColumns = [
    { label: "Nom et email", field: "nameEmail" },
    { label: "CIN", field: "cin" },
    { label: "permis de conduire", field: "permis" },
    { label: "NIR", field: "nir" },
    { label: "Date de création", field: "creationDate" },
    { label: "Disponibilité", field: "disponibility" },
  ];

  const driversData = filteredDrivers.map((driver) => ({
    nameEmail: (
      <div>
        <div>{driver.firstname + " " + driver.lastname}</div>
        <div className="text-sm text-gray-500">{driver.email}</div>
      </div>
    ),
    cin: driver.cin,
    permis: driver.permis,
    nir: driver.nir,
    creationDate: driver.creationDate,
    disponibility: driver.disponibility ? (
      <span
        className="
      bg-green-200 text-green-900 px-2 py-1 rounded-full text-xs font-semibold capitalize
      "
      >
        disponible
      </span>
    ) : (
      <span
        className="
      bg-red-200 text-red-900 px-2 py-1 rounded-full text-xs font-semibold capitalize
      "
      >
        indisponible
      </span>
    ),
    role: driver.roles[0].name,
    data: {
      id: driver.id,
      firstname: driver.firstname,
      lastname: driver.lastname,
      email: driver.email,
      cin: driver.cin,
      permis: driver.permis,
      nir: driver.nir,
      address: driver.address,
      phoneNumber: driver.phoneNumber,
      disponibility: driver.disponibility,
      active: driver.active,
      dateOfBirth: driver.dateOfBirth,
      password: driver.password,
      confirmPassword: driver.confirmPassword,
      creationDate: driver.creationDate,
      responsable: driver.responsable,
    },
  }));

  return (
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
        </div>
        <div className="flex flex-col space-y-5 px-4 py-5">
          <Heading text="Gestion des Conducteurs" />
          <div className="flex space-x-3">
            <SearchAndFilter
              onSearch={handleSearch}
              onAddUser={() => setIsModalOpen(true)}
              onSort={handleSort}
              btnName="Ajouter un Conducteur"
              sortedByColumns={driverColumns}
              DialogSize={"xxl"}
            >
              <FormAddDriver btnName={"Ajouter un Conducteur"} />
            </SearchAndFilter>
          </div>
          <div className="flex flex-col space-y-5 w-full bg-white px-4 py-4">
            <h1 className="text-2xl text-gray-800 font-bold mb-4">
              Liste des Conducteurs
            </h1>
            {driversData.length > 0 ? (
              <GenericTable
                columns={driverColumns}
                data={driversData}
                DialogContent={FormViewDriver}
                FormElement={FormAddDriver}
                deleteHandler={handleDelete}
              />
            ) : (
              <div className="text-center text-gray-500 text-xl">
                Aucun conducteur trouvé
              </div>
            )}
          </div>
        </div>
      </div>
      <ToastMessage message={notification.message} type={notification.type} />
    </div>
  );
}

export default Drivers;
