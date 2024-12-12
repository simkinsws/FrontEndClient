import React, { useState } from "react";
import { inject, observer } from "mobx-react"; // Import inject and observer
import apiInstance from "../helpers/apiInstance"; // Adjust the path if needed
import { useNavigate } from "react-router-dom"; // For navigation

const Login = inject("authStore")(
  observer(({ authStore }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
      e.preventDefault(); // Prevent default form submission
      setError(""); // Clear any previous errors

      try {
        const response = await apiInstance.post("/login", { email, password });

        if (response.accessToken) {
          // Save token to local storage (or session storage if preferred)
          localStorage.setItem("accessToken", response.accessToken);
          localStorage.setItem("refreshToken", response.refreshToken);
          localStorage.setItem("expiresIn", response.expiresIn);
          apiInstance.setToken(response.accessToken);
          authStore.login(response.accessToken); // Update authStore using the injected store
          // Redirect to dashboard or another protected route
          navigate("/dashboard");
        } else {
          setError("Login failed. Please check your credentials.");
        }
      } catch (err) {
        setError("Login failed. Please check your credentials.");
      }
    };

    return (
      <div style={styles.container}>
        <h1 style={styles.title}>Login</h1>
        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.inputGroup}>
            <label htmlFor="email" style={styles.label}>
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="password" style={styles.label}>
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          {error && <p style={styles.error}>{error}</p>}
          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>
      </div>
    );
  })
);

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f4f4f4",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "1rem",
  },
  form: {
    width: "100%",
    maxWidth: "400px",
    padding: "1rem",
    borderRadius: "8px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  inputGroup: {
    marginBottom: "1rem",
  },
  label: {
    display: "block",
    marginBottom: "0.5rem",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: "0.5rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "1rem",
  },
  error: {
    color: "red",
    marginBottom: "1rem",
    textAlign: "center",
  },
  button: {
    width: "100%",
    padding: "0.75rem",
    fontSize: "1rem",
    color: "#fff",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default Login;
