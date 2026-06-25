"use client";

import { useEffect, useState } from "react";
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
  const [overview, setOverview] = useState({});

  // Temporary test email
  const userEmail = "user@gmail.com";

  useEffect(() => {
    fetch(`http://localhost:5000/user/overview/${userEmail}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("USER OVERVIEW:", data);
        setOverview(data);
      })
      .catch(console.error);
  }, []);

  const cards = [
    {
      title: "Total Books Read",
      value: overview.totalBooksRead || 0,
      icon: BookOpen,
      color: "from-purple-600 to-indigo-600",
    },

    {
      title: "Pending Deliveries",
      value: overview.pendingDeliveries || 0,
      icon: Clock3,
      color: "from-orange-500 to-red-500",
    },

    {
      title: "Total Spent",
      value: `৳${overview.totalSpent || 0}`,
      icon: DollarSign,
      color: "from-green-500 to-emerald-600",
    },
  ];

  return (
    <div className="space-y-8 p-5 md:p-8">
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
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>

        <p className="mt-2 text-gray-500">
          Track your reading activity and deliveries
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
              className="rounded-2xl p-6 text-white shadow-lg"
            >
              <div className={`rounded-2xl bg-gradient-to-r p-6 ${item.color}`}>
                <Icon size={35} />

                <h2 className="mt-5 text-3xl font-bold">{item.value}</h2>

                <p className="mt-2 opacity-90">{item.title}</p>
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
        className="rounded-2xl bg-white p-6 shadow dark:bg-gray-900"
      >
        <h2 className="mb-6 text-xl font-semibold">Reading Activity</h2>

        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={overview.chartData || []}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Bar dataKey="books" fill="#6366F1" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
}
