"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  getPendingBooks,
  approveBook,
  deleteBook,
} from "@/lib/AdminAPI's/fetchAPI";
import { BookApproval } from "./BookoApproval";


export default function PendingBooksPage() {
  const queryClient = useQueryClient();

  const { data: books = [], isLoading } = useQuery({
    queryKey: ["pending-books"],
    queryFn: getPendingBooks,
  });

  const approveMutation = useMutation({
    mutationFn: approveBook,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["pending-books"],
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteBook,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["pending-books"],
      });
    },
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="mb-5 text-3xl font-bold">
        Book Approval Queue
      </h1>

      <BookApproval
        books={books}
        onApprove={approveMutation.mutate}
        onDelete={deleteMutation.mutate}
      />
    </div>
  );
}