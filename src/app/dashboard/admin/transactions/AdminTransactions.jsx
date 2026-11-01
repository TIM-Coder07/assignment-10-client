
"use client";

import { useState } from "react";
import {
  ReceiptText,
  TrendingUp,
  Wallet,
  ArrowDownRight,
} from "lucide-react";

import { TransactionsTable } from "./TransactionsTable";

const AdminTransactions = ({ initialTransactions = [] }) => {
  const [transactions] = useState(initialTransactions);

  const totalTransactions = transactions.length;

  const totalRevenue = transactions.reduce(
    (total, transaction) =>
      total + Number(transaction.deliveryFee || 0),
    0
  );

  const averageAmount =
    totalTransactions > 0
      ? totalRevenue / totalTransactions
      : 0;

  return (
    <section className="space-y-7">
      {/* Page Heading */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm font-medium text-violet-600">
            <ReceiptText size={17} />
            <span>Financial Overview</span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Transactions
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            View and monitor every transaction across the platform.
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {/* Total Transactions */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
              <ReceiptText size={21} />
            </div>

            <span className="text-xs font-medium text-slate-400">
              All time
            </span>
          </div>

          <p className="mt-5 text-sm font-medium text-slate-500">
            Total Transactions
          </p>

          <h2 className="mt-1 text-2xl font-bold text-slate-900">
            {totalTransactions.toLocaleString()}
          </h2>
        </div>

        {/* Total Revenue */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <Wallet size={21} />
            </div>

            <TrendingUp size={18} className="text-emerald-500" />
          </div>

          <p className="mt-5 text-sm font-medium text-slate-500">
            Total Revenue
          </p>

          <h2 className="mt-1 text-2xl font-bold text-slate-900">
            ${totalRevenue.toFixed(2)}
          </h2>
        </div>

        {/* Average Transaction */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:col-span-2 xl:col-span-1">
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <ArrowDownRight size={21} />
            </div>

            <span className="text-xs font-medium text-slate-400">
              Per transaction
            </span>
          </div>

          <p className="mt-5 text-sm font-medium text-slate-500">
            Average Transaction
          </p>

          <h2 className="mt-1 text-2xl font-bold text-slate-900">
            ${averageAmount.toFixed(2)}
          </h2>
        </div>
      </div>

      {/* Transactions Table */}
      <TransactionsTable transactions={transactions} />
    </section>
  );
};

export default AdminTransactions;
