import { useState } from "react";
import CustomModal from "../Modal/CustomModal";
import { Form } from "react-bootstrap";
import React from "react";
import { Button } from "react-bootstrap";
import { FaCloudUploadAlt, FaTimes } from "react-icons/fa";
import apiInstance from "../../helpers/apiInstance";
const CustomFileInput = ({ onFileChange }) => {
  return (
    <div className="custom-file-input">
      <input
        type="file"
        id="fileInput"
        accept="image/*"
        className="file-input"
        onChange={onFileChange}
      />
      <label htmlFor="fileInput" className="file-label">
        <FaCloudUploadAlt className="upload-icon" />
        <span>Upload Image</span>
      </label>
    </div>
  );
};

const EditTicket = ({ data, onSave }) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    description: data?.description || "",
    status: data?.status || "open",
    image:
      data?.imageData !== "null" && data?.imageMimeType !== "null"
        ? `${data?.imageMimeType},${data?.imageData}`
        : null,
  });

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const statusOptions = [
    { value: "open", label: "Open" },
    { value: "in Progress", label: "In Progress" },
    { value: "closed", label: "Closed" },
    { value: "on Hold", label: "On Hold" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          image: reader.result, // Base64 encoded string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleShow = () => {
    setError(null);
    setSuccessMessage("");
    setShowModal(true);
  };
  const handleClose = () => setShowModal(false);

  const handleSave = async () => {
    try {
      const postUpdateDto = {
        id: data.id,
        description: formData.description,
        status: formData.status,
        imageBase64: formData.image ? formData.image.split(",")[1] : null,
        imageMimeType: formData.image ? formData.image.split(",")[0] : null,
      };

      const response = await apiInstance.put(`/api/post/update`, postUpdateDto);
      onSave(response); // Notify parent to update the data
      handleClose(); // Close modal
    } catch (e) {
      setError(
        e.response?.data?.message ||
          e.message ||
          "An error occurred while updating the post."
      );
    }
  };

  return (
    <div>
      <Button className="edit-button" onClick={handleShow}>
        Edit
      </Button>
      <CustomModal
        show={showModal}
        onClose={handleClose}
        title="Edit Post"
        bodyContent={
          <Form>
            <Form.Group className="description-input">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea" // Changed to 'textarea' to allow multi-line input
                value={formData.description}
                onChange={handleInputChange}
                name="description"
              />
            </Form.Group>
            <Form.Group className="status-select">
              <Form.Label>New Status</Form.Label>
              <Form.Control
                as="select" // Changed to 'select' element
                value={formData.status}
                onChange={handleInputChange}
                name="status"
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <div className="upload-file">
              <CustomFileInput onFileChange={handleImageChange} />
            </div>
            {formData.image && (
              <div className="image-preview">
                <p>Image Preview:</p>
                <img src={formData.image} alt="Preview" />
                <button
                  className="remove-prev-image"
                  onClick={() =>
                    setFormData((prevData) => ({ ...prevData, image: null }))
                  }
                >
                  <FaTimes></FaTimes>
                </button>
              </div>
            )}
            {error && (
              <div className="error">
                {typeof error === "object"
                  ? Object.values(error).flat().join(", ")
                  : error}
              </div>
            )}
            {successMessage && (
              <div className="success-msg">
                Your password has been succesfully changed please close and
                login.
              </div>
            )}
          </Form>
        }
        footerButtons={[
          { label: "Close", onClick: handleClose, variant: "secondary" },
          { label: "Save", onClick: handleSave, variant: "primary" },
        ]}
        size={"lg"}
      />
    </div>
  );
};

export default EditTicket;
