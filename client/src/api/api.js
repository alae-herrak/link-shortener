import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

export const shortenURL = async (originalUrl) => {
  return await axios.post(
    `${API_BASE_URL}/links/shorten`,
    { originalUrl },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
