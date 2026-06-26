const API_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

// ==========================
// ADMIN OVERVIEW
// ==========================
export const getOverview = async () => {
  const res = await fetch(`${API_URL}/admin/overview`);

  if (!res.ok) {
    throw new Error("Failed to fetch overview");
  }

  return await res.json();
};

// ==========================
// PENDING BOOKS
// ==========================
export const getPendingBooks = async () => {
  const res = await fetch(`${API_URL}/admin/pending-books`);

  if (!res.ok) {
    throw new Error("Failed to fetch pending books");
  }

  return await res.json();
};

// ==========================
// APPROVE BOOK
// ==========================
export const approveBook = async (id) => {
  const res = await fetch(`${API_URL}/admin/books/${id}/approve`, {
    method: "PATCH",
  });

  if (!res.ok) {
    throw new Error("Failed to approve book");
  }

  return await res.json();
};

// ==========================
// REJECT BOOK
// ==========================
export const rejectBook = async (id) => {
  const res = await fetch(`${API_URL}/admin/books/${id}/reject`, {
    method: "PATCH",
  });

  if (!res.ok) {
    throw new Error("Failed to reject book");
  }

  return await res.json();
};

// ==========================
// DELETE BOOK
// ==========================
export const deleteBook = async (id) => {
  const res = await fetch(`${API_URL}/admin/books/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete book");
  }

  return await res.json();
};
