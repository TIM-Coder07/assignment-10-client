const API_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

// GET SINGLE BOOK
export const getBrowseBookDetailsApi = async (id) => {

  const response = await fetch(
    `${API_URL}/books/${id}`
  );


  return response.json();

};

// GET FEATURED (6 BOOKS)
export const getFeaturedBooksApi = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/books?limit=6`,
    {
      cache: "no-store",
    }
  );

  return response.json();
};