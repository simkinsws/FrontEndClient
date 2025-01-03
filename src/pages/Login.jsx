import React, { useState, useEffect } from "react";
import { observer } from "mobx-react"; // Import inject and observer
import apiInstance from "../helpers/apiInstance"; // Adjust the path if needed
import { useNavigate } from "react-router-dom"; // For navigation
import "./styles/Login.scss";
import authStore from "../store/authStore";
import ResetPassword from "./resetPassword/ResetPassword";
import { Form } from "react-bootstrap";
const Login = observer(() => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const [showPassword, setShowPassword] = useState(false);

  // Keep track of the redirection path
  const [isAuthInitialized, setIsAuthInitialized] = useState(false);
  const [redirectPath, setRedirectPath] = useState(null);
  const [isLoadingPage, setIsLoadingPage] = useState(true); // Track page loading state

  useEffect(() => {
    // Check if the user is authenticated
    if (authStore?.isAuthenticated) {
      // Fetch user role if authenticated
      const fetchRole = async () => {
        try {
          const roleResponse = await apiInstance.get("/api/users/userRole");
          authStore.setUserRole(roleResponse);
          setRedirectPath(roleResponse === "Admin" ? "/admin" : "/user");
          setIsAuthInitialized(true); // Set initialization flag when role is fetched
          setIsLoadingPage(false); // Stop loading page
        } catch (error) {
          setIsAuthInitialized(true); // Set flag even if there is an error
          setIsLoadingPage(false); // Stop loading page
        }
      };
      fetchRole();
    } else {
      setIsAuthInitialized(true); // If not authenticated, skip fetching role
      setIsLoadingPage(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthInitialized && redirectPath) {
      navigate(redirectPath, { replace: true });
    }
  }, [isAuthInitialized, redirectPath, navigate]);

  if (isLoadingPage) {
    return (
      <div className="loading">
        <p>Loading...</p>
      </div>
    );
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setIsLoading(true);
      const response = await apiInstance.post("/login", { email, password });
      if (response.accessToken) {
        apiInstance.setToken(response.accessToken);
        authStore.login(response);

        const roleResponse = await apiInstance.get("/api/users/userRole");
        authStore.setUserRole(roleResponse);

        // Redirect based on userRole
        setRedirectPath(roleResponse === "Admin" ? "/admin" : "/user");
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setError("Login failed. Please check your credentials.");
      }
    } catch (err) {
      setIsLoading(false);
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="form">
        <h1 className="title">Login</h1>
        <div className="inputGroup">
          <label htmlFor="email" className="label">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input form-control"
            required
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="password" className="label">
            Password:
          </label>
          <input
            type={`${showPassword ? "text" : "password"}`}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input form-control"
            required
          />
          <Form.Check
            type="checkbox"
            label="Show Password"
            checked={showPassword}
            onChange={() => setShowPassword((prev) => !prev)}
            className="mt-2"
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit" className="button">
          {isLoading ? "Loading..." : "Login"}
        </button>
        <button className="forgot-password" onClick={handleOpenModal}>
          Forgot Password?
        </button>
        <ResetPassword show={showModal} handleClose={handleCloseModal} />
      </form>
    </div>
  );
});

export default Login;
