import React, { useState, useEffect } from "react";
import apiInstance from "../../../helpers/apiInstance";
import "./styles/CreatePost.scss";
import { FaCloudUploadAlt, FaTimes } from "react-icons/fa";
import { observer } from "mobx-react-lite";
import authStore from "../../../store/authStore";

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

const CreatePost = observer(() => {
  const [formData, setFormData] = useState({
    branchName: "",
    contactName: "",
    phoneNumber: "",
    description: "",
    image: null, // Image file
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    console.log("CreatePost component mounted.");
  }, []);

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle image upload
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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccessMessage("");

    const { branchName, contactName, phoneNumber, description, image } =
      formData;

    // Prepare request payload
    const postRequestDto = {
      branchName,
      contactName,
      phoneNumber,
      description,
      imageBase64: image?.split(",")[1], // Remove metadata prefix for Base64
    };

    try {
      const response = await apiInstance.post(
        "/api/posts/create",
        postRequestDto
      );
      console.log(response);

      setSuccessMessage("Post created successfully!");
      setFormData({
        branchName: "",
        contactName: "",
        phoneNumber: "",
        description: "",
        image: null,
      });
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data || "An error occurred while creating the post."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create-post-container">
      <form onSubmit={handleSubmit}>
        <h1>Create a New Ticket</h1>
        <div className="form-group">
          <label htmlFor="branchName">Branch Name</label>
          <input
            className="form-control"
            type="text"
            id="branchName"
            name="branchName"
            value={formData.branchName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="contactName">Contact Name</label>
          <input
            className="form-control"
            type="text"
            id="contactName"
            name="contactName"
            value={formData.contactName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            className="form-control"
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </div>
        {authStore?.userRole === "Admin" && (
          <div className="form-group">
            <CustomFileInput onFileChange={handleImageChange} />
          </div>
        )}
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
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Create Ticket"}
        </button>
      </form>
    </div>
  );
});

export default CreatePost;
