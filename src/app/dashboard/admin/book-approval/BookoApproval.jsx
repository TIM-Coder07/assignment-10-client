"use client";

import { Table, Button } from "@heroui/react";

export function BookApproval({ books, onApprove, onDelete }) {
  return (
    <Table>
      <Table.ScrollContainer>
        <Table.Content aria-label="Pending Books" className="min-w-[1100px]">
          <Table.Header>
            <Table.Column isRowHeader>BOOK TITLE</Table.Column>

            <Table.Column>AUTHOR</Table.Column>

            <Table.Column>CATEGORY</Table.Column>

            <Table.Column>LIBRARIAN</Table.Column>

            <Table.Column>EMAIL</Table.Column>

            <Table.Column>STATUS</Table.Column>

            <Table.Column>ACTIONS</Table.Column>
          </Table.Header>

          <Table.Body>
            {books.length === 0 ? (
              <Table.Row>
                <Table.Cell>No pending books</Table.Cell>
                <Table.Cell>-</Table.Cell>
                <Table.Cell>-</Table.Cell>
                <Table.Cell>-</Table.Cell>
                <Table.Cell>-</Table.Cell>
                <Table.Cell>-</Table.Cell>
                <Table.Cell>-</Table.Cell>
              </Table.Row>
            ) : (
              books.map((book) => (
                <Table.Row key={book._id}>
                  <Table.Cell>{book.title}</Table.Cell>

                  <Table.Cell>{book.author}</Table.Cell>

                  <Table.Cell>{book.category}</Table.Cell>

                  <Table.Cell>{book.librarianName}</Table.Cell>

                  <Table.Cell>{book.librarianEmail}</Table.Cell>

                  <Table.Cell>{book.status}</Table.Cell>

                  <Table.Cell>
                    <div className="flex gap-2">
                      <Button
                        color="success"
                        size="sm"
                        onPress={() => onApprove(book._id)}
                      >
                        Approve
                      </Button>

                      <Button
                        color="danger"
                        size="sm"
                        onPress={() => onDelete(book._id)}
                      >
                        Delete
                      </Button>
                    </div>
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
