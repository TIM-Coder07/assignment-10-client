const API_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

// GET SINGLE BOOK
export const getBrowseBookDetailsApi = async (id) => {

  const response = await fetch(
    `${API_URL}/books/${id}`
  );


  return response.json();

};