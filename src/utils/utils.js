export const NODE_API_ENDPOINT =
  process.env.NODE_ENV === "production"
    ? "https://shoping-app-backend.vercel.app/api"
    : "http://localhost:8000/api";
