import { makeAutoObservable } from "mobx";
import apiInstance from "../helpers/apiInstance";

class AuthStore {
  token = null; // Stores the authentication token
  isAuthenticated = false; // Tracks if user is authenticated
  userRole = "";
  constructor() {
    makeAutoObservable(this); // Makes state observable and actions reactive
    const token = localStorage.getItem("accessToken");
    this.isAuthenticated = Boolean(token);
    this.token = token || null;

    if (this.isAuthenticated) {
      apiInstance.setToken(this.token); // Ensure the token is set for API calls
    }
  }

  // Set user and token when logging in
  login(token) {
    this.token = token;
    this.isAuthenticated = true;
    localStorage.setItem("accessToken", token); // Store token in localStorage
  }

  setUserRole(userRole) {
    this.userRole = userRole;
  }

  // Log out the user
  logout() {
    this.token = null;
    this.isAuthenticated = false;
    localStorage.clear(); // Remove token from localStorage
  }

  // Check if the user is authenticated based on token
  checkAuth() {
    const token = localStorage.getItem("accessToken");
    if (token) {
      this.token = token;
      this.isAuthenticated = true;
    } else {
      this.isAuthenticated = false;
    }
  }
}

const authStore = new AuthStore();
export default authStore;
