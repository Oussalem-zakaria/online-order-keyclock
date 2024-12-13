import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import keycloak, { initializeKeycloak } from "./config/keycloak";
import { httpClient } from "./services/HttpClient";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/userSlice";
import { BrowserRouter as Router } from "react-router-dom";
import AdminRoutes from "./routes/adminRoutes";
import EmployeRoutes from "./routes/employeeRoutes";
import UserRoutes from "./routes/userRoutes";

function App() {
  const [keycloakInitialized, setKeycloakInitialized] = useState(false);
  const isRun = useRef(false);
  const dispatch = useDispatch();

  useEffect(() => {
    // Initialiser Keycloak
    if (isRun.current) return;
    isRun.current = true;

    initializeKeycloak(httpClient).then(() => {
      setKeycloakInitialized(true);
      const user = {
        firstname: keycloak.tokenParsed.given_name,
        lastname: keycloak.tokenParsed.family_name,
        email: keycloak.tokenParsed.email,
        roles: keycloak.tokenParsed.realm_access.roles,
      };
      dispatch(setUser(user));
    });
  }, []);

  if (!keycloakInitialized) {
    return <div>Chargement...</div>;
  }

  return (
    <>
      <Router>
        {
          // si roles contient admin alors on affiche les routes admin sinon si roles contioent employe on affiche les routes employe sinon on affiche les routes user
          keycloak.tokenParsed.realm_access.roles.includes("ADMIN") ? (
            <>
              <AdminRoutes />
            </>
          ) : keycloak.tokenParsed.realm_access.roles.includes("EMPLOYEE") ? (
            <>
              <EmployeRoutes />
            </>
          ) : (
            <>
              <UserRoutes />
            </>
          )
        }
      </Router>
    </>
  );
}

export default App;
