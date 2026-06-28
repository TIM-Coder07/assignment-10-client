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


// ==============================
// Get All Users
// ==============================
export async function getAllUsers() {
  const res = await fetch(`${API_URL}/admin/users`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  return res.json();
}

// ==============================
// Change User Role
// ==============================
export async function updateUserRole(id, role) {
  const res = await fetch(`${API_URL}/admin/users/${id}/role`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ role }),
  });

  if (!res.ok) {
    throw new Error("Failed to update role");
  }

  return res.json();
}

// ==============================
// Delete User
// ==============================
export async function deleteUser(id) {
  const res = await fetch(`${API_URL}/admin/users/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete user");
  }

  return res.json();
}

// ==============================
// GET ALL BOOKS (ADMIN)
// ==============================
export async function getAllBooks() {
  const res = await fetch(`${API_URL}/admin/books`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch books");
  }

  return res.json();
}

// ==============================
// UNPUBLISH BOOK (ADMIN)
// ==============================
export async function unpublishBook(id) {
  const res = await fetch(`${API_URL}/admin/books/${id}/unpublish`, {
    method: "PATCH",
  });

  if (!res.ok) {
    throw new Error("Failed to unpublish book");
  }

  return res.json();
}

// ==============================
// PUBLISH BOOK (ADMIN)
// ==============================
export async function publishBook(id) {
  const res = await fetch(`${API_URL}/admin/books/${id}/publish`, {
    method: "PATCH",
  });

  if (!res.ok) {
    throw new Error("Failed to publish book");
  }

  return res.json();
}


// ==============================
// GET ALL TRANSACTIONS
// ==============================
export async function getAllTransactions() {
  const res = await fetch(`${API_URL}/admin/transactions`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch transactions");
  }

  return res.json();
}