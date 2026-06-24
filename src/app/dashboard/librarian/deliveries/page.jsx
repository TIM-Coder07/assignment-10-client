"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Truck } from "lucide-react";

import { authClient } from "@/lib/auth-client";

import {
  getLibrarianDeliveries,
  updateDeliveryStatus,
} from "@/lib/librarian/deliveryAPI";

export default function ManageDeliveriesPage() {
  const [deliveries, setDeliveries] = useState([]);

  const [loading, setLoading] = useState(false);

  const loadDeliveries = async () => {
    try {
      setLoading(true);

      const { data: session } = await authClient.getSession();

      const email = session?.user?.email;

      if (!email) {
        toast.error("Librarian not found");

        return;
      }

      const data = await getLibrarianDeliveries(email);

      console.log("Deliveries:", data);

      setDeliveries(data);
    } catch (error) {
      console.log(error);

      toast.error("Failed to load deliveries");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, currentStatus) => {
    let nextStatus = currentStatus;

    if (currentStatus === "Pending") {
      nextStatus = "Dispatched";
    } else if (currentStatus === "Dispatched") {
      nextStatus = "Delivered";
    }

    try {
      const result = await updateDeliveryStatus(id, nextStatus);

      if (!result.success) {
        throw new Error("Status update failed");
      }

      setDeliveries((prev) =>
        prev.map((delivery) =>
          delivery._id === id
            ? {
                ...delivery,
                status: nextStatus,
              }
            : delivery,
        ),
      );

      toast.success(`Status updated to ${nextStatus}`);
    } catch (error) {
      console.log(error);

      toast.error("Failed to update status");
    }
  };

  const statusStyle = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700";

      case "Dispatched":
        return "bg-blue-100 text-blue-700";

      case "Delivered":
        return "bg-green-100 text-green-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
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
        className="mb-8"
      >
        <h1 className="text-3xl font-bold">Manage Deliveries</h1>

        <p className="mt-2 text-gray-500">
          Track and update customer book deliveries
        </p>

        <button
          onClick={loadDeliveries}
          disabled={loading}
          className="
          mt-5
          rounded-xl
          bg-indigo-600
          px-5
          py-2
          text-white
          hover:bg-indigo-700
          disabled:opacity-50
          "
        >
          {loading ? "Loading..." : "Load Deliveries"}
        </button>
      </motion.div>

      <div
        className="
        overflow-x-auto
        rounded-3xl
        border
        bg-white
        shadow
        "
      >
        <table
          className="
          w-full
          min-w-[700px]
          "
        >
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="p-4 text-left">Client Name</th>

              <th className="p-4 text-left">Book Title</th>

              <th className="p-4 text-left">Request Date</th>

              <th className="p-4 text-left">Status</th>

              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {deliveries.length === 0 && !loading && (
              <tr>
                <td
                  colSpan={5}
                  className="
                    p-10
                    text-center
                    text-gray-500
                    "
                >
                  No delivery requests found
                </td>
              </tr>
            )}

            {deliveries.map((delivery) => (
              <tr
                key={delivery._id}
                className="
                border-b
                hover:bg-gray-50
                "
              >
                <td className="p-4">{delivery.userName}</td>

                <td className="p-4">{delivery.bookTitle}</td>

                <td className="p-4 text-gray-500">
                  {delivery.requestedAt
                    ? new Date(delivery.requestedAt).toLocaleString()
                    : "N/A"}
                </td>

                <td className="p-4">
                  <span
                    className={`
                    rounded-full
                    px-3
                    py-1
                    text-xs
                    font-semibold
                    ${statusStyle(delivery.status)}
                  `}
                  >
                    {delivery.status}
                  </span>
                </td>

                <td className="p-4">
                  {delivery.status !== "Delivered" ? (
                    <button
                      onClick={() =>
                        handleStatusUpdate(delivery._id, delivery.status)
                      }
                      className="
                      flex
                      items-center
                      gap-2
                      rounded-xl
                      bg-indigo-600
                      px-4
                      py-2
                      text-white
                      hover:bg-indigo-700
                      "
                    >
                      <Truck size={16} />

                      {delivery.status === "Pending"
                        ? "Dispatch"
                        : "Mark Delivered"}
                    </button>
                  ) : (
                    <span
                      className="
                      font-semibold
                      text-green-600
                      "
                    >
                      Completed
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
