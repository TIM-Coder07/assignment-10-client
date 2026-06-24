export const dynamic = "force-dynamic";

import { Eye } from "lucide-react";
import { getBooksApi } from "@/lib/librarian/API";
import Link from "next/link";

export default async function BrowseBookPage() {
  const books = await getBooksApi();

  const publishedBooks = books.filter((book) => book.status === "Published");

  return (
    <div
      className="
      min-h-screen
      bg-gray-50
      p-5
      md:p-10
      "
    >
      <div
        className="
        max-w-7xl
        mx-auto
        "
      >
        {/* Header */}

        <div className="mb-8">
          <h1
            className="
            text-3xl
            font-bold
            "
          >
            Browse Books
          </h1>

          <p
            className="
            text-gray-500
            mt-2
            "
          >
            Explore all published books
          </p>
        </div>

        {/* Empty State */}

        {publishedBooks.length === 0 ? (
          <div
            className="
            bg-white
            rounded-2xl
            p-10
            text-center
            shadow
            "
          >
            <h2
              className="
              text-xl
              font-semibold
              "
            >
              No books available
            </h2>
          </div>
        ) : (
          <div
            className="
            grid
            sm:grid-cols-2
            lg:grid-cols-3
            gap-6
            "
          >
            {publishedBooks.map((book) => (
              <div
                key={book._id}
                className="
                group
                overflow-hidden
                rounded-3xl
                border
                bg-white
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-2
                hover:shadow-xl
                "
              >
                {/* Image */}

                <div className="overflow-hidden">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="
                    h-64
                    w-full
                    object-cover
                    transition-transform
                    duration-500
                    group-hover:scale-110
                    "
                  />
                </div>

                <div className="p-5">
                  {/* Category */}

                  <span
                    className="
                    inline-flex
                    rounded-full
                    bg-purple-100
                    px-3
                    py-1
                    text-xs
                    font-medium
                    text-purple-700
                    "
                  >
                    {book.category}
                  </span>

                  {/* Title */}

                  <h2
                    className="
                    mt-4
                    line-clamp-2
                    text-xl
                    font-bold
                    text-gray-900
                    "
                  >
                    {book.title}
                  </h2>

                  {/* Author */}

                  <p
                    className="
                    mt-2
                    text-sm
                    text-gray-500
                    "
                  >
                    By {book.author}
                  </p>

                  {/* Fee */}

                  <div
                    className="
                    mt-4
                    flex
                    items-center
                    justify-between
                    "
                  >
                    <span className="text-sm text-gray-500">Delivery Fee</span>

                    <span
                      className="
                      text-lg
                      font-bold
                      text-purple-600
                      "
                    >
                      ৳{book.deliveryFee}
                    </span>
                  </div>

                  {/* Details Button */}

                  <Link
                    href={`/browseBook/${book._id}`}
                    className="
                    mt-5
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-gradient-to-r
                    from-purple-600
                    to-indigo-600
                    py-3
                    font-medium
                    text-white
                    transition-all
                    duration-300
                    hover:shadow-lg
                    "
                  >
                    <Eye size={18} />
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
