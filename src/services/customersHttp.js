import { httpClient } from "./HttpClient";

export const getAllCustomers = () => {
  return httpClient.get("http://localhost:8765/CUSTOMER/api/v1/customers").then(
    (response) => {
      return response.data;
    },
    (error) => {
      console.error(error);
    }
  );
};

export const getCustomer = (id) => {
  return httpClient.get(`http://localhost:8765/CUSTOMER/api/v1/customers/${id}`).then(
    (response) => {
      return response.data;
    },
    (error) => {
      console.error(error);
    }
  );
};

export const createCustomer = (customer) => {
  return httpClient.post("http://localhost:8765/CUSTOMER/api/v1/customers", customer).then(
    (response) => {
      return response.data;
    },
    (error) => {
      console.error(error);
    }
  );
};

export const updateCustomer = (customer) => {
  return httpClient.put(`http://localhost:8765/CUSTOMER/api/v1/customers/${customer.id}`, customer).then(
    (response) => {
      return response.data;
    },
    (error) => {
      console.error(error);
    }
  );
};

export const deleteCustomer = (id) => {
  return httpClient.delete(`http://localhost:8765/CUSTOMER/api/v1/customers/${id}`).then(
    (response) => {
      return response.data;
    },
    (error) => {
      console.error(error);
    }
  );
};
