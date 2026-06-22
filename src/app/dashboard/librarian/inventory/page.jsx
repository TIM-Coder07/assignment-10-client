"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { Edit, Trash2, EyeOff, Eye, Loader2 } from "lucide-react";

import toast from "react-hot-toast";

import { getBooksApi, updateBookStatusApi } from "@/lib/librarian/API";

export default function ManageInventoryPage() {
  const [books, setBooks] = useState([]);

  const [loading, setLoading] = useState(true);

  const [updating, setUpdating] = useState(null);

  // =========================
  // GET BOOKS
  // =========================

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const data = await getBooksApi();

        setBooks(data);
      } catch (error) {
        console.log(error);

        toast.error("Failed to load books");
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, []);

  // =========================
  // UPDATE STATUS
  // =========================

  const togglePublish = async (id) => {
    try {
      setUpdating(id);

      const currentBook = books.find((book) => book._id === id);

      if (!currentBook) {
        toast.error("Book not found");

        return;
      }

      const newStatus =
        currentBook.status === "Published" ? "Unpublished" : "Published";

      const result = await updateBookStatusApi(id, newStatus);

      if (!result.success) {
        toast.error("Update failed");

        return;
      }

      setBooks((prev) =>
        prev.map((book) =>
          book._id === id
            ? {
                ...book,

                status: newStatus,
              }
            : book,
        ),
      );

      toast.success("Status updated");
    } catch (error) {
      console.log(error);

      toast.error("Something went wrong");
    } finally {
      setUpdating(null);
    }
  };

  // =========================
  // DELETE UI ONLY
  // =========================

  const deleteBook = (id) => {
    setBooks((prev) => prev.filter((book) => book._id !== id));

    toast.success("Book deleted");
  };

  if (loading) {
    return <div className="p-10 text-center">Loading books...</div>;
  }

  return (
    <div className="p-5 md:p-8">
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
      >
        <h1
          className="
        text-3xl
        font-bold
        "
        >
          Manage Inventory
        </h1>

        <p
          className="
        text-gray-500
        mt-2
        mb-8
        "
        >
          Manage your added books
        </p>
      </motion.div>

      <div
        className="
      overflow-x-auto
      bg-white
      rounded-3xl
      border
      shadow-sm
      "
      >
        <table
          className="
        w-full
        text-left
        "
        >
          <thead>
            <tr
              className="
            border-b
            "
            >
              <th className="p-5">Book</th>

              <th>Author</th>

              <th>Category</th>

              <th>Status</th>

              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {books.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="
          text-center
          p-10
          text-gray-500
          "
                >
                  No books found
                </td>
              </tr>
            ) : (
              books.map((book) => (
                <tr
                  key={book._id}
                  className="
          border-b
          hover:bg-gray-50
          "
                >
                  <td className="p-5">
                    <p className="font-semibold">{book.title}</p>
                  </td>

                  <td>{book.author}</td>

                  <td>{book.category}</td>

                  <td>
                    <span
                      className={`

          px-3
          py-1
          rounded-full
          text-xs
          font-medium


          ${
            book.status === "Published"
              ? "bg-green-100 text-green-700"
              : book.status === "Pending Approval"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-gray-100 text-gray-700"
          }

          `}
                    >
                      {book.status}
                    </span>
                  </td>

                  <td>
                    <div
                      className="
          flex
          gap-3
          "
                    >
                      <button
                        onClick={() => toast.success("Edit coming soon")}
                        className="
          p-2
          rounded-lg
          bg-blue-100
          text-blue-600
          "
                      >
                        <Edit size={18} />
                      </button>

                      <button
                        onClick={() => deleteBook(book._id)}
                        className="
          p-2
          rounded-lg
          bg-red-100
          text-red-600
          "
                      >
                        <Trash2 size={18} />
                      </button>

                      <button
                        onClick={() => togglePublish(book._id)}
                        disabled={updating === book._id}
                        className="
          p-2
          rounded-lg
          bg-purple-100
          text-purple-600
          "
                      >
                        {updating === book._id ? (
                          <Loader2 size={18} className="animate-spin" />
                        ) : book.status === "Published" ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
