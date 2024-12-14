import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { observer } from "mobx-react"; // Import observer and inject from mobx-react
import authStore from "./store/authStore"; // Import the store
import Login from "./pages/Login";
import UserPanel from "./pages/user/UserPanel";
import AdminPanel from "./pages/AdminPanel";
import ProtectedRoute from "./helpers/ProtectedRoute";
import apiInstance from "./helpers/apiInstance";
// Define AppRoutes as an observer component
const AppRoutes = observer(() => {
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      apiInstance.setToken(token);
    }
  }, []);

  return (
    <Routes>
      {/* Public Route */}
      <Route
        path="/login"
        element={
          authStore?.isAuthenticated ? (
            <Navigate
              to={authStore?.userRole === "Admin" ? "/admin" : "/user"}
              replace
            />
          ) : (
            <Login />
          )
        }
      />

      {/* Protected Routes */}
      <Route
        path="/admin"
        element={<ProtectedRoute allowedRoles={["Admin"]} />}
      >
        <Route index element={<AdminPanel />} />
      </Route>

      <Route path="/user" element={<ProtectedRoute allowedRoles={["User"]} />}>
        <Route index element={<UserPanel />} />
      </Route>

      {/* Fallback for 404 */}
      <Route path="*" element={<div>Page Not Found</div>} />
    </Routes>
  );
});

export default AppRoutes;
