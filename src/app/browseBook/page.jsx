import { getBooksApi } from "@/lib/librarian/API";

export default async function BrowseBookPage() {
  const books = await getBooksApi();

  const publishedBooks = books.filter((book) => book.status === "Published");

  return (
    <div
      className="
      min-h-screen
      bg-gray-50
      p-5
      md:p-10
      "
    >
      <div
        className="
        max-w-7xl
        mx-auto
        "
      >
        <div className="mb-8">
          <h1
            className="
            text-3xl
            font-bold
            "
          >
            Browse Books
          </h1>

          <p
            className="
            text-gray-500
            mt-2
            "
          >
            Explore all published books
          </p>
        </div>

        {publishedBooks.length === 0 ? (
          <div
            className="
              bg-white
              rounded-2xl
              p-10
              text-center
              shadow
              "
          >
            <h2
              className="
                text-xl
                font-semibold
                "
            >
              No books available
            </h2>
          </div>
        ) : (
          <div
            className="
            grid
            sm:grid-cols-2
            lg:grid-cols-3
            gap-6
            "
          >
            {publishedBooks.map((book) => (
              <div
                key={book._id}
                className="
                  bg-white
                  rounded-3xl
                  overflow-hidden
                  shadow-md
                  border
                  "
              >
                <img
                  src={book.image}
                  alt={book.title}
                  className="
                    h-60
                    w-full
                    object-cover
                    "
                />

                <div
                  className="
                    p-5
                    "
                >
                  <h2
                    className="
                      text-xl
                      font-bold
                      "
                  >
                    {book.title}
                  </h2>

                  <p
                    className="
                      text-gray-600
                      mt-2
                      "
                  >
                    Author: {book.author}
                  </p>

                  <p
                    className="
                      text-purple-600
                      mt-1
                      "
                  >
                    {book.category}
                  </p>

                  <p
                    className="
                      text-sm
                      text-gray-500
                      mt-2
                      "
                  >
                    Delivery Fee: ৳{book.deliveryFee}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
