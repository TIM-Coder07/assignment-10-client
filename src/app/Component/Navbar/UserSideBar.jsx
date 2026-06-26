"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Drawer } from "@heroui/react";
import { HiMenuAlt3 } from "react-icons/hi";
import { authClient } from "@/lib/auth-client";

export default function DashboardSidebar() {
  const [open, setOpen] = useState(false);

  const { data: session, isPending } = authClient.useSession();

  const role = session?.user?.role;

  const menus = {
    user: [
      {
        name: "Overview",
        path: "/dashboard/user/overview",
      },

      {
        name: "Delivery History",
        path: "/dashboard/user/deliveryHistory",
      },

      {
        name: "My Reading List",
        path: "/dashboard/user/myReadList",
      },

      {
        name: "My Reviews",
        path: "/dashboard/user/reviews",
      },
    ],

    librarian: [
      {
        name: "Overview",
        path: "/dashboard/librarian/overview",
      },

      {
        name: "Add Book",
        path: "/dashboard/librarian/addBook",
      },

      {
        name: "Manage Inventory",
        path: "/dashboard/librarian/inventory",
      },

      {
        name: "Manage Deliveries",
        path: "/dashboard/librarian/deliveries",
      },
    ],

    admin: [
      {
        name: "Admin Overview",
        path: "/dashboard/admin/overview",
      },

      {
        name: "Book Approval",
        path: "/dashboard/admin/book-approval",
      },

      {
        name: "Manage Users",
        path: "/dashboard/admin/manage-users",
      },
    ],
  };

  // session load হওয়ার আগে wait করবে

  if (isPending) {
    return <div className="p-5 text-center">Loading Sidebar...</div>;
  }

  const navItems = menus[role] || [];

  return (
    <>
      {/* Mobile Button */}

      <div className="md:hidden p-4">
        <Button onPress={() => setOpen(true)}>
          <HiMenuAlt3 size={25} />
        </Button>
      </div>

      {/* Desktop Sidebar */}

      <aside
        className="
        hidden
        md:block
        w-64
        min-h-screen
        bg-gray-900
        text-white
        p-6
        "
      >
        <h1
          className="
          text-2xl
          font-bold
          mb-8
          "
        >
          Dashboard
        </h1>

        <p className="mb-5 text-sm text-purple-400">Role: {role}</p>

        <nav
          className="
          flex
          flex-col
          gap-3
          "
        >
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className="
                rounded-lg
                px-3
                py-2
                hover:bg-gray-800
                transition
                "
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Mobile Drawer */}

      <Drawer isOpen={open} onOpenChange={setOpen}>
        <Drawer.Backdrop>
          <Drawer.Content placement="left">
            <Drawer.Dialog>
              <Drawer.CloseTrigger />

              <Drawer.Header>
                <Drawer.Heading>Dashboard</Drawer.Heading>
              </Drawer.Header>

              <Drawer.Body>
                <p className="mb-5 text-purple-600">Role: {role}</p>

                <nav
                  className="
                  flex
                  flex-col
                  gap-4
                  "
                >
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      href={item.path}
                      onClick={() => setOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
}
