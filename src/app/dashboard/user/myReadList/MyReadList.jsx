"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

export default function MyReadingListPage({ deliveredBooks = [] }) {
  return (
    <div className="p-5 md:p-8">
      {/* Header */}
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold">My Reading List</h1>

        <p className="mt-2 text-gray-500">
          Books successfully delivered to you
        </p>
      </motion.div>

      {/* Empty State */}
      {!deliveredBooks || deliveredBooks.length === 0 ? (
        <div
          className="
          flex
          flex-col
          items-center
          justify-center
          rounded-3xl
          border
          border-dashed
          p-16
          text-center
          "
        >
          <BookOpen size={60} className="text-gray-400" />

          <h2
            className="
            mt-4
            text-xl
            font-semibold
            "
          >
            No Delivered Books Yet
          </h2>

          <p
            className="
            mt-2
            text-gray-500
            "
          >
            Once your requested books are delivered, they will appear here.
          </p>
        </div>
      ) : (
        <div
          className="
          grid
          grid-cols-1
          gap-6
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
          "
        >
          {deliveredBooks.map((book, index) => (
            <motion.div
              key={book._id}
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.08,
              }}
              className="
                overflow-hidden
                rounded-3xl
                border
                bg-white
                shadow-sm
                transition-all
                duration-300
                hover:shadow-xl
                dark:bg-gray-900
                "
            >
              {/* Image */}
              <div
                className="
                  relative
                  h-64
                  w-full
                  "
              >
                <Image
                  src={book.image || "/book-placeholder.jpg"}
                  alt={book.bookTitle || "Book"}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <div
                  className="
                    mb-3
                    inline-flex
                    items-center
                    rounded-full
                    bg-green-100
                    px-3
                    py-1
                    text-xs
                    font-medium
                    text-green-700
                    "
                >
                  Delivered
                </div>

                <h2
                  className="
                    line-clamp-1
                    text-lg
                    font-bold
                    "
                >
                  {book.bookTitle}
                </h2>

                <p
                  className="
                    mt-1
                    text-sm
                    text-gray-500
                    "
                >
                  by {book.author || "Unknown Author"}
                </p>

                <div
                  className="
                    mt-4
                    space-y-2
                    text-sm
                    "
                >
                  <div className="flex justify-between">
                    <span className="text-gray-500">Category</span>

                    <span className="font-medium">
                      {book.category || "N/A"}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">Delivery Date</span>

                    <span className="font-medium">
                      {book.requestedAt
                        ? new Date(book.requestedAt).toLocaleDateString()
                        : "N/A"}
                    </span>
                  </div>
                </div>

                <Link
                  href={`/dashboard/user/myReadList/${book.bookId || book._id}`}
                  className="
                    mt-5
                    flex
                    items-center
                    justify-center
                    rounded-xl
                    bg-indigo-600
                    px-4
                    py-3
                    text-sm
                    font-medium
                    text-white
                    transition
                    hover:bg-indigo-700
                    "
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
