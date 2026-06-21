"use client";

import { useState } from "react";
import { Button, Drawer } from "@heroui/react";
import { HiMenuAlt3 } from "react-icons/hi";
import Link from "next/link";

export default function LibrarianDashboard() {
  const [open, setOpen] = useState(false);

  const menuItems = [
    {
      name: "Overview",
      href: "/dashboard/librarian/overview",
    },
    {
      name: "Add Book",
      href: "/dashboard/librarian/addBook",
    },
    {
      name: "Reading List",
      href: "/dashboard/user/myReadList",
    },
    {
      name: "My Reviews",
      href: "/dashboard/user/reviews",
    },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}

      <div className="md:hidden p-4">
        <Button onPress={() => setOpen(true)} className="text-xl">
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
        p-5
        "
      >
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

        <nav className="flex flex-col gap-4">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="
                hover:text-indigo-400
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
                <nav
                  className="
                  flex
                  flex-col
                  gap-5
                  "
                >
                  {menuItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="
                        hover:text-indigo-600
                        transition
                        "
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </Drawer.Body>

              <Drawer.Footer>
                <Button slot="close" variant="secondary">
                  Close
                </Button>
              </Drawer.Footer>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
}
