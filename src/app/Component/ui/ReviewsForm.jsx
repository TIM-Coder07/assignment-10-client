"use client";

import { createReview } from "@/lib/browseBook/reviewsAPI";
import { Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

export default function ReviewForm({ book, user }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.email) {
      toast.error("Please login first");
      return;
    }

    if (!comment.trim()) {
      toast.error("Please write a review");
      return;
    }

    const reviewData = {
      bookId: book?._id,
      bookTitle: book?.title,
      userEmail: user?.email,
      userName: user?.displayName || user?.name || "Anonymous User",
      userPhoto: user?.photoURL || user?.image || "",
      rating,
      comment: comment.trim(),
    };

    try {
      if (isMounted.current) {
        setLoading(true);
      }

      await createReview(reviewData);

      toast.success("Review submitted successfully 🎉");

      if (isMounted.current) {
        setComment("");
        setRating(5);
      }
    } catch (err) {
      const message = err?.message;

      if (message === "You already reviewed this book") {
        toast.error("You have already reviewed this book.");
      } else if (message === "Only delivered books can be reviewed") {
        toast.error("Only delivered books can leave a review.");
      } else {
        toast.error(message || "Something went wrong. Please try again.");
      }
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  };

  return (
    <div className="mt-10 bg-gradient-to-br from-white via-yellow-50 to-orange-50 border border-yellow-200 rounded-3xl p-8 shadow-xl">
      <h3 className="text-3xl font-bold text-gray-800 mb-2">
        Share Your Experience ✨
      </h3>

      <p className="text-gray-500 mb-8">
        Tell other readers what you think about this book.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Rating */}
        <div>
          <label className="font-semibold text-lg block mb-4">
            Your Rating
          </label>

          <div className="flex items-center gap-3 flex-wrap">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="transition-all duration-200 hover:scale-125 active:scale-95"
              >
                <Star
                  size={38}
                  strokeWidth={1.8}
                  className={`transition-all duration-300 ${
                    star <= rating
                      ? "fill-yellow-400 text-yellow-400 drop-shadow-md"
                      : "fill-transparent text-gray-300"
                  }`}
                />
              </button>
            ))}

            <span className="ml-3 px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 font-bold text-lg">
              {rating}.0 ★
            </span>
          </div>
        </div>

        {/* Review */}
        <div>
          <label className="font-semibold block mb-3">Your Review</label>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={5}
            required
            placeholder="Write your thoughts about this book..."
            className="textarea textarea-bordered w-full rounded-2xl focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="btn w-full rounded-2xl text-lg font-semibold bg-gradient-to-r from-yellow-400 to-orange-500 border-none text-black hover:scale-[1.02] transition-all duration-300"
        >
          {loading ? (
            <>
              <span className="loading loading-spinner loading-sm"></span>
              Submitting...
            </>
          ) : (
            "Submit Review"
          )}
        </button>
      </form>
    </div>
  );
}
