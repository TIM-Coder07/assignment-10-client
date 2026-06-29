const API_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
console.log('API_URL', API_URL);


// Get Delivered Books
export const getDeliveredBooks = async (email) => {
  console.log("Email:", email);

  const res = await fetch(
    `${API_URL}/deliveries/user/${email}/delivered`
  );

  console.log(res.status);

  if (!res.ok) {
    console.log(await res.text());
    throw new Error("Failed to fetch delivered books");
  }

  return res.json();
};