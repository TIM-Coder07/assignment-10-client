"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { approveBook } from "@/lib/AdminAPI's/fetchAPI";

export const useApproveBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: approveBook,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["pending-books"],
      });
    },
  });
};