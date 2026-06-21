"use client";

import { useState } from "react";
import { Button, Drawer } from "@heroui/react";
import { HiMenuAlt3 } from "react-icons/hi";

export default function UserSideBar() {
  const [open, setOpen] = useState(false);

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
          <a href="/dashboard/user/overview">Overview</a>

          <a href="/dashboard/user/deliveryHistory">Delivery History</a>

          <a href="/dashboard/user/myReadList">Reading List</a>

          <a href="#">My Reviews</a>
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
                  <a href="/dashboard/user">Overview</a>

                  <a href="#">Delivery History</a>

                  <a href="#">Reading List</a>

                  <a href="#">My Reviews</a>
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
