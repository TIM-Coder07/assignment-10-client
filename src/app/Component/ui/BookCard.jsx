"use client";

import Image from "next/image";
import Link from "next/link";
import { Eye } from "lucide-react";

const BookCard = ({ book }) => {
  return (
    <div
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
      <div className="relative h-64 overflow-hidden">
        <Image
          src={book.image || "/no-book.png"}
          alt={book.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
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
        <p className="mt-2 text-sm text-gray-500">By {book.author}</p>

        {/* Delivery Fee */}
        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm text-gray-500">Delivery Fee</span>

          <span className="text-lg font-bold text-purple-600">
            ৳{book.deliveryFee}
          </span>
        </div>

        {/* Button */}
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
  );
};

export default BookCard;
