import { httpClient } from "./HttpClient";

export const getAllAudits = () => {
  return httpClient.get("http://localhost:8765/AUDIT/api/v1/audit").then(
    (response) => {
      return response.data;
    },
    (error) => {
      console.error(error);
    }
  );
};

export const getAudit = (id) => {
  return httpClient.get(`http://localhost:8765/AUDIT/api/v1/audit/${id}`).then(
    (response) => {
      return response.data;
    },
    (error) => {
      console.error(error);
    }
  );
};

export const createAudit = (audit) => {
  return httpClient.post("http://localhost:8765/AUDIT/api/v1/audit", audit).then(
    (response) => {
      return response.data;
    },
    (error) => {
      console.error(error);
    }
  );
};

export const deleteAudit = (id) => {
  return httpClient.delete(`http://localhost:8765/AUDIT/api/v1/audit/${id}`).then(
    (response) => {
      return response.data;
    },
    (error) => {
      console.error(error);
    }
  );
};
