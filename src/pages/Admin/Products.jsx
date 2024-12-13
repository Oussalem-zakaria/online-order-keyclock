import React, { useEffect, useState } from "react";
import { FaExclamation, FaRoute, FaTruck, FaUser } from "react-icons/fa";

import { Button } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setUser } from "../../redux/userSlice";
import Client from "../../WebPages/Client/Client";
import SideBar from "../../components/common/SideBar";
import Header from "../../components/common/Header";
import { SidebarResponsiveAdmin } from "../../components/common/SidebarResponsiveAdmin";
import ToastMessage from "../../components/common/ToastMessage";
import Heading from "../../components/common/Heading";
import GenericTable from "../../components/common/GenericTable";
import SearchAndFilter from "../../components/common/SearchAndFilter";
import { deleteProduct, getAllProducts } from "../../redux/productsSlice";

function Products() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  // const products = useSelector((state) => state.driver.products);

  const primaryColor = useSelector((state) => state.settings.primaryColor);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const products = useSelector((state) => state.product.products);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState("");

  const triggerNotification = (message, type) => {
    setNotification({ message, type });
  };

  useEffect(() => {
    triggerNotification("Bienvenue sur votre tableau de bord", "info");
    dispatch(getAllProducts());
  }, []);

  useEffect(() => {
    setFilteredProducts(products);
    console.log("ZIKI $$$$ :", products);
  }, [products]);

  const productColumns = [
    { label: "Nom du produit", field: "name" },
    { label: "description", field: "description" },
    { label: "Prix", field: "price" },
    { label: "Quantité", field: "stock_quantity" },
  ];

  const productData = filteredProducts.map((product) => ({
    name: product.name,
    description: product.description,
    price: product.price,
    stock_quantity: product.stock_quantity,
    data: {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      stock_quantity: product.stock_quantity,
    },
  }));

  const handleSearch = (searchTerm) => {
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleSort = (sortBy) => {
    setSortBy(sortBy);
  };

  const handleDelete = (row) => {
    console.log("Delete this row:", row);
    dispatch(deleteProduct(row.id))
      .then(() => {
        triggerNotification(
          `Le produit ${row.name} a été supprimé avec succès`,
          "success"
        );
      })
      .catch((error) => {
        console.error(
          `Erreur lors de la suppression du produit ${row.name}`,
          error
        );
        triggerNotification(
          `Erreur lors de la suppression du produit ${row.name}`,
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
              <Heading text={"Liste des produits"} />
            </div> */}
            <div className="flex space-x-3">
              <SearchAndFilter
                onSearch={handleSearch}
                onAddUser={() => setIsModalOpen(true)}
                onSort={handleSort}
                btnName="Ajouter un Produit"
                sortedByColumns={productColumns}
                DialogSize={"xxl"}
              >
                {/* <FormAddDriver btnName={"Ajouter un Conducteur"} /> */}
              </SearchAndFilter>
            </div>
            <div className="flex flex-col space-y-5 w-full bg-white px-4 py-4">
              <h1 className="text-2xl text-gray-800 font-bold mb-4">
                Liste des Produits
              </h1>
              {productData.length > 0 ? (
                <GenericTable
                  columns={productColumns}
                  data={productData}
                  // DialogContent={FormViewDriver}
                  // FormElement={FormAddDriver}
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
      </div>
    </>
  );
}

export default Products;
