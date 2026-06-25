"use client";

import { useEffect, useState } from "react";
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
  const [overview, setOverview] = useState({});

  // TEMPORARY TEST
  const librarianEmail = "lib@gmail.com";

  useEffect(() => {
    fetch(`http://localhost:5000/librarian/overview/${librarianEmail}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setOverview(data);
      })
      .catch(console.error);
  }, []);

  const stats = [
    {
      title: "Total Books Listed",
      value: overview.totalBooksListed || 0,
      icon: BookOpen,
    },
    {
      title: "Total Earnings",
      value: `$${overview.totalEarnings || 0}`,
      icon: DollarSign,
    },
    {
      title: "Active Pending Requests",
      value: overview.activePendingRequests || 0,
      icon: Truck,
    },
  ];

  return (
    <div className="p-5 md:p-8">
      <h1 className="mb-8 text-3xl font-bold">Librarian Overview</h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-3xl border bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{item.title}</p>

                  <h2 className="mt-2 text-3xl font-bold">{item.value}</h2>
                </div>

                <div className="rounded-full bg-indigo-100 p-4">
                  <Icon size={28} className="text-indigo-600" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-10 rounded-3xl border bg-white p-6">
        <h2 className="mb-6 text-xl font-bold">Earnings Overview</h2>

        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={overview.chartData || []}>
              <XAxis dataKey="title" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="requests" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
