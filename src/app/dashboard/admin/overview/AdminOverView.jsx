"use client";

import { getOverview } from "@/lib/AdminAPI's/fetchAPI";
import { useQuery } from "@tanstack/react-query";

import { Users, BookOpen, Truck, DollarSign } from "lucide-react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = [
  "#3b82f6",
  "#22c55e",
  "#f97316",
  "#e11d48",
  "#8b5cf6",
  "#14b8a6",
];

export default function AdminOverviewPage() {
  const {
    data: overview,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["admin-overview"],
    queryFn: getOverview,
  });

  if (isLoading) {
    return <div className="flex justify-center py-10">Loading...</div>;
  }

  if (isError) {
    return <div className="text-red-500">{error.message}</div>;
  }

  return (
    <div className="space-y-8 p-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Overview</h1>

        <p className="mt-2 text-gray-500">Platform statistics and analytics</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Users"
          value={overview?.totalUsers}
          icon={<Users size={28} />}
        />

        <StatCard
          title="Total Books"
          value={overview?.totalBooks}
          icon={<BookOpen size={28} />}
        />

        <StatCard
          title="Total Deliveries"
          value={overview?.totalDeliveries}
          icon={<Truck size={28} />}
        />

        <StatCard
          title="Total Revenue"
          value={`৳${overview?.totalRevenue}`}
          icon={<DollarSign size={28} />}
        />
      </div>

      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-semibold">Books by Category</h2>

        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={overview?.booksByCategory || []}
                dataKey="count"
                nameKey="category"
                outerRadius={140}
                label
              >
                {(overview?.booksByCategory || []).map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>

              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>

          <h3 className="mt-2 text-3xl font-bold">{value}</h3>
        </div>

        <div className="rounded-xl bg-blue-100 p-3 text-blue-600">{icon}</div>
      </div>
    </div>
  );
}
