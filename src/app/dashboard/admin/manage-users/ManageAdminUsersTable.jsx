"use client";

import { Button, Table } from "@heroui/react";

export function ManageAdminUsersTable({
  users,
  onRoleChange,
  onDelete,
}) {
  return (
    <Table>
      <Table.ScrollContainer>
        <Table.Content aria-label="Manage Users" className="min-w-[900px]">
          <Table.Header>
            <Table.Column isRowHeader>NAME</Table.Column>
            <Table.Column>EMAIL</Table.Column>
            <Table.Column>ROLE</Table.Column>
            <Table.Column>ACTIONS</Table.Column>
          </Table.Header>

          <Table.Body>
            {users.length === 0 ? (
              <Table.Row>
                <Table.Cell>No users found</Table.Cell>
                <Table.Cell>-</Table.Cell>
                <Table.Cell>-</Table.Cell>
                <Table.Cell>-</Table.Cell>
              </Table.Row>
            ) : (
              users.map((user) => (
                <Table.Row key={user._id}>
                  <Table.Cell>{user.name}</Table.Cell>

                  <Table.Cell>{user.email}</Table.Cell>

                  <Table.Cell>
                    <select
                      className="border rounded-md px-2 py-1"
                      value={user.role}
                      onChange={(e) =>
                        onRoleChange(user._id, e.target.value)
                      }
                    >
                      <option value="User">User</option>
                      <option value="Librarian">Librarian</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </Table.Cell>

                  <Table.Cell>
                    <Button
                      color="danger"
                      size="sm"
                      onPress={() => onDelete(user._id)}
                    >
                      Delete
                    </Button>
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