"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { getFeaturedBooksApi } from "@/lib/browseBook/browseBookAPI";
import BookCard from "./BookCard";
import { useEffect, useState } from "react";
import { authClient, useSession } from "@/lib/auth-client";

const FeaturedBooks = () => {
  const [books, setBooks] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    const loadBooks = async () => {
      const data = await getFeaturedBooksApi();
      setBooks(data);
    };

    loadBooks();
  }, []);

  return (
    <section className="mx-auto mt-10 max-w-7xl px-5 py-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-10 flex flex-col items-center justify-between gap-4 md:flex-row"
      >
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Featured Books</h2>

          <p className="mt-2 text-gray-500">
            Discover our most popular and recommended books.
          </p>
        </div>

        <Link
          href="/browseBook"
          className="rounded-xl bg-purple-600 px-5 py-3 font-medium text-white transition hover:bg-purple-700"
        >
          View All Books
        </Link>
      </motion.div>

      {/* Books */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {books.slice(0, 6).map((book, index) => (
          <motion.div
            key={book._id}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.4,
              delay: index * 0.1,
            }}
          >
            <BookCard book={book} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedBooks;
