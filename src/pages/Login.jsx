import React, { useState } from "react";
import { observer } from "mobx-react"; // Import inject and observer
import apiInstance from "../helpers/apiInstance"; // Adjust the path if needed
import { useNavigate } from "react-router-dom"; // For navigation
import "./styles/Login.scss";
import authStore from "../store/authStore";
import ResetPassword from "./resetPassword/ResetPassword";

const Login = observer(() => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setError(""); // Clear any previous errors

    try {
      setIsLoading(true);
      const response = await apiInstance.post("/login", { email, password });
      if (response.accessToken) {
        // Save token to local storage (or session storage if preferred)
        localStorage.setItem("accessToken", response.accessToken);
        localStorage.setItem("refreshToken", response.refreshToken);
        const expiresAt = Date.now() + response.expiresIn * 1000;

        localStorage.setItem("expiresAt", expiresAt);
        apiInstance.setToken(response.accessToken);
        authStore.login(response.accessToken); // Update authStore using the injected store
        setIsLoading(false);
        // Redirect to dashboard or another protected route
        navigate("/");
      } else {
        setIsLoading(false);
        setError("Login failed. Please BLAH your credentials.");
      }
    } catch (err) {
      setIsLoading(false);
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="login-container">
      <h1 className="title">Login</h1>
      <form onSubmit={handleLogin} className="form">
        <div className="inputGroup">
          <label htmlFor="email" className="label">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            required
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="password" className="label">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button className="forgot-password" onClick={handleOpenModal}>
          Forgot Password?
        </button>
        <ResetPassword show={showModal} handleClose={handleCloseModal} />
        <button type="submit" className="button">
          {isLoading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
});

export default Login;
