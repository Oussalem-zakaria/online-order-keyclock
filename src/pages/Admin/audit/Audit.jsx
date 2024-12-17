import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SideBar from "../../../components/common/SideBar";
import Header from "../../../components/common/Header";
import { SidebarResponsiveAdmin } from "../../../components/common/SidebarResponsiveAdmin";
import ToastMessage from "../../../components/common/ToastMessage";
import Heading from "../../../components/common/Heading";
import GenericTable from "../../../components/common/GenericTable";
import SearchAndFilter from "../../../components/common/SearchAndFilter";
import { getAllAudits, deleteAudit } from "../../../redux/auditSlice"; // Redux slice pour Audit
import { Button } from "@material-tailwind/react";

function Audit() {
  const dispatch = useDispatch();
  const audits = useSelector((state) => state.audit.audits || []);
  const [filteredAudits, setFilteredAudits] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [notification, setNotification] = useState({ message: "", type: "" });

  const triggerNotification = (message, type) => {
    setNotification({ message, type });
  };

  // Charger les audits
  useEffect(() => {
    triggerNotification("Bienvenue sur le tableau de bord des audits", "info");
    dispatch(getAllAudits());
  }, [dispatch]);

  useEffect(() => {
    setFilteredAudits(audits);
  }, [audits]);

  // Trier les audits
  useEffect(() => {
    let filtered = [...audits];
    if (sortBy) {
      filtered = filtered.sort((a, b) => {
        if (sortBy === "userId") return a.userId.localeCompare(b.userId);
        if (sortBy === "action") return a.action.localeCompare(b.action);
        if (sortBy === "entityType") return a.entityType.localeCompare(b.entityType);
        if (sortBy === "timestamp") return new Date(a.timestamp) - new Date(b.timestamp);
        return 0;
      });
    }
    setFilteredAudits(filtered);
  }, [sortBy, audits]);

  // Colonnes du tableau
  const auditColumns = [
    { label: "User ID", field: "userId" },
    { label: "Action", field: "action" },
    { label: "Type d'Entité", field: "entityType" },
    { label: "ID d'Entité", field: "entityId" },
    { label: "Horodatage", field: "timestamp" },
  ];

  // Construire les données pour le tableau
  const auditData = filteredAudits.map((audit) => ({
    id: audit.id,
    userId: audit.userId || "Non spécifié",
    action: audit.action || "-",
    entityType: audit.entityType || "-",
    entityId: audit.entityId || "-",
    timestamp: audit.timestamp
      ? new Date(audit.timestamp).toLocaleString()
      : "Non disponible",
    data: audit,
  }));

  const handleSearch = (searchTerm) => {
    const filtered = audits.filter(
      (audit) =>
        audit.userId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        audit.action?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        audit.entityType?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAudits(filtered);
  };

  const handleSort = (sortBy) => {
    setSortBy(sortBy);
  };

  const handleDelete = (row) => {
    dispatch(deleteAudit(row.id))
      .then(() => {
        triggerNotification(`Audit supprimé avec succès`, "success");
      })
      .catch(() => {
        triggerNotification(`Erreur lors de la suppression`, "error");
      });
  };

  if (!audits || audits.length === 0) {
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
          <Header
            pathToProfile="/admin/profile"
            SidebarResponsive={SidebarResponsiveAdmin}
          />
          <ToastMessage message={notification.message} type={notification.type} />

          <div className="p-6">
            <SearchAndFilter
              onSearch={handleSearch}
              onSort={handleSort}
              sortedByColumns={auditColumns}
            />

            <div className="flex flex-col space-y-5 w-full bg-white px-4 py-4">
              <h1 className="text-2xl text-gray-800 font-bold mb-4">
                Historique des Commandes
              </h1>
              {auditData?.length > 0 ? (
                <GenericTable
                  columns={auditColumns}
                  data={auditData}
                  deleteHandler={handleDelete}
                />
              ) : (
                <div className="text-center text-gray-500 text-xl">
                  Aucun audit trouvé
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Audit;
