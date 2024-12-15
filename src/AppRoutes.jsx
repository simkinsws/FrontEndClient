import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { observer } from "mobx-react"; // Import observer and inject from mobx-react
import authStore from "./store/authStore"; // Import the store
import UserPanel from "./pages/user/UserPanel/UserPanel";
import AdminPanel from "./pages/AdminPanel";
import ProtectedRoute from "./helpers/ProtectedRoute";
import CreatePost from "./pages/user/CreatePost/CreatePost";
import apiInstance from "./helpers/apiInstance";
import Login from "./pages/Login";
import UnAuthorized from "./pages/UnAuthorized/UnAuthorized";
// Define AppRoutes as an observer component
const AppRoutes = observer(() => {
  useEffect(() => {
    const fetchUserRole = async () => {
      if (authStore?.isAuthenticated && !authStore?.userRole) {
        try {
          const roleResponse = await apiInstance.get("/api/users/userRole");
          authStore?.setUserRole(roleResponse);
          console.log("User role set to:", authStore?.userRole); // Debug log
        } catch (error) {
          console.error("Error fetching user role:", error);
        }
      }
    };
    fetchUserRole();
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["Admin"]}>
            <AdminPanel />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/new-ticket"
        exact="true"
        element={
          <ProtectedRoute allowedRoles={["Admin"]}>
            <CreatePost />
          </ProtectedRoute>
        }
      />

      <Route
        path="/user"
        element={
          <ProtectedRoute allowedRoles={["User"]}>
            <UserPanel />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user/new-ticket"
        exact="true"
        element={
          <ProtectedRoute allowedRoles={["User"]}>
            <CreatePost />
          </ProtectedRoute>
        }
      />

      <Route path="/unauthorized" element={<UnAuthorized />} />

      {/* Fallback for 404 */}
      <Route path="*" element={<div>Page Not Found</div>} />
    </Routes>
  );
});

export default AppRoutes;
