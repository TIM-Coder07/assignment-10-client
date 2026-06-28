"use client";

import { Button, Table } from "@heroui/react";

export function ManageAllBooksTable({
  books,
  onPublish,
  onUnpublish,
  onDelete,
}) {
  return (
    <Table>
      <Table.ScrollContainer>
        <Table.Content aria-label="Manage All Books" className="min-w-[1200px]">
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
                <Table.Cell>No books found</Table.Cell>
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
                      {book.status === "Published" ? (
                        <Button
                          color="warning"
                          size="sm"
                          onPress={() => onUnpublish(book._id)}
                        >
                          Unpublish
                        </Button>
                      ) : (
                        <Button
                          color="success"
                          size="sm"
                          onPress={() => onPublish(book._id)}
                        >
                          Publish
                        </Button>
                      )}

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
