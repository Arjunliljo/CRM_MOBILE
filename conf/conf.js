import axios from "axios";

// Prefer env var, then Expo manifest extra, then default localhost
// const baseURL =
//   process.env.EXPO_PUBLIC_API_URL ||
//   (typeof expo !== "undefined" && expo?.manifest?.extra?.apiUrl) ||
//   "http://localhost:3000/api/v2";
const baseURL = "http://192.168.1.9:3000/api/v2";

// In-memory auth token cache
let __authToken = null;

// Create axios instance
export const api = axios.create({
  baseURL,
  timeout: 10000,
  withCredentials: true,
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
    // console.log("API Request:", {
    //   method: config.method?.toUpperCase(),
    //   url: config.url,
    //   data: config.data,
    // });

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
    // console.log("API Response:", {
    //   status: response.status,
    //   url: response.config.url,
    //   data: response.data,
    // });

    return response;
  },
  (error) => {
    // Handle common error scenarios
    if (error.response) {
      const { status, data } = error.response;

      const reqUrl = `${error?.config?.baseURL || baseURL}${
        error?.config?.url || ""
      }`;
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
          console.error("Resource not found:", reqUrl);
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
  return __authToken; // Using in-memory cache for now
};

const handleUnauthorized = () => {
  // Clear stored tokens and redirect to login
  // Example: AsyncStorage.removeItem('authToken');
  // Example: navigation.navigate('Login');
};

export default api;

// Expose helpers to manage auth token
export const setAuthToken = (token) => {
  __authToken = token || null;
};

export const clearAuthToken = () => {
  __authToken = null;
};
