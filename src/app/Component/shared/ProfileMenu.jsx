"use client";

import { ArrowRightFromSquare } from "@gravity-ui/icons";
import { Avatar, Dropdown, Label } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

const ProfileMenu = ({ handleLogout }) => {
  const { data: session } = authClient.useSession();

  return (
    <Dropdown>
      <Dropdown.Trigger className="rounded-full">
        <Avatar>
          <Avatar.Image
            alt={session?.user?.name || "User"}
            src={
              session?.user?.image ||
              "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/orange.jpg"
            }
          />
          <Avatar.Fallback>
            {session?.user?.name?.slice(0, 2)?.toUpperCase() || "U"}
          </Avatar.Fallback>
        </Avatar>
      </Dropdown.Trigger>

      <Dropdown.Popover>
        <div className="px-3 pt-3 pb-1">
          <div className="flex items-center gap-2">
            <Avatar size="sm">
              <Avatar.Image
                alt={session?.user?.name || "User"}
                src={
                  session?.user?.image ||
                  "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/orange.jpg"
                }
              />
              <Avatar.Fallback>
                {session?.user?.name?.slice(0, 2)?.toUpperCase() || "U"}
              </Avatar.Fallback>
            </Avatar>

            <div className="flex flex-col">
              <p className="text-sm font-medium">
                {session?.user?.name || "User"}
              </p>
              <p className="text-xs text-gray-500">{session?.user?.email}</p>
            </div>
          </div>
        </div>

        <Dropdown.Menu>
          <Dropdown.Item id="profile">
            <Link href={'/profile'}>
            <Label>Profile</Label>
            </Link>
          </Dropdown.Item>

          <Dropdown.Item id="logout" variant="danger">
            <button
              onClick={() => handleLogout?.()}
              className="flex w-full items-center justify-between gap-2"
            >
              <Label>Log Out</Label>
              <ArrowRightFromSquare className="size-3.5 text-red-500" />
            </button>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
};

export default ProfileMenu;