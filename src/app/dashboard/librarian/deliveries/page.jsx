"use client";

import { useState } from "react";

import { motion } from "framer-motion";

import toast from "react-hot-toast";

import { Truck } from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { getLibrarianDeliveries, updateDeliveryStatus } from "@/lib/librarian/deliveryAPI";

export default function ManageDeliveriesPage() {
  const [deliveries, setDeliveries] = useState([]);

  const [loading, setLoading] = useState(false);

  const loadDeliveries = async () => {
    try {
      setLoading(true);

      const { data: session } = await authClient.getSession();

      const email = session?.user?.email;

      if (!email) {
        toast.error("User not found");

        return;
      }

      const data = await getLibrarianDeliveries(email);

      setDeliveries(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, currentStatus) => {
    let nextStatus = currentStatus;

    if (currentStatus === "Pending") {
      nextStatus = "Dispatched";
    } else if (currentStatus === "Dispatched") {
      nextStatus = "Delivered";
    }

    try {
      await updateDeliveryStatus(id, nextStatus);

      setDeliveries((prev) =>
        prev.map((item) =>
          item._id === id
            ? {
                ...item,
                status: nextStatus,
              }
            : item,
        ),
      );

      toast.success(`Status updated to ${nextStatus}`);
    } catch (error) {
      toast.error(error.message);
    }
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

        <p className="text-gray-500 mt-2">
          Track and update customer book deliveries
        </p>

        <button
          onClick={loadDeliveries}
          className="
mt-5
bg-indigo-600
text-white
px-5
py-2
rounded-xl
"
        >
          {loading ? "Loading..." : "Load Deliveries"}
        </button>
      </motion.div>

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
            <tr className="border-b bg-gray-50">
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
                key={delivery._id}
                className="
border-b
hover:bg-gray-50
"
              >
                <td className="p-4">{delivery.userName}</td>

                <td className="p-4">{delivery.bookTitle}</td>

                <td className="p-4 text-gray-500">{delivery.requestedAt}</td>

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
                      onClick={() =>
                        updateStatus(
                          delivery._id,

                          delivery.status,
                        )
                      }
                      className="
flex
items-center
gap-2
bg-indigo-600
text-white
px-4
py-2
rounded-xl
"
                    >
                      <Truck size={16} />

                      {delivery.status === "Pending"
                        ? "Dispatch"
                        : "Mark Delivered"}
                    </button>
                  )}

                  {delivery.status === "Delivered" && (
                    <span className="text-green-600 font-semibold">
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
