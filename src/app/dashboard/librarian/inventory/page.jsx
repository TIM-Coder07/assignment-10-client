"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import { Edit, Trash2, EyeOff, Eye } from "lucide-react";

import toast from "react-hot-toast";

export default function ManageInventoryPage() {
  const [books, setBooks] = useState([
    {
      _id: "1",
      title: "Atomic Habits",
      author: "James Clear",
      category: "Self Development",
      status: "Pending Approval",
    },

    {
      _id: "2",
      title: "The Alchemist",
      author: "Paulo Coelho",
      category: "Fiction",
      status: "Published",
    },

    {
      _id: "3",
      title: "Clean Code",
      author: "Robert Martin",
      category: "Programming",
      status: "Unpublished",
    },
  ]);

  const togglePublish = (id) => {
    setBooks((prev) =>
      prev.map((book) => {
        if (book._id !== id) return book;

        if (book.status === "Pending Approval") {
          toast.error("Pending book cannot be published");

          return book;
        }

        return {
          ...book,
          status: book.status === "Published" ? "Unpublished" : "Published",
        };
      }),
    );
  };

  const deleteBook = (id) => {
    setBooks((prev) => prev.filter((book) => book._id !== id));

    toast.success("Book deleted");
  };

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
            {books.map((book, index) => (
              <tr
                key={book._id}
                className="
border-b
hover:bg-gray-50
"
              >
                <td className="p-5">
                  <p
                    className="
font-semibold
"
                  >
                    {book.title}
                  </p>
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
                      onClick={() => toast.success("Edit page coming")}
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

                    {/* Publish Toggle */}

                    {book.status !== "Pending Approval" && (
                      <button
                        onClick={() => togglePublish(book._id)}
                        className="

p-2
rounded-lg
bg-purple-100
text-purple-600

"
                      >
                        {book.status === "Published" ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
