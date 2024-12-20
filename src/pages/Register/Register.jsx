import React, { useState } from "react";
import "./styles/Register.scss";
import apiInstance from "../../helpers/apiInstance";
import { Form } from "react-bootstrap";
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleRegisterUser = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      setIsLoading(true);
      const response = await apiInstance.post("/api/admin/registerUser", {
        email,
        password,
      });
      setIsLoading(false);
      setError("");
      setSuccess("User succesfully Created!");
    } catch (err) {
      console.log(err);
      if (err.status === 400) {
        if (err.errors.DuplicateUserName) {
          setIsLoading(false);
          setSuccess("");
          setError(err.errors.DuplicateUserName[0]);
        } else {
          setSuccess("");
          setIsLoading(false);
          setError(
            "Passwords must have at least one uppercase ('A'-'Z') , one digit (0-9) and one non alphanumeric symbol (!@#)"
          );
        }
      }
    }
  };

  return (
    <div className="registration-container">
      <form onSubmit={handleRegisterUser} className="form">
        <h1 className="title">User Registration</h1>
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
            type={`${showPassword ? "text" : "password"}`}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
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
        {success && <p className="success">{success}</p>}
        <button type="submit" className="button">
          {isLoading ? "Loading..." : "Create User"}
        </button>
      </form>
    </div>
  );
};

export default Register;
