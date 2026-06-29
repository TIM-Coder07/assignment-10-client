"use client";

import { Button } from "@heroui/react";
import { Truck } from "lucide-react";
import toast from "react-hot-toast";

import { authClient } from "@/lib/auth-client";
import { createDeliveryRequest } from "@/lib/librarian/deliveryAPI";

export default function DeliveryButton({ book }) {
  console.log("book", book);

  const handleDeliveryRequest = async () => {
    try {
      const { data: session } = await authClient.getSession();
      console.log("session", session.user.email);

      if (!session?.user) {
        toast.error("Please login first");

        return;
      }

      const deliveryData = {
        userEmail: session.user.email,

        userName: session.user.name,

        bookId: book._id,

        bookTitle: book.title,

        author: book.author,
        image: book.image,
        category: book.category,

        librarianEmail: book.librarianEmail,

        status: "Pending",

        deliveryFee: book.deliveryFee,

        requestedAt: new Date(),
      };

      const result = await createDeliveryRequest(deliveryData);

      if (result.success) {
        toast.success("Delivery request sent");
      } else {
        toast.error("Request failed");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Button
      onPress={handleDeliveryRequest}
      className="
      h-12
      px-6
      rounded-xl
      bg-indigo-600
      text-white
      font-semibold
      hover:bg-indigo-700
      "
    >
      <Truck size={18} className="mr-2" />
      Request Delivery
    </Button>
  );
}
