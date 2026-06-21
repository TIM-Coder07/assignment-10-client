"use client";

import { motion } from "framer-motion";
import { Truck } from "lucide-react";

export default function DeliveryHistoryPage() {
  // 🔥 Later replace with backend API data

  const deliveries = [
    {
      id: 1,

      title: "The Alchemist",

      fee: 120,

      date: "2026-06-10",

      status: "Pending",
    },

    {
      id: 2,

      title: "Atomic Habits",

      fee: 150,

      date: "2026-06-05",

      status: "Dispatched",
    },

    {
      id: 3,

      title: "Clean Code",

      fee: 200,

      date: "2026-05-28",

      status: "Delivered",
    },

    {
      id: 4,

      title: "Rich Dad Poor Dad",

      fee: 100,

      date: "2026-05-20",

      status: "Pending",
    },
  ];

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
                <th
                  className="
                  text-left
                  p-4
                  "
                >
                  Book Title
                </th>

                <th
                  className="
                  text-left
                  p-4
                  "
                >
                  Delivery Fee
                </th>

                <th
                  className="
                  text-left
                  p-4
                  "
                >
                  Request Date
                </th>

                <th
                  className="
                  text-left
                  p-4
                  "
                >
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {deliveries.map((item, index) => (
                <motion.tr
                  key={item.id}
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: index * 0.1,
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
                    {item.title}
                  </td>

                  <td
                    className="
                      p-4
                      "
                  >
                    ৳{item.fee}
                  </td>

                  <td
                    className="
                      p-4
                      text-gray-500
                      "
                  >
                    {item.date}
                  </td>

                  <td
                    className="
                      p-4
                      "
                  >
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
