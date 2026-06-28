"use client";

import { Table } from "@heroui/react";

export function TransactionsTable({ transactions }) {
  return (
    <Table>
      <Table.ScrollContainer>
        <Table.Content
          aria-label="Transactions"
          className="min-w-[1200px]"
        >
          <Table.Header>
            <Table.Column isRowHeader>
              TRANSACTION ID
            </Table.Column>

            <Table.Column>
              USER EMAIL
            </Table.Column>

            <Table.Column>
              LIBRARIAN EMAIL
            </Table.Column>

            <Table.Column>
              AMOUNT
            </Table.Column>

            <Table.Column>
              DATE
            </Table.Column>
          </Table.Header>

          <Table.Body>
            {transactions.length === 0 ? (
              <Table.Row>
                <Table.Cell>No transactions found</Table.Cell>
                <Table.Cell>-</Table.Cell>
                <Table.Cell>-</Table.Cell>
                <Table.Cell>-</Table.Cell>
                <Table.Cell>-</Table.Cell>
              </Table.Row>
            ) : (
              transactions.map((transaction) => (
                <Table.Row key={transaction._id}>
                  <Table.Cell>
                    {transaction._id}
                  </Table.Cell>

                  <Table.Cell>
                    {transaction.userEmail}
                  </Table.Cell>

                  <Table.Cell>
                    {transaction.librarianEmail}
                  </Table.Cell>

                  <Table.Cell>
                    ${transaction.deliveryFee}
                  </Table.Cell>

                  <Table.Cell>
                    {new Date(
                      transaction.createdAt
                    ).toLocaleDateString()}
                  </Table.Cell>
                </Table.Row>
              ))
            )}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
}