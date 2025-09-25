import axios from "axios";

const baseUrl = "http://localhost:3000/api";

// Create axios instance
const api = axios.create({
  baseURL: "http://localhost:3000/api/v2",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = getAuthToken(); // You'll need to implement this function
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Log request for debugging
    console.log("API Request:", {
      method: config.method?.toUpperCase(),
      url: config.url,
      data: config.data,
    });

    return config;
  },
  (error) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    // Log successful response
    console.log("API Response:", {
      status: response.status,
      url: response.config.url,
      data: response.data,
    });

    return response;
  },
  (error) => {
    // Handle common error scenarios
    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 401:
          // Handle unauthorized - redirect to login
          console.error("Unauthorized access - redirecting to login");
          // You might want to clear stored tokens and redirect
          handleUnauthorized();
          break;
        case 403:
          console.error("Forbidden access");
          break;
        case 404:
          console.error("Resource not found");
          break;
        case 500:
          console.error("Server error");
          break;
        default:
          console.error("API Error:", status, data);
      }
    } else if (error.request) {
      // Network error
      console.error("Network Error:", error.message);
    } else {
      console.error("Error:", error.message);
    }

    return Promise.reject(error);
  }
);

// Helper functions (implement these based on your auth system)
const getAuthToken = () => {
  // Return stored auth token (from AsyncStorage, SecureStore, etc.)
  // Example: return AsyncStorage.getItem('authToken');
  return null; // Replace with actual implementation
};

const handleUnauthorized = () => {
  // Clear stored tokens and redirect to login
  // Example: AsyncStorage.removeItem('authToken');
  // Example: navigation.navigate('Login');
};

export default api;
