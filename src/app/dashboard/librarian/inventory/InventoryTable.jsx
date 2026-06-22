"use client";

import { useState } from "react";

import { Trash2, Eye, EyeOff, Loader2 } from "lucide-react";

import toast from "react-hot-toast";

import { deleteBookApi, updateBookStatusApi } from "@/lib/librarian/API";

import { EditModal } from "@/app/Component/ui/EditModal";

export default function InventoryTable({ books: initialBooks }) {
  const [books, setBooks] = useState(initialBooks);

  const [updating, setUpdating] = useState(null);

  // =========================
  // UPDATE STATUS
  // =========================

  const togglePublish = async (id) => {
    try {
      setUpdating(id);

      const currentBook = books.find((book) => book._id === id);

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
  // DELETE
  // =========================

  const deleteBook = async (id) => {
    try {
      const result = await deleteBookApi(id);

      if (result.deletedCount) {
        setBooks((prev) => prev.filter((book) => book._id !== id));

        toast.success("Book deleted");
      }
    } catch (error) {
      console.log(error);

      toast.error("Delete failed");
    }
  };

  return (
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
          <tr className="border-b">
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
                    {/* EDIT */}

                    <EditModal book={book} setBooks={setBooks} />

                    {/* DELETE */}

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

                    {/* PUBLISH */}

                    <button
                      disabled={updating === book._id}
                      onClick={() => togglePublish(book._id)}
                      className="
                      p-2
                      rounded-lg
                      bg-purple-100
                      text-purple-600
                      "
                    >
                      {updating === book._id ? (
                        <Loader2
                          size={18}
                          className="
                          animate-spin
                          "
                        />
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
  );
}
