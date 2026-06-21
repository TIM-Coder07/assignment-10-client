"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Truck } from "lucide-react";

export default function ManageDeliveriesPage() {
  // Later replace with API data
  const [deliveries, setDeliveries] = useState([
    {
      id: 1,
      client: "John Smith",
      book: "Atomic Habits",
      date: "2026-06-20",
      status: "Pending",
    },

    {
      id: 2,
      client: "Sarah Khan",
      book: "Clean Code",
      date: "2026-06-18",
      status: "Dispatched",
    },

    {
      id: 3,
      client: "David Lee",
      book: "The Alchemist",
      date: "2026-06-15",
      status: "Delivered",
    },
  ]);

  const updateStatus = (id, currentStatus) => {
    let nextStatus = currentStatus;

    if (currentStatus === "Pending") {
      nextStatus = "Dispatched";
    } else if (currentStatus === "Dispatched") {
      nextStatus = "Delivered";
    }

    setDeliveries((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: nextStatus,
            }
          : item,
      ),
    );

    toast.success(`Status updated to ${nextStatus}`);
  };

  const statusStyle = (status) => {
    if (status === "Pending") {
      return "bg-yellow-100 text-yellow-700";
    }

    if (status === "Dispatched") {
      return "bg-blue-100 text-blue-700";
    }

    return "bg-green-100 text-green-700";
  };

  return (
    <div className="p-5 md:p-8">
      {/* Header */}

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
        <h1
          className="
        text-3xl
        font-bold
        "
        >
          Manage Deliveries
        </h1>

        <p
          className="
        text-gray-500
        mt-2
        "
        >
          Track and update customer book deliveries
        </p>
      </motion.div>

      {/* Table */}

      <div
        className="
      overflow-x-auto
      bg-white
      rounded-3xl
      shadow
      border
      "
      >
        <table
          className="
      w-full
      min-w-[700px]
      "
        >
          <thead>
            <tr
              className="
        border-b
        bg-gray-50
        "
            >
              <th className="p-4 text-left">Client Name</th>

              <th className="p-4 text-left">Book Title</th>

              <th className="p-4 text-left">Date</th>

              <th className="p-4 text-left">Status</th>

              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {deliveries.map((delivery) => (
              <tr
                key={delivery.id}
                className="
        border-b
        hover:bg-gray-50
        transition
        "
              >
                <td className="p-4 font-medium">{delivery.client}</td>

                <td className="p-4">{delivery.book}</td>

                <td className="p-4 text-gray-500">{delivery.date}</td>

                <td className="p-4">
                  <span
                    className={`
        px-3
        py-1
        rounded-full
        text-xs
        font-semibold
        ${statusStyle(delivery.status)}
        `}
                  >
                    {delivery.status}
                  </span>
                </td>

                <td className="p-4">
                  {delivery.status !== "Delivered" && (
                    <button
                      onClick={() => updateStatus(delivery.id, delivery.status)}
                      className="
          flex
          items-center
          gap-2
          rounded-xl
          bg-indigo-600
          px-4
          py-2
          text-white
          text-sm
          hover:bg-indigo-700
          "
                    >
                      <Truck size={16} />

                      {delivery.status === "Pending"
                        ? "Dispatch"
                        : "Mark Delivered"}
                    </button>
                  )}

                  {delivery.status === "Delivered" && (
                    <span
                      className="
          text-green-600
          font-semibold
          text-sm
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
