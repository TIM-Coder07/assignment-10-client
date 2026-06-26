"use client";

import { useState } from "react";

import { ManageAdminUsersTable } from "./ManageAdminUsersTable";

import {
  deleteUser,
  updateUserRole,
} from "@/lib/AdminAPI's/fetchAPI";

const AdminManageUser = ({ initialUsers }) => {
  const [users, setUsers] = useState(initialUsers ?? []);

  const handleRoleChange = async (id, role) => {
    try {
      await updateUserRole(id, role);

      setUsers((prev) =>
        prev.map((user) =>
          user._id === id
            ? {
                ...user,
                role,
              }
            : user,
        ),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await deleteUser(id);

      setUsers((prev) => prev.filter((user) => user._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Manage Users</h1>

        <p className="text-default-500">
          View all users, change their roles, or delete accounts.
        </p>
      </div>

      <ManageAdminUsersTable
        users={users}
        onRoleChange={handleRoleChange}
        onDelete={handleDelete}
      />
    </section>
  );
};

export default AdminManageUser;