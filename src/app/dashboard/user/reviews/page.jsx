"use client";

import { useEffect, useState } from "react";
import { Star, Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { deleteMyReview, getMyReviews } from "@/lib/browseBook/reviewsAPI";

const MyReviewPage = () => {
  const [reviews, setReviews] = useState([]);

  const { data: session } = authClient.useSession();

  const user = session?.user;

  useEffect(() => {
    if (!user?.email) return;

    const loadReviews = async () => {
      try {
        const data = await getMyReviews(user.email);
        setReviews(data);
      } catch (error) {
        toast.error("Failed to load reviews");
      }
    };

    loadReviews();
  }, [user]);

  const handleDelete = async (id) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this review?",
    );

    if (!confirmDelete) return;

    try {
      const result = await deleteMyReview({
        id,
        userEmail: user.email,
      });

      if (result.success) {
        setReviews((prev) => prev.filter((review) => review._id !== id));

        toast.success(result.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (!reviews.length) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold">My Reviews</h2>

        <p className="mt-4 text-gray-500">
          You haven&rsquo;t reviewed any books yet.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-10 px-5">
      <h1 className="text-4xl font-bold mb-8">My Reviews</h1>

      <div className="grid gap-6">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="border rounded-2xl p-6 shadow-md bg-base-100"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="font-bold text-xl">{review.bookTitle}</h2>

                <div className="flex mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={20}
                      className={
                        star <= review.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>

                <p className="mt-4">{review.comment}</p>

                <p className="text-sm text-gray-500 mt-3">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleDelete(review._id)}
                  className="btn btn-error btn-sm cursor-pointer"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyReviewPage;
