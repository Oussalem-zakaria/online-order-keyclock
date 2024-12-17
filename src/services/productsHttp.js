import { httpClient } from "./HttpClient";

export const getAllProducts = () => {
  return httpClient.get("http://localhost:8765/PRODUCT/api/v1/products").then(
    (response) => {
      return response.data;
    },
    (error) => {
      console.error(error);
    }
  );
};

export const getProduct = (id) => {
  return httpClient.get(`http://localhost:8765/PRODUCT/api/v1/products/${id}`).then(
    (response) => {
      return response.data;
    },
    (error) => {
      console.error(error);
    }
  );
};

export const createProduct = (product) => {
  console.log("Product Data HTTP: ", product);

  return httpClient
    .post("http://localhost:8765/PRODUCT/api/v1/products/product", product, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      return response.data; // Retourner les données de la réponse
    })
    .catch((error) => {
      console.error("Erreur lors de la création du produit : ", error);
      throw error; // Rejeter l'erreur pour une meilleure gestion
    });
};

export const updateProduct = (id, productData) => {
  console.log("product ID HTTP: ", id);
  console.log("product Data: ", productData);
  
  return httpClient.put(`http://localhost:8765/PRODUCT/api/v1/products/${id}`, productData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).then(
    (response) => {
      return response.data;
    },
    (error) => {
      console.error("Error updating product:", error);
      throw error; // Re-throw to allow error handling in thunk
    }
  );
};

export const deleteProduct = (id) => {
  return httpClient.delete(`http://localhost:8765/PRODUCT/api/v1/products/product/${id}`).then(
    (response) => {
      return response.data;
    },
    (error) => {
      console.error(error);
    }
  );
};
