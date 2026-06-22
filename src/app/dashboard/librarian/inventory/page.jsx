"use client";

import { useState } from "react";
import { getBooksApi } from "@/lib/librarian/API";

export default function ManageInventoryPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadBooks = async () => {
    setLoading(true);

    try {
      const data = await getBooksApi();

      setBooks(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5">
      <button
        onClick={loadBooks}
        className="px-4 py-2 bg-purple-600 text-white rounded-lg"
      >
        Load Books
      </button>

      {loading && <p>Loading...</p>}

      <table className="w-full mt-5 border">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Category</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {books.map((book) => (
            <tr key={book._id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.category}</td>
              <td>{book.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}