const API_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

// Create Review
export const createReview = async (reviewData) => {
  const res = await fetch(`${API_URL}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reviewData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to create review");
  }

  return data;
};

// Get Reviews By Book
export const getBookReviews = async (bookId) => {
  const res = await fetch(`${API_URL}/reviews/${bookId}`);

  return await res.json();
};

// Get My Reviews
export const getMyReviews = async (email) => {
  const res = await fetch(`${API_URL}/my-reviews/${email}`);

  return await res.json();
};

// Edit Review
export const updateReview = async (id, reviewData) => {
  const res = await fetch(`${API_URL}/reviews/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reviewData),
  });

  return await res.json();
};

// Delete Review
export const deleteReview = async (id) => {
  const res = await fetch(`${API_URL}/reviews/${id}`, {
    method: "DELETE",
  });

  return await res.json();
};
