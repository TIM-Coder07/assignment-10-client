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

// GET BOOKS

export const getBooksApi = async () => {
  const response = await fetch(`${API_URL}/librarian/books`);

  return response.json();
};

// UPDATE STATUS

export const updateBookStatusApi = async (id, status) => {
  const response = await fetch(
    `${API_URL}/librarian/books/${id}/status`,

    {
      method: "PATCH",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        status,
      }),
    },
  );

  return response.json();
};

// DELETE BOOK
export const deleteBookApi = async (id) => {
  const response = await fetch(`${API_URL}/librarian/books/${id}`, {
    method: "DELETE",
  });

  return await response.json();
};

// EDIT BOOK
export const editBookApi = async (id, updatedData) => {
  const response = await fetch(
    `${API_URL}/librarian/books/${id}`,
    {
      method: "PATCH",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(updatedData),
    }
  );


  return await response.json();
};