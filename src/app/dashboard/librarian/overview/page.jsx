"use client";

import { motion } from "framer-motion";
import { BookOpen, DollarSign, Truck } from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function LibrarianOverviewPage() {
  // Later replace with API data
  const stats = [
    {
      title: "Total Books Listed",
      value: 120,
      icon: BookOpen,
    },

    {
      title: "Total Earnings",
      value: "$2450",
      icon: DollarSign,
    },

    {
      title: "Active Deliveries",
      value: 18,
      icon: Truck,
    },
  ];

  // Later replace from backend
  const earningsData = [
    {
      month: "Jan",
      earnings: 400,
    },

    {
      month: "Feb",
      earnings: 700,
    },

    {
      month: "Mar",
      earnings: 550,
    },

    {
      month: "Apr",
      earnings: 900,
    },

    {
      month: "May",
      earnings: 1200,
    },
  ];

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
          Librarian Overview
        </h1>

        <p
          className="
          text-gray-500
          mt-2
          "
        >
          Manage your books, earnings and deliveries
        </p>
      </motion.div>

      {/* Stats */}

      <div
        className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        gap-6
        "
      >
        {stats.map((item, index) => {
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
              rounded-3xl
              border
              bg-white
              p-6
              shadow-sm
              hover:shadow-xl
              transition
              "
            >
              <div
                className="
                  flex
                  justify-between
                  items-center
                  "
              >
                <div>
                  <p
                    className="
                      text-gray-500
                      text-sm
                      "
                  >
                    {item.title}
                  </p>

                  <h2
                    className="
                      text-3xl
                      font-bold
                      mt-2
                      "
                  >
                    {item.value}
                  </h2>
                </div>

                <div
                  className="
                    p-4
                    rounded-full
                    bg-indigo-100
                    "
                >
                  <Icon size={28} className="text-indigo-600" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Chart */}

      <motion.div
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.3,
        }}
        className="
      mt-10
      rounded-3xl
      border
      bg-white
      p-6
      "
      >
        <h2
          className="
          text-xl
          font-bold
          mb-6
          "
        >
          Earnings Overview
        </h2>

        <div
          className="
          h-[350px]
          w-full
          "
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={earningsData}>
              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Bar dataKey="earnings" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
}
