"use client";

import { motion } from "framer-motion";
import { BookOpen, Clock3, DollarSign } from "lucide-react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function UserOverviewPage() {
  // 🔥 Later replace this data from backend API

  const stats = {
    totalBooksRead: 24,

    pendingDeliveries: 3,

    totalSpent: 1250,
  };

  // 🔥 Chart data from backend later

  const chartData = [
    {
      month: "Jan",
      books: 4,
    },

    {
      month: "Feb",
      books: 7,
    },

    {
      month: "Mar",
      books: 3,
    },

    {
      month: "Apr",
      books: 10,
    },

    {
      month: "May",
      books: 6,
    },
  ];

  const cards = [
    {
      title: "Total Books Read",

      value: stats.totalBooksRead,

      icon: BookOpen,

      color: "from-purple-600 to-indigo-600",
    },

    {
      title: "Pending Deliveries",

      value: stats.pendingDeliveries,

      icon: Clock3,

      color: "from-orange-500 to-red-500",
    },

    {
      title: "Total Spent",

      value: `৳${stats.totalSpent}`,

      icon: DollarSign,

      color: "from-green-500 to-emerald-600",
    },
  ];

  return (
    <div
      className="
      p-5
      md:p-8
      space-y-8
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
        <h1
          className="
          text-3xl
          font-bold
          "
        >
          Dashboard Overview
        </h1>

        <p
          className="
          text-gray-500
          mt-2
          "
        >
          Track your reading activity and deliveries
        </p>
      </motion.div>

      {/* Stats Cards */}

      <div
        className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        gap-6
        "
      >
        {cards.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.title}
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.1,
              }}
              className="
                rounded-2xl
                p-6
                text-white
                bg-gradient-to-r
                shadow-lg
                "
              style={{
                backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`,
              }}
            >
              <div
                className={`
                  rounded-2xl
                  p-6
                  bg-gradient-to-r
                  ${item.color}
                  `}
              >
                <Icon size={35} />

                <h2
                  className="
                    mt-5
                    text-3xl
                    font-bold
                    "
                >
                  {item.value}
                </h2>

                <p
                  className="
                    mt-2
                    opacity-90
                    "
                >
                  {item.title}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Chart */}

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
        p-6
        "
      >
        <h2
          className="
          text-xl
          font-semibold
          mb-6
          "
        >
          Reading Activity
        </h2>

        <div
          className="
          h-[350px]
          "
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Bar dataKey="books" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
}
