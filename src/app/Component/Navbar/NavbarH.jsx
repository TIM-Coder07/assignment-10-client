"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { HiMenuAlt3, HiX } from "react-icons/hi";

import { authClient } from "@/lib/auth-client";
import ProfileMenu from "../shared/ProfileMenu";

const NavbarH = () => {
  const [open, setOpen] = useState(false);

  const pathname = usePathname();

  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const userRole = session?.user?.role;

  const dashboardRoutes = {
    user: "/dashboard/user/overview",

    librarian: "/dashboard/librarian/overview",

    admin: "/dashboard/admin/overview",
  };

  const roleNames = {
    user: "User",

    librarian: "Librarian",

    admin: "Admin",
  };

  const navItems = [
    {
      name: "Home",
      href: "/",
    },

    {
      name: "Browse Books",
      href: "/browseBook",
    },
  ];

  const goDashboard = () => {
    const route = dashboardRoutes[userRole];

    if (route) {
      router.push(route);
    } else {
      console.log("Role not found");
    }
  };

  const isActive = (href) => {
    return href === "/" ? pathname === href : pathname.startsWith(href);
  };

  const handleLogout = async () => {
    await authClient.signOut();

    setOpen(false);

    router.refresh();

    router.push("/login");
  };

  return (
    <nav
      className="
sticky
top-0
z-50
border-b
bg-white/70
backdrop-blur-xl
"
    >
      <div
        className="
max-w-7xl
mx-auto
px-5
py-3
flex
justify-between
items-center
"
      >
        {/* LOGO */}

        <Link href="/">
          <h1
            className="
text-2xl
font-bold
text-purple-600
"
          >
            BookNest
          </h1>
        </Link>

        {/* DESKTOP MENU */}

        <div
          className="
hidden
md:flex
gap-7
items-center
"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={
                isActive(item.href) ? "text-purple-600" : "text-gray-700"
              }
            >
              {item.name}
            </Link>
          ))}

          {/* DASHBOARD */}

          {session?.user && !isPending && (
            <button
              onClick={goDashboard}
              className="
font-medium
hover:text-purple-600
"
            >
              Dashboard
            </button>
          )}
        </div>

        {/* RIGHT */}

        <div
          className="
hidden
md:flex
items-center
gap-4
"
        >
          {session?.user ? (
            <>
              <div
                className="
px-3
py-1
rounded-full
bg-purple-100
text-purple-700
text-sm
font-semibold
"
              >
                Role: {roleNames[userRole] || "Loading..."}
              </div>

              <ProfileMenu handleLogout={handleLogout} />
            </>
          ) : (
            <>
              <Link href="/login">Login</Link>

              <Link
                href="/registration"
                className="
px-5
py-2
rounded-full
bg-purple-600
text-white
"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* MOBILE BUTTON */}

        <button
          onClick={() => setOpen(!open)}
          className="
md:hidden
text-3xl
"
        >
          {open ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </div>

      {/* MOBILE MENU */}

      {open && (
        <div
          className="
md:hidden
px-6
pb-5
flex
flex-col
gap-4
"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
            >
              {item.name}
            </Link>
          ))}

          {session?.user && (
            <>
              <p
                className="
text-purple-600
font-semibold
"
              >
                Role: {roleNames[userRole]}
              </p>

              <button
                onClick={goDashboard}
                className="
text-left
"
              >
                Dashboard
              </button>
            </>
          )}

          {session?.user ? (
            <button
              onClick={handleLogout}
              className="
text-red-500
text-left
"
            >
              Logout
            </button>
          ) : (
            <Link href="/login">Login</Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavbarH;
