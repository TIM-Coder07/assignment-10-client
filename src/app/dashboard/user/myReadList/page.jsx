"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

export default function MyReadingListPage() {
  // Later replace with API data
  const deliveredBooks = [
    {
      _id: "1",
      title: "Atomic Habits",
      author: "James Clear",
      category: "Self Development",
      image:
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600",
      deliveryDate: "2026-06-12",
      status: "Delivered",
    },

    {
      _id: "2",
      title: "The Alchemist",
      author: "Paulo Coelho",
      category: "Fiction",
      image:
        "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600",
      deliveryDate: "2026-06-08",
      status: "Delivered",
    },

    {
      _id: "3",
      title: "Clean Code",
      author: "Robert C. Martin",
      category: "Programming",
      image:
        "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=600",
      deliveryDate: "2026-05-28",
      status: "Delivered",
    },
  ];

  return (
    <div className="p-5 md:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold">
          My Reading List
        </h1>

        <p className="mt-2 text-gray-500">
          Books successfully delivered to you
        </p>
      </motion.div>

      {/* Empty State */}
      {deliveredBooks.length === 0 ? (
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
          <BookOpen
            size={60}
            className="text-gray-400"
          />

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
            Once your requested books are delivered,
            they will appear here.
          </p>
        </div>
      ) : (
        <div
          className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
          gap-6
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
              bg-white
              dark:bg-gray-900
              rounded-3xl
              overflow-hidden
              shadow-sm
              hover:shadow-xl
              transition-all
              duration-300
              border
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
                  src={book.image}
                  alt={book.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <div
                  className="
                  inline-flex
                  items-center
                  rounded-full
                  bg-green-100
                  px-3
                  py-1
                  text-xs
                  font-medium
                  text-green-700
                  mb-3
                  "
                >
                  Delivered
                </div>

                <h2
                  className="
                  text-lg
                  font-bold
                  line-clamp-1
                  "
                >
                  {book.title}
                </h2>

                <p
                  className="
                  mt-1
                  text-sm
                  text-gray-500
                  "
                >
                  by {book.author}
                </p>

                <div
                  className="
                  mt-4
                  space-y-2
                  text-sm
                  "
                >
                  <div className="flex justify-between">
                    <span className="text-gray-500">
                      Category
                    </span>

                    <span className="font-medium">
                      {book.category}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">
                      Delivery Date
                    </span>

                    <span className="font-medium">
                      {book.deliveryDate}
                    </span>
                  </div>
                </div>

                <Link
                  href={`/dashboard/user/myReadList/${book._id}`}
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