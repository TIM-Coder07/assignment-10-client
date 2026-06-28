"use client";

import { useState } from "react";
import { TransactionsTable } from "./TransactionsTable";

const AdminTransactions = ({ initialTransactions = [] }) => {
  const [transactions] = useState(initialTransactions);

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          View All Transactions
        </h1>

        <p className="text-default-500">
          View every transaction across the platform.
        </p>
      </div>

      <TransactionsTable transactions={transactions} />
    </section>
  );
};

export default AdminTransactions;