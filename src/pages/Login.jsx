import React, { useState } from "react";
import { inject, observer } from "mobx-react"; // Import inject and observer
import apiInstance from "../helpers/apiInstance"; // Adjust the path if needed
import { useNavigate } from "react-router-dom"; // For navigation
import "./styles/Login.scss";

const Login = inject("authStore")(
  observer(({ authStore }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

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
          localStorage.setItem("expiresIn", response.expiresIn);
          apiInstance.setToken(response.accessToken);
          authStore.login(response.accessToken); // Update authStore using the injected store
          setIsLoading(false);
          // Redirect to dashboard or another protected route
          navigate("/dashboard");
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
      <div className="container">
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
          <button type="submit" className="button">
            {isLoading ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
    );
  })
);

export default Login;
