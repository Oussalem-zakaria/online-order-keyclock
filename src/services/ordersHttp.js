import { httpClient } from "./HttpClient";

export const getAllOrders = () => {
  return httpClient.get("http://localhost:8765/ORDER/api/v1/orders").then(
    (response) => {
      return response.data;
    },
    (error) => {
      console.error(error);
    }
  );
};

export const getOrder = (id) => {
  return httpClient.get(`http://localhost:8765/ORDER/api/v1/orders/${id}`).then(
    (response) => {
      return response.data;
    },
    (error) => {
      console.error(error);
    }
  );
};

export const getOrdersByCustomer = (customerId) => {
  console.log("customerId HTTP: ", customerId)
  return httpClient.get(`http://localhost:8765/ORDER/api/v1/orders/customer/${customerId}`).then(
    (response) => {
      return response.data;
    },
    (error) => {
      console.error(error);
    }
  );
};

export const createOrder = (order) => {
  return httpClient.post("http://localhost:8765/ORDER/api/v1/orders", order).then(
    (response) => {
      return response.data;
    },
    (error) => {
      console.error(error);
    }
  );
};

export const updateOrder = (id, order) => {
  console.log("ORDER HTTP :", order);
  return httpClient.put(`http://localhost:8765/ORDER/api/v1/orders/${id}`, order).then(
    (response) => {
      return response.data;
    },
    (error) => {
      console.error(error);
    }
  );
};

export const deleteOrder = (id) => {
  return httpClient.delete(`http://localhost:8765/ORDER/api/v1/orders/${id}`).then(
    (response) => {
      return response.data;
    },
    (error) => {
      console.error(error);
    }
  );
};
