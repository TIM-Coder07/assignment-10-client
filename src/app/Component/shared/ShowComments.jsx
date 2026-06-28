"use client";

import { useEffect, useState } from "react";
import { Pencil, Trash2, Star } from "lucide-react";
import toast from "react-hot-toast";
import {
  getBookReviews,
  updateReview,
  deleteReview,
} from "@/lib/browseBook/reviewsAPI";
const ShowComments = ({ bookId, user }) => {
  const [reviews, setReviews] = useState([]);

  const [editingId, setEditingId] = useState(null);
  const [editComment, setEditComment] = useState("");
  const [editRating, setEditRating] = useState(5);

  useEffect(() => {
    if (!bookId) return;
    loadReviews();
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

  const handleSave = async (id) => {
    if (!editComment.trim()) {
      return toast.error("Comment is required");
      setEditingId(null);
      setEditComment("");
      setEditRating(5);
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
            : review,
        ),
      );

      setEditingId(null);
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
      await deleteReview(id, user.email);

      toast.success("Review deleted");

      setReviews((prev) => prev.filter((review) => review._id !== id));
    } catch (err) {
      toast.error(err.message || "Delete failed");
    }
  };

  return (
    <div className="space-y-5 mt-8">
      <h2 className="text-2xl font-bold">Reader Reviews ({reviews.length})</h2>

      {reviews.length === 0 ? (
        <div className="text-center py-10 text-gray-500">No reviews yet.</div>
      ) : (
        reviews.map((review) => (
          <div
            key={review._id}
            className="bg-base-100 border rounded-2xl p-5 shadow"
          >
            <div className="flex justify-between items-start">
              <div className="flex gap-4">
                <img
                  src={review.userPhoto || "/avatar.png"}
                  alt={review.userName}
                  className="w-12 h-12 rounded-full object-cover"
                />

                <div>
                  <h3 className="font-semibold text-lg">{review.userName}</h3>

                  {editingId === review._id ? (
                    <div className="flex mt-1 gap-1">
                      {Array.from({ length: review.rating }).map((_, index) => (
                        <Star
                          key={index}
                          size={18}
                          className="fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="flex mt-1 gap-1">
                      {Array.from({ length: review.rating }).map((_, index) => (
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
                      onClick={() => handleEdit(review)}
                      className="btn btn-warning btn-sm"
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      onClick={() => handleDelete(review._id)}
                      className="btn btn-error btn-sm"
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
                  value={editComment}
                  onChange={(e) => setEditComment(e.target.value)}
                  rows={4}
                  className="textarea textarea-bordered w-full"
                />

                <div className="flex gap-3">
                  <button
                    onClick={() => handleSave(review._id)}
                    className="btn btn-primary"
                  >
                    Save
                  </button>

                  <button
                    onClick={() => {
                      setEditingId(null);
                      setEditComment("");
                      setEditRating(5);
                    }}
                    className="btn btn-outline"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <p className="mt-4 text-base-content/80 leading-7">
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
