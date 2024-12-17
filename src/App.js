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
import { getCustomerByEmail, selfRegisterCustomer } from "./services/customersHttp";
import { addCustomer } from "./redux/customerSlice";

function App() {
  const [keycloakInitialized, setKeycloakInitialized] = useState(false);
  const isRun = useRef(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isRun.current) return;
    isRun.current = true;

    const hasRole = (roles, role) => roles.includes(role);

    const initialize = async () => {
      try {
        await initializeKeycloak(httpClient);
        setKeycloakInitialized(true);

        const roles = keycloak.tokenParsed.realm_access.roles;

        if (!hasRole(roles, "ADMIN") && !hasRole(roles, "EMPLOYEE") && hasRole(roles, "USER")) {
          try {
            const existingUser = await getCustomerByEmail(keycloak.tokenParsed.email);

            if (!existingUser) {
              const customer = {
                firstName: keycloak.tokenParsed.given_name,
                lastName: keycloak.tokenParsed.family_name,
                email: keycloak.tokenParsed.email,
              };

              const newCustomer = await selfRegisterCustomer(customer);
              dispatch(setUser({ ...newCustomer, roles: keycloak.tokenParsed.realm_access.roles }));
            } else {
              dispatch(setUser({ ...existingUser, roles: keycloak.tokenParsed.realm_access.roles }));
            }
          } catch (error) {
            console.error("Erreur lors de l'auto-enregistrement du client :", error);
          }
        } else {
          const user = {
            firstName: keycloak.tokenParsed.given_name,
            lastName: keycloak.tokenParsed.family_name,
            email: keycloak.tokenParsed.email,
            roles: keycloak.tokenParsed.realm_access.roles,
          };
          dispatch(setUser(user));
        }
      } catch (error) {
        console.error("Erreur lors de l'initialisation de Keycloak :", error);
      }
    };

    initialize();
  }, [dispatch]);

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
