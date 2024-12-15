import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { observer } from "mobx-react";
import authStore from "../store/authStore";

const ProtectedRoute = observer(({ allowedRoles = [], children }) => {
  // Check if authentication data is still being fetched
  if (
    authStore?.userRole === undefined ||
    authStore?.userRole === null ||
    authStore?.userRole === ""
  ) {
    // Optionally, render a loading indicator
    return <div>Loading...</div>;
  }

  if (!authStore?.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(authStore?.userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // If the route has children, render them. Otherwise, render the nested routes using Outlet
  return children ? children : <Outlet />;
});

export default ProtectedRoute;
