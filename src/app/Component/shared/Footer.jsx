import Link from "next/link";
import {
  FaFacebookF,
  FaGithub,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="mt-20 bg-slate-900 text-gray-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-2 lg:grid-cols-4">
        {/* Logo & About */}
        <div>
          <h2 className="text-3xl font-bold text-white">
            Book<span className="text-purple-500">Nest</span>
          </h2>

          <p className="mt-4 leading-7 text-gray-400">
            Discover thousands of books, connect with trusted librarians, and
            enjoy a seamless online library experience.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="mb-4 text-xl font-semibold text-white">
            Quick Links
          </h3>

          <ul className="space-y-3">
            <li>
              <Link href="/" className="transition hover:text-purple-400">
                Home
              </Link>
            </li>

            <li>
              <Link
                href="/browseBook"
                className="transition hover:text-purple-400"
              >
                Browse Books
              </Link>
            </li>

            <li>
              <Link href="/about" className="transition hover:text-purple-400">
                About Us
              </Link>
            </li>

            <li>
              <Link
                href="/contact"
                className="transition hover:text-purple-400"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="mb-4 text-xl font-semibold text-white">
            Contact
          </h3>

          <div className="space-y-3">
            <p>Email: support@bookverse.com</p>
            <p>Phone: +880 1234-567890</p>
            <p>Dhaka, Bangladesh</p>
          </div>
        </div>

        {/* Social */}
        <div>
          <h3 className="mb-4 text-xl font-semibold text-white">
            Follow Us
          </h3>

          <div className="flex gap-4">
            <Link
              href="#"
              className="rounded-full bg-slate-800 p-3 transition hover:bg-purple-600 hover:text-white"
            >
              <FaFacebookF size={18} />
            </Link>

            <Link
              href="#"
              className="rounded-full bg-slate-800 p-3 transition hover:bg-purple-600 hover:text-white"
            >
              <FaInstagram size={18} />
            </Link>

            <Link
              href="#"
              className="rounded-full bg-slate-800 p-3 transition hover:bg-purple-600 hover:text-white"
            >
              <FaLinkedinIn size={18} />
            </Link>

            <Link
              href="#"
              className="rounded-full bg-slate-800 p-3 transition hover:bg-purple-600 hover:text-white"
            >
              <FaGithub size={18} />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-slate-800 py-5 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} BookVerse. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;