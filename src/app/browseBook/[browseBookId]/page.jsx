import { getBrowseBookDetailsApi } from "@/lib/browseBook/browseBookAPI";

export const dynamic = "force-dynamic";

export default async function BrowseBookDetailsPage({ params }) {
  const { id } = await params;

  console.log("DETAIL PAGE ID:", id);

  const result = await getBrowseBookDetailsApi(id);

  if (!result.success) {
    return <div className="p-10 text-center">Book not found</div>;
  }

  const book = result.book;

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
        max-w-5xl
        mx-auto
        bg-white
        rounded-3xl
        shadow
        p-6
        grid
        md:grid-cols-2
        gap-8
        "
      >
        <img
          src={book.image}
          alt={book.title}
          className="
          w-full
          h-96
          object-cover
          rounded-2xl
          "
        />

        <div>
          <h1 className="text-4xl font-bold">{book.title}</h1>

          <p className="mt-4 text-gray-600">Author: {book.author}</p>

          <p className="mt-5 text-gray-700">{book.description}</p>

          <p className="mt-5 font-semibold">
            Delivery Fee: ৳{book.deliveryFee}
          </p>
        </div>
      </div>
    </div>
  );
}
