
"use client";

import { useState } from "react";
import { Button, Table, AlertDialog } from "@heroui/react";
import { Users, Trash2, ShieldCheck, AlertTriangle } from "lucide-react";

export function ManageAdminUsersTable({
  users,
  onRoleChange,
  onDelete,
}) {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleDelete = (close) => {
    if (!selectedUser) return;

    onDelete(selectedUser._id);
    close();
    setSelectedUser(null);
  };

  return (
    <>
      <div className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        {/* Table Header */}
        <div className="flex flex-col gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-700">
              <Users size={21} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Manage Users
              </h2>
              <p className="mt-0.5 text-sm text-slate-500">
                Manage user accounts and permissions.
              </p>
            </div>
          </div>

          <span className="w-fit rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-600">
            {users.length} Total Users
          </span>
        </div>

        {/* Table */}
        <Table>
          <Table.ScrollContainer>
            <Table.Content
              aria-label="Manage Users"
              className="min-w-[850px]"
            >
              <Table.Header>
                <Table.Column isRowHeader>
                  USER
                </Table.Column>

                <Table.Column>
                  EMAIL ADDRESS
                </Table.Column>

                <Table.Column>
                  ROLE
                </Table.Column>

                <Table.Column>
                  ACTIONS
                </Table.Column>
              </Table.Header>

              <Table.Body>
                {users.length === 0 ? (
                  <Table.Row>
                    <Table.Cell>
                      <div className="flex items-center gap-2 py-5 text-sm text-slate-500">
                        <Users size={18} />
                        No users found
                      </div>
                    </Table.Cell>

                    <Table.Cell>-</Table.Cell>
                    <Table.Cell>-</Table.Cell>
                    <Table.Cell>-</Table.Cell>
                  </Table.Row>
                ) : (
                  users.map((user) => (
                    <Table.Row key={user._id}>

                      {/* User */}
                      <Table.Cell>
                        <div className="flex items-center gap-3 py-2">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-100 text-sm font-bold uppercase text-violet-700">
                            {user.name?.charAt(0) || "U"}
                          </div>

                          <span className="font-semibold text-slate-800">
                            {user.name}
                          </span>
                        </div>
                      </Table.Cell>

                      {/* Email */}
                      <Table.Cell>
                        <span className="text-sm text-slate-600">
                          {user.email}
                        </span>
                      </Table.Cell>

                      {/* Role */}
                      <Table.Cell>
                        <div className="flex items-center gap-2">
                          <ShieldCheck
                            size={16}
                            className="text-violet-600"
                          />

                          <select
                            aria-label={`Change role for ${user.name}`}
                            className="cursor-pointer rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 outline-none transition-all hover:border-violet-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                            value={user.role}
                            onChange={(e) =>
                              onRoleChange(user._id, e.target.value)
                            }
                          >
                            <option value="User">User</option>
                            <option value="Librarian">Librarian</option>
                            <option value="Admin">Admin</option>
                          </select>
                        </div>
                      </Table.Cell>

                      {/* Delete Button */}
                      <Table.Cell>
                        <Button
                          size="sm"
                          onPress={() => setSelectedUser(user)}
                          className="min-h-9 rounded-lg border border-red-100 bg-red-50 px-3 font-semibold text-red-600 shadow-none transition-all hover:border-red-200 hover:bg-red-100"
                        >
                          <Trash2 size={15} />
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
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog>
        <AlertDialog.Backdrop
          isOpen={Boolean(selectedUser)}
          onOpenChange={(isOpen) => {
            if (!isOpen) setSelectedUser(null);
          }}
          isDismissable
          isKeyboardDismissDisabled={false}
          className="bg-black/40 backdrop-blur-sm"
        >
          <AlertDialog.Container placement="center" size="sm">
            <AlertDialog.Dialog className="rounded-2xl border border-slate-200 bg-white p-1 shadow-2xl">

              {({ close }) => (
                <>
                  <AlertDialog.Header className="flex flex-col items-center gap-3 px-6 pt-7 text-center">
                    <AlertDialog.Icon
                      status="danger"
                      className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600"
                    >
                      <AlertTriangle size={28} />
                    </AlertDialog.Icon>

                    <AlertDialog.Heading className="text-xl font-bold text-slate-900">
                      Delete User?
                    </AlertDialog.Heading>
                  </AlertDialog.Header>

                  <AlertDialog.Body className="px-6 pb-5 pt-3 text-center">
                    <p className="text-sm leading-6 text-slate-500">
                      Are you sure you want to permanently delete this user?
                      This action cannot be undone.
                    </p>

                    {selectedUser && (
                      <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4 text-left">
                        <p className="font-semibold text-slate-900">
                          {selectedUser.name}
                        </p>

                        <p className="mt-1 break-all text-sm text-slate-500">
                          {selectedUser.email}
                        </p>
                      </div>
                    )}
                  </AlertDialog.Body>

                  <AlertDialog.Footer className="flex flex-col-reverse gap-2 border-t border-slate-100 px-6 py-4 sm:flex-row sm:justify-end">
                    <Button
                      slot="close"
                      onPress={() => setSelectedUser(null)}
                      className="min-h-10 rounded-xl border border-slate-200 bg-white px-5 font-semibold text-slate-600 shadow-none hover:bg-slate-50"
                    >
                      Cancel
                    </Button>

                    <Button
                      onPress={() => handleDelete(close)}
                      className="min-h-10 rounded-xl bg-red-600 px-5 font-semibold text-white shadow-sm hover:bg-red-700"
                    >
                      <Trash2 size={16} />
                      Delete User
                    </Button>
                  </AlertDialog.Footer>
                </>
              )}

            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog.Backdrop>
      </AlertDialog>
    </>
  );
}
