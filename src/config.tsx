const config = {
  apiUrl: process.env.REACT_APP_API_URL || "https://bafix-api.onrender.com",
  // apiUrl: process.env.REACT_APP_API_URL || "http://localhost:8080",
  LOCAL_STORAGE_JWT_KEY: "session_token",
};

export default config;
