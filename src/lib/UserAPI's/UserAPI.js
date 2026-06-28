const API_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

// Get Delivered Books
export const getDeliveredBooks = async (email) => {
  const res = await fetch(`${API_URL}/deliveries/user/${email}/delivered`);

  if (!res.ok) {
    throw new Error("Failed to fetch delivered books");
  }

  return res.json();
};
