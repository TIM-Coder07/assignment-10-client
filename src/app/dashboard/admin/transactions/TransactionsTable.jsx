
"use client";

import { Table } from "@heroui/react";
import {
  ReceiptText,
  UserRound,
  Library,
  CalendarDays,
  Wallet,
} from "lucide-react";

export function TransactionsTable({ transactions = [] }) {
  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex flex-col gap-2 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
            <ReceiptText size={20} />
          </div>

          <div>
            <h2 className="text-base font-semibold text-slate-800">
              Transactions
            </h2>
            <p className="text-xs text-slate-500">
              View all delivery fee transactions
            </p>
          </div>
        </div>

        <div className="text-sm text-slate-500">
          Total transactions:{" "}
          <span className="font-semibold text-slate-800">
            {transactions.length}
          </span>
        </div>
      </div>

      {/* Table */}
      <Table>
        <Table.ScrollContainer>
          <Table.Content
            aria-label="Transactions"
            className="min-w-[1100px]"
          >
            <Table.Header>
              <Table.Column isRowHeader>
                TRANSACTION ID
              </Table.Column>
              <Table.Column>USER EMAIL</Table.Column>
              <Table.Column>LIBRARIAN EMAIL</Table.Column>
              <Table.Column>AMOUNT</Table.Column>
              <Table.Column>DATE</Table.Column>
            </Table.Header>

            <Table.Body>
              {transactions.length === 0 ? (
                <Table.Row>
                  <Table.Cell colSpan={5}>
                    <div className="flex flex-col items-center justify-center gap-2 py-12 text-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                        <ReceiptText size={22} />
                      </div>
                      <p className="font-medium text-slate-700">
                        No transactions found
                      </p>
                      <p className="text-xs text-slate-400">
                        Transactions will appear here when available.
                      </p>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ) : (
                transactions.map((transaction) => (
                  <Table.Row key={transaction._id}>
                    <Table.Cell>
                      <span
                        title={transaction._id}
                        className="block max-w-[180px] truncate font-mono text-xs font-medium text-slate-600"
                      >
                        #{transaction._id}
                      </span>
                    </Table.Cell>

                    <Table.Cell>
                      <div className="flex items-center gap-2">
                        <UserRound
                          size={15}
                          className="shrink-0 text-slate-400"
                        />
                        <span className="text-sm text-slate-700">
                          {transaction.userEmail}
                        </span>
                      </div>
                    </Table.Cell>

                    <Table.Cell>
                      <div className="flex items-center gap-2">
                        <Library
                          size={15}
                          className="shrink-0 text-slate-400"
                        />
                        <span className="text-sm text-slate-700">
                          {transaction.librarianEmail}
                        </span>
                      </div>
                    </Table.Cell>

                    <Table.Cell>
                      <div className="flex items-center gap-1.5 font-semibold text-emerald-600">
                        <Wallet size={15} />
                        <span>
                          ${Number(transaction.deliveryFee || 0).toFixed(2)}
                        </span>
                      </div>
                    </Table.Cell>

                    <Table.Cell>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <CalendarDays
                          size={15}
                          className="shrink-0 text-slate-400"
                        />
                        {formatDate(transaction.createdAt)}
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))
              )}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </div>
  );
}
