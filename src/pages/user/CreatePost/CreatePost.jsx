import React, { useState, useEffect } from "react";
import apiInstance from "../../../helpers/apiInstance";

const CreatePost = () => {
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
      <h1>Create a New Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="branchName">Branch Name</label>
          <input
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
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Upload Image</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        {formData.image && (
          <div className="image-preview">
            <p>Image Preview:</p>
            <img
              src={formData.image}
              alt="Preview"
              style={{ maxWidth: "200px" }}
            />
          </div>
        )}
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Create Post"}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
