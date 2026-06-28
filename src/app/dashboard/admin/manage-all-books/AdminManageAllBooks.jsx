"use client";

import { useState } from "react";

import {
  deleteBook,
  publishBook,
  unpublishBook,
} from "@/lib/AdminAPI's/fetchAPI";

import { ManageAllBooksTable } from "./ManageAllBooksTable";

const AdminManageAllBooks = ({ initialBooks = [] }) => {
  const [books, setBooks] = useState(initialBooks);

  const handlePublish = async (id) => {
    try {
      await publishBook(id);

      setBooks((prev) =>
        prev.map((book) =>
          book._id === id
            ? {
                ...book,
                status: "Published",
              }
            : book,
        ),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnpublish = async (id) => {
    try {
      await unpublishBook(id);

      setBooks((prev) =>
        prev.map((book) =>
          book._id === id
            ? {
                ...book,
                status: "Unpublished",
              }
            : book,
        ),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to permanently delete this book?",
    );

    if (!confirmDelete) return;

    try {
      await deleteBook(id);

      setBooks((prev) => prev.filter((book) => book._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Manage All Books</h1>

        <p className="text-default-500 mt-2">
          View every book on the platform. Publish, unpublish, or permanently
          delete any listing.
        </p>
      </div>

      <ManageAllBooksTable
        books={books}
        onPublish={handlePublish}
        onUnpublish={handleUnpublish}
        onDelete={handleDelete}
      />
    </section>
  );
};

export default AdminManageAllBooks;
