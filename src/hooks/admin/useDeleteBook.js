"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBook } from "@/lib/AdminAPI's/fetchAPI";

export const useDeleteBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBook,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["pending-books"],
      });
    },
  });
};