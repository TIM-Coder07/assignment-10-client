"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  ShieldCheck,
  Calendar,
  BookOpen,
  Clock,
  Star,
} from "lucide-react";
import { useSession } from "@/lib/auth-client";

const ProfilePage = () => {
  const { data: session } = useSession();

  const [user, setUser] = useState(null);
  const [stats, setStats] = useState([]);

  useEffect(() => {
    if (!session?.user?.email) return;

    const fetchProfile = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/profile/${session.user.email}`,
        );

        const data = await res.json();
        console.log("data", data);

        if (!data.success) return;

        setUser(data.user);

        if (data.user.role === "Admin") {
          setStats([
            {
              title: "Total Users",
              value: data.stats.totalUsers,
            },
            {
              title: "Total Books",
              value: data.stats.totalBooks,
            },
            {
              title: "Revenue",
              value: `৳ ${data.stats.totalRevenue}`,
            },
          ]);
        } else if (data.user.role === "Librarian") {
          setStats([
            {
              title: "Books Listed",
              value: data.stats.totalBooksListed,
            },
            {
              title: "Pending Deliveries",
              value: data.stats.pendingDeliveries,
            },
            {
              title: "Total Earnings",
              value: `৳ ${data.stats.totalEarnings}`,
            },
          ]);
        } else {
          setStats([
            {
              title: "Books Read",
              value: data.stats.booksRead,
            },
            {
              title: "Pending Requests",
              value: data.stats.pendingRequests,
            },
            {
              title: "Reviews",
              value: data.stats.totalReviews,
            },
            {
              title: "Total Spent",
              value: `৳ ${data.stats.totalSpent}`,
            },
          ]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, [session]);

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h2 className="text-xl font-semibold">Profile Not Found</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-xl border border-white/30 shadow-2xl p-8"
        >
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-10">
            {/* Avatar */}
            <motion.div
              whileHover={{
                scale: 1.08,
                rotate: 3,
              }}
              transition={{ type: "spring", stiffness: 250 }}
              className="relative"
            >
              <img
                src={user.image || "https://i.pravatar.cc/300"}
                alt={user.name}
                className="w-40 h-40 rounded-full object-cover border-[6px] border-white shadow-2xl"
              />

              <div className="absolute bottom-2 right-2 w-6 h-6 rounded-full bg-green-500 border-4 border-white" />
            </motion.div>

            {/* Info */}
            <div className="flex-1 space-y-5 text-center lg:text-left">
              <div>
                <h1 className="text-4xl font-extrabold text-gray-800">
                  {user.name}
                </h1>

                <p className="text-gray-500 mt-1">Welcome back 👋</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-center lg:justify-start gap-3 text-gray-600">
                  <Mail size={18} className="text-blue-600" />
                  <span>{user.email}</span>
                </div>

                <div className="flex items-center justify-center lg:justify-start gap-3">
                  <ShieldCheck size={18} className="text-emerald-600" />

                  <span
                    className={`px-4 py-1.5 rounded-full text-sm font-bold shadow-md ${
                      user.role === "Admin"
                        ? "bg-red-100 text-red-600"
                        : user.role === "Librarian"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {user.role}
                  </span>
                </div>

                <div className="flex items-center justify-center lg:justify-start gap-3 text-gray-600">
                  <Calendar size={18} className="text-orange-500" />

                  <span>
                    Joined {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Button */}
            <motion.button
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.95,
              }}
              className="px-7 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-xl hover:shadow-blue-300 transition"
            >
              Edit Profile
            </motion.button>
          </div>
        </motion.div>

        {/* Stats */}
        <div
          className={`grid gap-6 mt-8 ${
            stats.length === 4 ? "md:grid-cols-4" : "md:grid-cols-3"
          }`}
        >
          {stats.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition"
            >
              <h3 className="text-gray-500">{item.title}</h3>

              <h2 className="text-3xl font-bold mt-3 text-blue-600">
                {item.value}
              </h2>
            </div>
          ))}
        </div>

        {/* About */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">
          <h2 className="text-2xl font-bold mb-6">About</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-center gap-3">
              <BookOpen className="text-blue-600" />
              <span>Book Sharing Community Member</span>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="text-orange-500" />
              <span>Active Since 2026</span>
            </div>

            <div className="flex items-center gap-3">
              <Star className="text-yellow-500" />
              <span>
                {user.emailVerified ? "Verified Member" : "Email Not Verified"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
