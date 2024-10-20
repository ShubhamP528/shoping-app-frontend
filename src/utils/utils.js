export const NODE_API_ENDPOINT =
  process.env.NODE_ENV === "production"
    ? "https://claw-backend.onrender.com/api/v1"
    : "http://localhost:8000/api";
