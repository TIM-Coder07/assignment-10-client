"use client";

import { useState } from "react";

import { motion } from "framer-motion";

import { Truck } from "lucide-react";

import toast from "react-hot-toast";

import { authClient } from "@/lib/auth-client";

import { getUserDeliveries } from "@/lib/librarian/deliveryAPI";

export default function DeliveryHistoryPage() {
  const [deliveries, setDeliveries] = useState([]);

  const [loading, setLoading] = useState(false);

  const loadHistory = async () => {
    try {
      setLoading(true);

      const { data: session } = await authClient.getSession();

      const email = session?.user?.email;

      if (!email) {
        toast.error("User not found");

        return;
      }

      const data = await getUserDeliveries(email);

      setDeliveries(data);
    } catch (error) {
      console.log(error);

      toast.error("Failed to load delivery history");
    } finally {
      setLoading(false);
    }
  };

  const statusStyle = (status) => {
    if (status === "Pending") {
      return "bg-yellow-100 text-yellow-700";
    }

    if (status === "Dispatched") {
      return "bg-blue-100 text-blue-700";
    }

    if (status === "Delivered") {
      return "bg-green-100 text-green-700";
    }

    return "bg-gray-100 text-gray-700";
  };

  return (
    <div
      className="
      p-5
      md:p-8
      space-y-6
      "
    >
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
      >
        <div
          className="
          flex
          items-center
          gap-3
          "
        >
          <div
            className="
            p-3
            rounded-xl
            bg-indigo-100
            text-indigo-600
            "
          >
            <Truck />
          </div>

          <div>
            <h1
              className="
              text-3xl
              font-bold
              "
            >
              Delivery History
            </h1>

            <p
              className="
              text-gray-500
              mt-1
              "
            >
              Track your book delivery status
            </p>
          </div>
        </div>

        <button
          onClick={loadHistory}
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
          {loading ? "Loading..." : "Load History"}
        </button>
      </motion.div>

      {/* Table */}

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.95,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        className="
        bg-white
        dark:bg-gray-900
        rounded-2xl
        shadow
        overflow-hidden
        "
      >
        <div
          className="
          overflow-x-auto
          "
        >
          <table
            className="
            w-full
            min-w-[700px]
            "
          >
            <thead
              className="
              bg-gray-100
              dark:bg-gray-800
              "
            >
              <tr>
                <th className="text-left p-4">Book Title</th>

                <th className="text-left p-4">Delivery Fee</th>

                <th className="text-left p-4">Request Date</th>

                <th className="text-left p-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {deliveries.length === 0 && !loading && (
                <tr>
                  <td
                    colSpan={4}
                    className="
                      p-10
                      text-center
                      text-gray-500
                      "
                  >
                    No delivery history found
                  </td>
                </tr>
              )}

              {deliveries.map((item, index) => (
                <motion.tr
                  key={item._id}
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: index * 0.05,
                  }}
                  className="
                    border-b
                    dark:border-gray-800
                    "
                >
                  <td
                    className="
                      p-4
                      font-medium
                      "
                  >
                    {item.bookTitle}
                  </td>

                  <td className="p-4">৳{item.deliveryFee}</td>

                  <td
                    className="
                      p-4
                      text-gray-500
                      "
                  >
                    {item.requestedAt
                      ? new Date(item.requestedAt).toLocaleDateString()
                      : "N/A"}
                  </td>

                  <td className="p-4">
                    <span
                      className={`
                        px-3
                        py-1
                        rounded-full
                        text-sm
                        font-medium
                        ${statusStyle(item.status)}
                        `}
                    >
                      {item.status}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
