
export const dynamic = "force-dynamic";

import { Eye, BookOpen } from "lucide-react";
import { getBooksApi } from "@/lib/librarian/API";
import Link from "next/link";
import BookFilters from "../Component/ui/BookFilters";

export default async function BrowseBookPage({ searchParams }) {
  const params = await searchParams;

  const search = params.search || "";
  const category = params.category || "";
  const availability = params.availability || "";
  const deliveryFee = params.deliveryFee || "";

  const books = await getBooksApi({
    search,
    category,
    availability,
    deliveryFee,
  });

  const publishedBooks = books.filter(
    (book) => book.status === "Published"
  );

  return (
    <main className="min-h-screen bg-[#f8fafc]">
      <div className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-14">

        {/* Page Header */}
        <section className="mb-10">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-violet-700">
            <BookOpen size={17} />
            <span>BOOK COLLECTION</span>
          </div>

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                Browse Books
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500 md:text-base">
                Explore our collection of books and discover your next
                favorite read.
              </p>
            </div>

            <p className="text-sm font-medium text-slate-500">
              Explore our published collection
            </p>
          </div>
        </section>

        {/* Filter Section */}
        <section className="mb-10 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
          <div className="mb-5">
            <h2 className="text-base font-bold text-slate-900">
              Find Your Book
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Search and filter by category, availability, and delivery fee.
            </p>
          </div>

          <BookFilters
            className="my-6"
            search={search}
            category={category}
            availability={availability}
            deliveryFee={deliveryFee}
          />
        </section>

        {/* Collection Heading */}
        <section>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold text-slate-900 md:text-2xl">
                Available Books
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Browse our latest published books.
              </p>
            </div>

            <span className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-600">
              {publishedBooks.length} Books
            </span>
          </div>

          {/* Empty State */}
          {publishedBooks.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white px-6 py-20 text-center shadow-sm">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
                <BookOpen size={30} />
              </div>

              <h3 className="mt-5 text-xl font-bold text-slate-900">
                No books available
              </h3>

              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
                We couldn't find any books matching your filters.
                Try adjusting your search criteria.
              </p>
            </div>
          ) : (

            /* Book Grid */
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

              {publishedBooks.map((book) => (
                <article
                  key={book._id}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg hover:shadow-slate-200/60"
                >

                  {/* Book Image */}
                  <div className="relative h-64 overflow-hidden bg-slate-100">
                    <img
                      src={book.image}
                      alt={book.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    <span className="absolute left-4 top-4 rounded-lg border border-white/70 bg-white/95 px-3 py-1.5 text-xs font-semibold text-violet-700 shadow-sm">
                      {book.category}
                    </span>
                  </div>

                  {/* Book Information */}
                  <div className="p-5">

                    <h3 className="line-clamp-2 min-h-[3.5rem] text-lg font-bold leading-snug text-slate-900 transition-colors group-hover:text-violet-700">
                      {book.title}
                    </h3>

                    <p className="mt-2 text-sm text-slate-500">
                      By{" "}
                      <span className="font-medium text-slate-700">
                        {book.author}
                      </span>
                    </p>

                    {/* Divider */}
                    <div className="my-5 border-t border-slate-100" />

                    {/* Delivery Fee */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500">
                        Delivery Fee
                      </span>

                      <span className="text-lg font-bold text-slate-900">
                        ৳{book.deliveryFee}
                      </span>
                    </div>

                    {/* Details Button */}
                    <Link
                      href={`/browseBook/${book._id}`}
                      className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-violet-700 px-4 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-violet-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
                    >
                      <Eye size={17} />
                      View Details
                    </Link>

                  </div>
                </article>
              ))}

            </div>
          )}
        </section>
      </div>
    </main>
  );
}
