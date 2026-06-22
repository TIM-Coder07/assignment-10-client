const API_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

// BOOK POST
export const addBookApi = async (bookData) => {
  const response = await fetch(`${API_URL}/librarian/addbooks`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(bookData),
  });

  return await response.json();
};

// BOOK GET
export const getBooksApi = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/librarian/books`
  );

  return await response.json();
};
