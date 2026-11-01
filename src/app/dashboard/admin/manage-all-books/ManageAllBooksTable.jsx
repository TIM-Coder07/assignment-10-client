
"use client";

import { useState } from "react";
import { Button, Table, AlertDialog } from "@heroui/react";

import {
  BookOpen,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  Clock,
  UserRound,
  Library,
} from "lucide-react";

export function ManageAllBooksTable({
  books,
  onPublish,
  onUnpublish,
  onDelete,
}) {
  const [selectedBook, setSelectedBook] = useState(null);

  const handleDelete = (close) => {
    if (!selectedBook) return;

    onDelete(selectedBook._id);
    close();
    setSelectedBook(null);
  };

  return (
    <>
      <div className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        {/* Header */}
        <div className="flex flex-col gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-700">
              <BookOpen size={21} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Manage All Books
              </h2>

              <p className="mt-0.5 text-sm text-slate-500">
                Review, publish and manage book submissions.
              </p>
            </div>
          </div>

          <span className="w-fit rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-600">
            {books.length} Total Books
          </span>
        </div>

        {/* Table */}
        <Table>
          <Table.ScrollContainer>
            <Table.Content
              aria-label="Manage All Books"
              className="min-w-[1200px]"
            >
              <Table.Header>
                <Table.Column isRowHeader>
                  BOOK TITLE
                </Table.Column>

                <Table.Column>
                  AUTHOR
                </Table.Column>

                <Table.Column>
                  CATEGORY
                </Table.Column>

                <Table.Column>
                  LIBRARIAN
                </Table.Column>

                <Table.Column>
                  EMAIL
                </Table.Column>

                <Table.Column>
                  STATUS
                </Table.Column>

                <Table.Column>
                  ACTIONS
                </Table.Column>
              </Table.Header>

              <Table.Body>
                {books.length === 0 ? (
                  <Table.Row>
                    <Table.Cell>
                      <div className="flex items-center gap-2 py-5 text-sm text-slate-500">
                        <BookOpen size={18} />
                        No books found
                      </div>
                    </Table.Cell>

                    <Table.Cell>-</Table.Cell>
                    <Table.Cell>-</Table.Cell>
                    <Table.Cell>-</Table.Cell>
                    <Table.Cell>-</Table.Cell>
                    <Table.Cell>-</Table.Cell>
                    <Table.Cell>-</Table.Cell>
                  </Table.Row>
                ) : (
                  books.map((book) => (
                    <Table.Row key={book._id}>

                      {/* Book Title */}
                      <Table.Cell>
                        <div className="flex items-center gap-3 py-2">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-700">
                            <BookOpen size={19} />
                          </div>

                          <span className="max-w-[190px] font-semibold text-slate-800">
                            {book.title}
                          </span>
                        </div>
                      </Table.Cell>

                      {/* Author */}
                      <Table.Cell>
                        <span className="text-sm text-slate-600">
                          {book.author}
                        </span>
                      </Table.Cell>

                      {/* Category */}
                      <Table.Cell>
                        <span className="inline-flex rounded-lg border border-violet-100 bg-violet-50 px-3 py-1.5 text-xs font-semibold text-violet-700">
                          {book.category}
                        </span>
                      </Table.Cell>

                      {/* Librarian */}
                      <Table.Cell>
                        <div className="flex items-center gap-2">
                          <UserRound
                            size={15}
                            className="text-slate-400"
                          />

                          <span className="text-sm font-medium text-slate-700">
                            {book.librarianName}
                          </span>
                        </div>
                      </Table.Cell>

                      {/* Email */}
                      <Table.Cell>
                        <span className="text-sm text-slate-500">
                          {book.librarianEmail}
                        </span>
                      </Table.Cell>

                      {/* Status */}
                      <Table.Cell>
                        {book.status === "Published" ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                            <CheckCircle2 size={14} />
                            Published
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-100 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700">
                            <Clock size={14} />
                            {book.status || "Pending"}
                          </span>
                        )}
                      </Table.Cell>

                      {/* Actions */}
                      <Table.Cell>
                        <div className="flex items-center gap-2">

                          {book.status === "Published" ? (
                            <Button
                              size="sm"
                              onPress={() => onUnpublish(book._id)}
                              className="min-h-9 rounded-lg border border-amber-100 bg-amber-50 px-3 text-xs font-semibold text-amber-700 shadow-none transition-colors hover:bg-amber-100"
                            >
                              Unpublish
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              onPress={() => onPublish(book._id)}
                              className="min-h-9 rounded-lg bg-emerald-600 px-3 text-xs font-semibold text-white shadow-none transition-colors hover:bg-emerald-700"
                            >
                              <CheckCircle2 size={14} />
                              Publish
                            </Button>
                          )}

                          <Button
                            size="sm"
                            onPress={() => setSelectedBook(book)}
                            className="min-h-9 rounded-lg border border-red-100 bg-red-50 px-3 text-xs font-semibold text-red-600 shadow-none transition-colors hover:bg-red-100"
                          >
                            <Trash2 size={14} />
                            Delete
                          </Button>

                        </div>
                      </Table.Cell>

                    </Table.Row>
                  ))
                )}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
        </Table>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog>
        <AlertDialog.Backdrop
          isOpen={Boolean(selectedBook)}
          onOpenChange={(isOpen) => {
            if (!isOpen) setSelectedBook(null);
          }}
          isDismissable
          className="bg-black/40 backdrop-blur-sm"
        >
          <AlertDialog.Container placement="center" size="sm">
            <AlertDialog.Dialog className="rounded-2xl border border-slate-200 bg-white p-1 shadow-2xl">

              {({ close }) => (
                <>
                  <AlertDialog.Header className="flex flex-col items-center gap-3 px-6 pt-7 text-center">
                    <AlertDialog.Icon
                      status="danger"
                      className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600"
                    >
                      <AlertTriangle size={28} />
                    </AlertDialog.Icon>

                    <AlertDialog.Heading className="text-xl font-bold text-slate-900">
                      Delete This Book?
                    </AlertDialog.Heading>
                  </AlertDialog.Header>

                  <AlertDialog.Body className="px-6 pb-5 pt-3 text-center">
                    <p className="text-sm leading-6 text-slate-500">
                      Are you sure you want to permanently delete this book?
                      This action cannot be undone.
                    </p>

                    {selectedBook && (
                      <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4 text-left">
                        <div className="flex items-start gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
                            <Library size={19} />
                          </div>

                          <div className="min-w-0">
                            <p className="font-semibold text-slate-900">
                              {selectedBook.title}
                            </p>

                            <p className="mt-1 text-sm text-slate-500">
                              By {selectedBook.author}
                            </p>

                            <p className="mt-2 text-xs font-medium text-violet-700">
                              {selectedBook.category}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </AlertDialog.Body>

                  <AlertDialog.Footer className="flex flex-col-reverse gap-2 border-t border-slate-100 px-6 py-4 sm:flex-row sm:justify-end">
                    <Button
                      slot="close"
                      onPress={() => setSelectedBook(null)}
                      className="min-h-10 rounded-xl border border-slate-200 bg-white px-5 font-semibold text-slate-600 shadow-none hover:bg-slate-50"
                    >
                      Cancel
                    </Button>

                    <Button
                      onPress={() => handleDelete(close)}
                      className="min-h-10 rounded-xl bg-red-600 px-5 font-semibold text-white shadow-sm hover:bg-red-700"
                    >
                      <Trash2 size={16} />
                      Delete Book
                    </Button>
                  </AlertDialog.Footer>
                </>
              )}

            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog.Backdrop>
      </AlertDialog>
    </>
  );
}
