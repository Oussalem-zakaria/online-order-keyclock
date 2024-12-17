import React, { useEffect, useState } from "react";
import { FaExclamation, FaRoute, FaTruck, FaUser } from "react-icons/fa";

import { Button } from "@material-tailwind/react";
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
import FormAddProduct from "./FormAddProduct";
import { deleteProduct, getAllProducts } from "../../../redux/productsSlice";
import { httpClient } from "../../../services/HttpClient";

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

  const [productImages, setProductImages] = useState({});

  const triggerNotification = (message, type) => {
    setNotification({ message, type });
  };

  useEffect(() => {
    // triggerNotification("Bienvenue sur votre tableau de bord", "info");
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    setFilteredProducts(products);
    console.log("ZIKI $$$$ :", products);
  }, [products, dispatch]);

  useEffect(() => {
    const fetchProductImages = async () => {
      const images = await Promise.all(
        products.map(async (product) => {
          const imageUrl = await fetchImageForProduct(product.id);
          return { [product.id]: imageUrl };
        })
      );
      setProductImages(Object.assign({}, ...images));
    };

    if (products.length > 0) {
      fetchProductImages();
    }
  }, [products]);

  useEffect(() => {
    let filtered = [...products];
    if (sortBy) {
      filtered = filtered.sort((a, b) => {
        if (sortBy === "name")
          return a.name.localeCompare(b.name);
        if (sortBy === "description")
          return a.description.localeCompare(b.description);
        if (sortBy === "price")
          return Number(a.price) - Number(b.price);
        if (sortBy === "stock_quantity")
          return Number(a.stock_quantity) - Number(b.stock_quantity);
        return 0;
      });
    }
    setFilteredProducts(filtered);
  }, [sortBy, products]);

  const productColumns = [
    { label: "Image", field: "image" },
    { label: "Nom du produit", field: "name" },
    { label: "description", field: "description" },
    { label: "Prix", field: "price" },
    { label: "Quantité", field: "stock_quantity" },
    { label: "Category", field: "category" },
  ];

  const productData = filteredProducts.map((product) => ({
    image: (
        <img
          src={productImages[product.id]}
          alt={product.name}
          className="w-18 rounded-xl object-cover"
        />
    ),
    name: product.name,
    description: product.description,
    price: product.price,
    stock_quantity: product.stock_quantity,
    category: product.category,
    data: {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      stock_quantity: product.stock_quantity,
    },
  }));

  const fetchImageForProduct = async (productId) => {
    try {
      const response = await httpClient.get(`http://localhost:8765/PRODUCT/api/v1/products/product/${productId}/image`, { responseType: "blob" });
      return URL.createObjectURL(response.data);
    } catch (error) {
      console.error("Error fetching image for product ID:", productId, error);
      return "placeholder-image-url"; // Fallback in case of error
    }
  };

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

  if (!products || products.length === 0) {
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
                 <FormAddProduct btnName={"Ajouter un Conducteur"} /> 
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
                  FormElement={FormAddProduct}
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
