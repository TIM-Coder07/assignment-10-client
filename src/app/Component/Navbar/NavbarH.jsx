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

  const { data: session } = authClient.useSession();

  const userRole = session?.user?.role;

  const navItems = [
    {
      name: "Home",
      href: "/",
    },

    {
      name: "Browse Books",
      href: "/books",
    },
  ];

  // Role Based Dashboard Route

  const dashboardRoute = () => {
    if (userRole === "librarian") {
      return "/dashboard/librarian";
    }

    if (userRole === "admin") {
      return "/dashboard/admin";
    }

    return "/dashboard/user";
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
border-white/10
bg-white/70
dark:bg-gray-900/70
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
items-center
justify-between
"
      >
        {/* Logo */}

        <Link href="/">
          <h1
            className="
text-2xl
font-extrabold
bg-gradient-to-r
from-purple-600
to-indigo-600
bg-clip-text
text-transparent
"
          >
            BookNest
          </h1>
        </Link>

        {/* Desktop Menu */}

        <div
          className="
hidden
md:flex
items-center
gap-7
"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`
text-sm
font-medium
transition

${
  isActive(item.href)
    ? "text-purple-600"
    : "text-gray-700 dark:text-gray-300 hover:text-purple-600"
}

`}
            >
              {item.name}
            </Link>
          ))}

          {/* Dashboard */}

          {session?.user && (
            <button
              onClick={() => router.push(dashboardRoute())}
              className="
text-sm
font-medium
text-gray-700
dark:text-gray-300
hover:text-purple-600
"
            >
              Dashboard
            </button>
          )}
        </div>

        {/* Desktop Right */}

        <div
          className="
hidden
md:flex
items-center
gap-4
"
        >
          {session?.user ? (
            <ProfileMenu handleLogout={handleLogout} />
          ) : (
            <>
              <Link
                href="/login"
                className="
text-sm
hover:text-purple-600
"
              >
                Login
              </Link>

              <Link
                href="/registration"
                className="
px-5
py-2
rounded-full
bg-gradient-to-r
from-purple-600
to-indigo-600
text-white
text-sm
"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Button */}

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

      {/* Mobile Menu */}

      {open && (
        <div
          className="
md:hidden
px-6
pb-5
flex
flex-col
gap-4
bg-white
dark:bg-gray-900
"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="
text-sm
font-medium
"
            >
              {item.name}
            </Link>
          ))}

          {session?.user && (
            <Link
              href={dashboardRoute()}
              onClick={() => setOpen(false)}
              className="
font-semibold
text-purple-600
"
            >
              Dashboard
            </Link>
          )}

          {session?.user ? (
            <button
              onClick={handleLogout}
              className="
text-left
text-red-500
"
            >
              Logout
            </button>
          ) : (
            <>
              <Link href="/login">Login</Link>

              <Link href="/registration">Sign Up</Link>
            </>
          )}

          <ThemeToggle />
        </div>
      )}
    </nav>
  );
};

export default NavbarH;
