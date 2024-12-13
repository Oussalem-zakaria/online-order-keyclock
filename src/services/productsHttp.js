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
  return httpClient.post("http://localhost:8765/PRODUCT/api/v1/products", product).then(
    (response) => {
      return response.data;
    },
    (error) => {
      console.error(error);
    }
  );
};

export const updateProduct = (product) => {
  return httpClient.put(`http://localhost:8765/PRODUCT/api/v1/products/${product.id}`, product).then(
    (response) => {
      return response.data;
    },
    (error) => {
      console.error(error);
    }
  );
};

export const deleteProduct = (id) => {
  return httpClient.delete(`http://localhost:8765/PRODUCT/api/v1/products/${id}`).then(
    (response) => {
      return response.data;
    },
    (error) => {
      console.error(error);
    }
  );
};
