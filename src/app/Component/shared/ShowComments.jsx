"use client";

import { useEffect, useState } from "react";
import { Pencil, Trash2, Star } from "lucide-react";
import toast from "react-hot-toast";
import {
  getBookReviews,
  updateReview,
  deleteMyReview,
} from "@/lib/browseBook/reviewsAPI";

const ShowComments = ({ bookId, user }) => {
  const [reviews, setReviews] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editComment, setEditComment] = useState("");
  const [editRating, setEditRating] = useState(5);

  useEffect(() => {
    if (bookId) {
      loadReviews();
    }
  }, [bookId]);

  const loadReviews = async () => {
    try {
      const data = await getBookReviews(bookId);
      setReviews(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load reviews");
    }
  };

  const handleEdit = (review) => {
    setEditingId(review._id);
    setEditComment(review.comment);
    setEditRating(review.rating);
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditComment("");
    setEditRating(5);
  };

  const handleSave = async (id) => {
  if (!editComment.trim()) {
    toast.error("Comment is required");
    return;
  }

  try {
    await updateReview(id, {
      rating: editRating,
      comment: editComment,
      userEmail: user.email,
    });

    toast.success("Review updated successfully");

    setReviews((prev) =>
      prev.map((review) =>
        review._id === id
          ? {
              ...review,
              rating: editRating,
              comment: editComment,
            }
          : review
      )
    );

    setEditingId(null);
    setEditComment("");
    setEditRating(5);
  } catch (err) {
    toast.error(err.message || "Update failed");
  }
};

  const handleDelete = async (id) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this review?",
    );

    if (!confirmDelete) return;

    try {
      await deleteMyReview({
        id,
        userEmail: user.email,
      });

      toast.success("Review deleted");

      setReviews((prev) => prev.filter((review) => review._id !== id));
    } catch (err) {
      toast.error(err.message || "Delete failed");
    }
  };

  return (
    <div className="mt-8 space-y-5">
      <h2 className="text-2xl font-bold">Reader Reviews ({reviews.length})</h2>

      {reviews.length === 0 ? (
        <div className="py-10 text-center text-gray-500">No reviews yet.</div>
      ) : (
        reviews.map((review) => (
          <div
            key={review._id}
            className="rounded-2xl border bg-base-100 p-5 shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex gap-4">
                <img
                  src={review.userPhoto || "/avatar.png"}
                  alt={review.userName}
                  className="h-12 w-12 rounded-full object-cover"
                />

                <div>
                  <h3 className="text-lg font-semibold">{review.userName}</h3>

                  {editingId === review._id ? (
                    <select
                      value={editRating}
                      onChange={(e) => setEditRating(Number(e.target.value))}
                      className="select select-bordered mt-2"
                    >
                      {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>
                          {num} Star
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div className="mt-1 flex gap-1">
                      {Array.from({
                        length: review.rating,
                      }).map((_, index) => (
                        <Star
                          key={index}
                          size={18}
                          className="fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col items-end gap-2">
                <span className="text-sm text-gray-500">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>

                {user?.email === review.userEmail && (
                  <div className="flex gap-2">
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => handleEdit(review)}
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      className="btn btn-error btn-sm"
                      onClick={() => handleDelete(review._id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {editingId === review._id ? (
              <div className="mt-5 space-y-4">
                <textarea
                  rows={4}
                  value={editComment}
                  onChange={(e) => setEditComment(e.target.value)}
                  className="textarea textarea-bordered w-full"
                />

                <div className="flex gap-3">
                  <button
                    className="btn btn-primary"
                    onClick={() => handleSave(review._id)}
                  >
                    Save
                  </button>

                  <button className="btn btn-outline" onClick={handleCancel}>
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <p className="mt-4 leading-7 text-base-content/80">
                {review.comment}
              </p>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default ShowComments;
