const API_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export const getDeliveredBooks = async (email) => {
  const res = await fetch(
    `${API_URL}/deliveries/user/${email}/delivered`
  );

  return res.json();
};