import axios from "axios";

class ApiService {
  constructor(baseURL) {
    this.api = axios.create({
      baseURL,
      timeout: 10000, // Set timeout (optional)
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  // Function to set token in the headers
  setToken(token) {
    this.api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  // Handle GET requests
  async get(url, params = {}, headers = {}) {
    try {
      const response = await this.api.get(url, { params, headers });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Handle POST requests
  async post(url, data = {}, headers = {}) {
    try {
      const response = await this.api.post(url, data, { headers });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Handle PUT requests
  async put(url, data = {}, headers = {}) {
    try {
      const response = await this.api.put(url, data, { headers });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Handle DELETE requests
  async delete(url, headers = {}) {
    try {
      const response = await this.api.delete(url, { headers });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Error handling
  handleError(error) {
    if (error.response) {
      // Server responded with a status other than 200
      console.error("API Error:", error.response.data);
      throw error.response.data;
    } else if (error.request) {
      // Request was made but no response received
      console.error("Network Error:", error.request);
      throw new Error("Network Error");
    } else {
      // Something happened while setting up the request
      console.error("Error:", error.message);
      throw new Error(error.message);
    }
  }
}

export default ApiService;
