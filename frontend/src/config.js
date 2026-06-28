const rawUrl = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";
// Normalize URL by removing trailing slash if present to avoid double slashes in API calls
const API_URL = rawUrl.replace(/\/$/, "");

export default API_URL;
