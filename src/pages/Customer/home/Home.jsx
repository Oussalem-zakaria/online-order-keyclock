import React, { useEffect, useState } from "react";
import SideBar from "../../../components/common/SideBar";
import Header from "../../../components/common/Header";
import ToastMessage from "../../../components/common/ToastMessage";
import Heading from "../../../components/common/Heading";
import { SidebarResponsiveAdmin } from "../../../components/common/SidebarResponsiveAdmin";
import Products from "../../../components/common/Products";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../../redux/productsSlice";
import { addOrder } from "../../../redux/ordersSlice";
import { httpClient } from "../../../services/HttpClient";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import Pagination from "../../../components/common/Pagination";
import axios from "axios";

const ITEMS_PER_PAGE = 8;

function Home() {
  const dispatch = useDispatch();
  const [notification, setNotification] = useState({ message: "", type: "" });
  const products = useSelector((state) => state.product.products);
  const currentUser = useSelector((state) => state.user.currentUser);
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentTrajets = products.slice(indexOfFirstItem, indexOfLastItem);
  const [orderItems, setOrderItems] = useState([]);
  const [size, setSize] = useState(null);

  const triggerNotification = (message, type) => {
    setNotification({ message, type });
  };

  const handleOpen = (value) => {
    setSize(value);
  };

  const fetchImageForProduct = async (productId) => {
    try {
      const response = await httpClient.get(`http://localhost:8765/PRODUCT/api/v1/products/product/${productId}/image`, { responseType: "blob" });
      return URL.createObjectURL(response.data);
    } catch (error) {
      console.error("Error fetching image for product ID:", productId, error);
      return "placeholder-image-url"; // Fallback in case of error
    }
  };

  const [productImages, setProductImages] = useState({});

  useEffect(() => {
    triggerNotification("Bienvenue", "success");
    if (currentUser) {
      dispatch(getAllProducts());
      console.log("Products :", products);
      console.log("USER: ", currentUser);
    }
  }, [dispatch, currentUser]);

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

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleAddToOrder = (product) => {
    setOrderItems((prevItems) => {
      // Vérifie si le produit existe déjà dans la liste des commandes
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        // Mise à jour de la quantité et du prix total
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1, total: (item.quantity + 1) * item.price }
            : item
        );
      }

      // Ajoute un nouvel élément à la commande
      return [
        ...prevItems,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          total: product.price,
          orderDate: new Date().toISOString(),
        },
      ];
    });
  };

  const handleConfirmOrder = () => {
    const customerId = currentUser.id; 
    const total_price = orderItems.reduce((sum, item) => sum + item.total, 0); // Calcul du prix total
    const orderDate = new Date().toISOString().split("T")[0]; // Date du jour au format YYYY-MM-DD

    // Objet de la commande
    const order = {
      customerId: customerId,
      orderItems: orderItems.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.price,
      })),
      total_price: total_price,
      orderDate: orderDate,
  };

  console.log(order); // Affiche l'objet dans la console

  dispatch(addOrder({ orderData: order }))
    .unwrap()
    .then(() => {
      triggerNotification('Commande passée avec succès', 'success');
    })
    .catch(() => {
      triggerNotification('Erreur lors de la commande', 'error');
    });

  handleOpen(false);
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
            <div className="pb-8 flex justify-between">
              <div>
                <Heading text={"Available Products"} />
              </div>
              <Button
                variant="gradient"
                color={"green"}
                type="submit"
                className="rounded-lg"
                onClick={() => handleOpen("lg")}
              >
                <span>Commander ({orderItems.length})</span>
              </Button>
            </div>
            {currentTrajets.length > 0 ? (
              <div>
                <section>
                  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      {currentTrajets.map((product) => (
                        <Products
                          key={product.id}
                          productId={product.id}
                          img={productImages[product.id] || "default-image-url"}  // Fallback if no image is loaded yet
                          name={product.name}
                          description={product.description}
                          price={product.price}
                          quantity={product.stock_quantity}
                          onAddToOrder={() => handleAddToOrder(product)}
                        />
                      ))}
                    </div>
                  </div>
                </section>
                <Pagination
                  currentPage={currentPage}
                  totalPages={Math.ceil(products.length / ITEMS_PER_PAGE)}
                  onPageChange={handlePageChange}
                />
              </div>
            ) : (
              <div className="flex justify-center align-middle bg-white py-5 rounded-sm">
                Aucun produit assigné
              </div>
            )}
          </div>
        </div>
      </div>
  <Dialog open={size === "lg"} size={"lg"} handler={() => handleOpen(null)}>
    <DialogHeader>Résumé de la commande</DialogHeader>
    <DialogBody>
    {orderItems.length > 0 ? (
    <div>
      <ul className="bg-blue-50 px-3 py-2 rounded-sm">
        { console.log("Order Final : ", orderItems),
          orderItems.map((item) => (
          <li key={item.id} className="flex justify-between py-1">
            <span>
              {item.name} x {item.quantity}
            </span>
            <span>{(item.price * item.quantity).toFixed(2)} MAD</span>
          </li>
        ))}
      </ul>
      <div className="mt-4 font-bold text-lg">
        Total :{" "}
        {orderItems
          .reduce((total, item) => total + item.price * item.quantity, 0)
          .toFixed(2)}{" "}
        MAD
      </div>
      <div className="mt-2 text-sm text-gray-600">
        Date de commande : {new Date().toLocaleDateString()}
      </div>
    </div>
    ) : (
    <p>Aucun produit sélectionné</p>
    )}
    </DialogBody>
    <DialogFooter>
    <Button
    variant="text"
    color="red"
    onClick={() => handleOpen(null)}
    className="mr-1"
    >
      <span>Annuler</span>
    </Button>
    <Button variant="gradient" color="green" onClick={handleConfirmOrder}>
      <span>Confirmer la commande</span>
    </Button>
    </DialogFooter>
  </Dialog>
    </>
  );
}

export default Home;