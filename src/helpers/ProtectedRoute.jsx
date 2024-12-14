import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { inject, observer } from "mobx-react"; // Import inject and observer
import apiInstance from "../helpers/apiInstance"; // Adjust the path if needed
import authStore from "../store/authStore"; // Import authStore

const ProtectedRoute = inject("authStore")(
  observer(({ allowedRoles = [] }) => {
    const [loading, setLoading] = useState(true);
    const [hasAccess, setHasAccess] = useState(null); // Will hold true/false based on role check

    useEffect(() => {
      if (localStorage.getItem("accessToken")) {
        apiInstance.setToken(localStorage.getItem("accessToken"));
      }
    }, []);

    useEffect(() => {
      const fetchUserRole = async () => {
        if (authStore && authStore?.isAuthenticated) {
          // Directly use MobX state for authentication status
          try {
            const response = await apiInstance.get("/api/users/userRole");
            authStore.setUserRole(response);
            // If the API returns a successful response, compare the role
            if (response && allowedRoles?.includes(response)) {
              setHasAccess(true); // User has the correct role
            } else {
              setHasAccess(false); // User doesn't have access
            }
          } catch (error) {
            console.log("Error fetching user role:", error);
            setHasAccess(false); // In case of an error, deny access
          } finally {
            setLoading(false);
          }
        } else {
          setHasAccess(false); // No token means no access
          setLoading(false);
        }
      };

      fetchUserRole();
    }, [allowedRoles]); // Depend on token and allowedRoles

    if (loading) {
      return <div>Loading...</div>;
    }

    if (!authStore?.isAuthenticated || !hasAccess) {
      // If no token or access is denied, redirect to login or unauthorized
      return <Navigate to={"/login"} replace />;
    }

    // If user has access, continue to the protected route
    apiInstance.setToken(authStore.token);

    return <Outlet />;
  })
);

export default ProtectedRoute;
