const API_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
console.log("API_URL", API_URL);

// GET SINGLE BOOK
export const getBrowseBookDetailsApi = async (id, token) => {
  const response = await fetch(`${API_URL}/books/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
};

// GET FEATURED (6 BOOKS)
export const getFeaturedBooksApi = async () => {
  const response = await fetch(`${API_URL}/books?limit=6`, {
    cache: "no-store",
  });

  return response.json();
};
