const API_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
console.log("API_URL", API_URL);

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

// GET BOOKS & Multi Filter
export const getBooksApi = async ({
  search = "",
  category = "",
  availability = "",
  deliveryFee = "",
}= {}) => {
  const query = new URLSearchParams();

  if (search) query.set("search", search);

  if (category && category !== "All")
    query.set("category", category);

  if (availability && availability !== "All")
    query.set("availability", availability);

  if (deliveryFee && deliveryFee !== "All")
    query.set("deliveryFee", deliveryFee);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/books?${query.toString()}`,
    {
      cache: "no-store",
    }
  );

  return res.json();
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
  const response = await fetch(`${API_URL}/librarian/books/${id}`, {
    method: "PATCH",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(updatedData),
  });

  return await response.json();
};
