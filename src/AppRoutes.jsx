import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { inject, observer } from "mobx-react"; // Import observer and inject from mobx-react
import authStore from "./store/authStore"; // Import the store
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AdminPanel from "./pages/AdminPanel";
import ProtectedRoute from "./helpers/ProtectedRoute";
import apiInstance from "./helpers/apiInstance";
// Define AppRoutes as an observer component
const AppRoutes = inject("authStore")(
  observer(() => {
    useEffect(() => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        apiInstance.setToken(token);
      }
    }, []);

    console.log("isAutheticated? : ", authStore.isAuthenticated);
    return (
      <Router>
        <Routes>
          {/* Public Route */}
          <Route
            path="/login"
            element={
              authStore?.isAuthenticated ? (
                <Navigate to="/dashboard" replace /> // Redirect to /dashboard if authenticated
              ) : (
                <Login />
              )
            }
          />

          {/* Protected Routes */}
          <Route
            path="/"
            element={<ProtectedRoute allowedRoles={["User", "Admin"]} />}
          >
            <Route path="dashboard" element={<Dashboard />} />
          </Route>

          <Route
            path="/admin"
            element={<ProtectedRoute allowedRoles={["Admin"]} />}
          >
            <Route index element={<AdminPanel />} />
          </Route>

          {/* Fallback for 404 */}
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </Router>
    );
  })
);

export default AppRoutes;
