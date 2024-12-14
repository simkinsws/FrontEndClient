import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import apiInstance from "../../helpers/apiInstance";
import "./styles/ResetPassword.scss";

const ResetPassword = ({ show, handleClose }) => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setError(null); // Clear previous errors
    try {
      setIsLoading(true);
      const response = await apiInstance.post("/reset-password", {
        email,
        newPassword,
        resetCode: "string",
      });
      if (response.message === "Password reset successful.") {
        setIsLoading(false);
        handleClose();
      }
    } catch (err) {
      setIsLoading(false);
      setError(
        err.response?.data?.errors || "Invalid inputs please check again"
      );
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Reset Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="username-input">
            <Form.Label>Username or Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your username or email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="password-input">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </Form.Group>
          {error && (
            <div className="error">
              {typeof error === "object"
                ? Object.values(error).flat().join(", ")
                : error}
            </div>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          {isLoading ? "Reseting Password..." : "Reset Password"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ResetPassword;
