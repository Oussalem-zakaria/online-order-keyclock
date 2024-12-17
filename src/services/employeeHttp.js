import { httpClient } from "./HttpClient";

export const getAllEmployees = () => {
  return httpClient.get("http://localhost:8080/admin/realms/OnlineOrderManagement-Realm/roles/EMPLOYEE/users").then(
    (response) => {
      return response.data;
    },
    (error) => {
      console.error(error);
    }
  );
};

export const getEmpoloyee = (id) => {
  return httpClient.get(`http://localhost:8765/CUSTOMER/api/v1/customers/${id}`).then(
    (response) => {
      return response.data;
    },
    (error) => {
      console.error(error);
    }
  );
};

export const createEmpoloyee = (customer) => {
  console.log("customer HTTP", customer);
  return httpClient.post("http://localhost:8765/CUSTOMER/api/v1/customers", customer).then(
    (response) => {
      return response.data;
    },
    (error) => {
      console.error(error);
    }
  );
};

export const updateEmpoloyee = (id, customer) => {
  console.log("customer ID HTTP: ", customer);
  return httpClient.put(`http://localhost:8765/CUSTOMER/api/v1/customers/${id}`, customer).then(
    (response) => {
      return response.data;
    },
    (error) => {
      console.error(error);
    }
  );
};

export const deleteEmpoloyee = (id) => {
  return httpClient.delete(`http://localhost:8765/CUSTOMER/api/v1/customers/${id}`).then(
    (response) => {
      return response.data;
    },
    (error) => {
      console.error(error);
    }
  );
};
