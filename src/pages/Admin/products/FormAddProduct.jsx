import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@material-tailwind/react";
import ToastMessage from "../../../components/common/ToastMessage";
import { useDispatch } from "react-redux";
import { addProduct, updateProduct, getAllProducts } from "../../../redux/productsSlice";

const FormAddProduct = ({ handleOpen, data = null, btnName, isEdit = false }) => {
  const dispatch = useDispatch();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock_quantity: "",
    category: "",
    brand: "",
  });
  const [image, setImage] = useState(null);
  const [notification, setNotification] = useState({ message: "", type: "" });

  // Charger les valeurs initiales dans les champs en mode édition
  useEffect(() => {
    if (isEdit && data && data.data) {
      setProduct({
        name: data.data.name || "",
        description: data.data.description || "",
        price: data.data.price.toString() || "", // Convertir en chaîne
        stock_quantity: data.data.stock_quantity.toString() || "", // Convertir en chaîne
        category: data.data.category || "",
        brand: data.data.brand || "",
      });
    }
  }, [data, isEdit]);

  // Gérer le changement d'entrée des champs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct(prevProduct => ({ ...prevProduct, [name]: value }));
  };

  // Gérer le changement de fichier image
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const triggerNotification = (message, type) => {
    setNotification({ message, type });
  };

    const onSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Convertir les valeurs numériques si nécessaire
    const productToSubmit = {
      name: product.name,
      description: product.description,
      price: product.price !== '' ? parseFloat(product.price) : null,
      stock_quantity: product.stock_quantity !== '' ? parseInt(product.stock_quantity) : null,
      category: product.category,
      brand: product.brand
    };

    // Ajouter les données du produit comme un blob JSON
    formData.append(
      "product",
      new Blob([JSON.stringify(productToSubmit)], { type: "application/json" })
    );

    // Ajouter l'image si présente
    if (image) {
      formData.append("imageFile", image);
    }

    if (isEdit) {
      // Mode Modification
      dispatch(updateProduct({ 
        productId: data.data.id, 
        productData: formData 
      }))
        .unwrap()
        .then(() => {
          dispatch(getAllProducts());
          triggerNotification("Produit modifié avec succès", "success");
          handleOpen(null);
        })
        .catch((error) => {
          console.error("Erreur de mise à jour:", error);
          triggerNotification("Erreur lors de la modification du produit", "error");
        });
    } else {
      // Mode Ajout (reste inchangé)
      dispatch(addProduct({ productData: formData }))
        .unwrap()
        .then(() => {
          dispatch(getAllProducts());
          triggerNotification("Produit ajouté avec succès", "success");
          handleOpen(null);
        })
        .catch(() => {
          triggerNotification("Erreur lors de l'ajout du produit", "error");
        });
    }
  };

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      {/* Champs du formulaire */}
      <div>
        <label>Nom du produit</label>
        <input
          name="name"
          type="text"
          placeholder="Nom du produit"
          value={product.name}
          onChange={handleInputChange}
          className="form-input block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 sm:text-sm sm:leading-6 ps-3"
        />
      </div>
      <div>
        <label>Description</label>
        <input
          name="description"
          type="text"
          placeholder="Description"
          value={product.description}
          onChange={handleInputChange}
          className="form-input block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 sm:text-sm sm:leading-6 ps-3"
        />
      </div>
      <div>
        <label>Prix</label>
        <input
          name="price"
          type="number"
          placeholder="Prix"
          value={product.price}
          onChange={handleInputChange}
          className="form-input block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 sm:text-sm sm:leading-6 ps-3"
        />
      </div>
      <div>
        <label>Quantité en stock</label>
        <input
          name="stock_quantity"
          type="number"
          placeholder="Quantité"
          value={product.stock_quantity}
          onChange={handleInputChange}
          className="form-input block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 sm:text-sm sm:leading-6 ps-3"
        />
      </div>
      <div>
        <label>Catégorie</label>
        <select
          name="category"
          value={product.category}
          onChange={handleInputChange}
          className="form-select block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 sm:text-sm sm:leading-6 ps-3"
        >
          <option value="">Sélectionnez une catégorie</option>
          <option value="Laptop">Laptop</option>
          <option value="Headphone">Headphone</option>
          <option value="Mobile">Mobile</option>
          <option value="Electronics">Electronics</option>
          <option value="Toys">Toys</option>
          <option value="Fashion">Fashion</option>
        </select>
      </div>

      <div>
        <label>Image</label>
        {isEdit && data && data.data.imageUrl && (
          <img
            src={image ? URL.createObjectURL(image) : data.data.imageUrl}
            alt="Product"
            className="w-full h-36 object-cover mb-2"
          />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="form-input block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 sm:text-sm sm:leading-6 ps-3"
        />
      </div>

      <div className="flex space-x-4 pt-10 pb-2 justify-end">
        <Button variant="gradient" color="blue" type="submit" className="rounded-lg">
          <span>{btnName}</span>
        </Button>
        <Button variant="text" color="red" onClick={() => handleOpen(null)} className="mr-1">
          <span>Annuler</span>
        </Button>
      </div>

      <ToastMessage message={notification.message} type={notification.type} />
    </form>
  );
};

export default FormAddProduct;