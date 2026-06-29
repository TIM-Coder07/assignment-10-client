import ShowComments from "@/app/Component/shared/ShowComments";
import DeliveryButton from "@/app/Component/ui/DeliveryButton";
import ReviewForm from "@/app/Component/ui/ReviewsForm";
import { auth } from "@/lib/auth";
import { getBrowseBookDetailsApi } from "@/lib/browseBook/browseBookAPI";
import { Button } from "@heroui/react";

import { BookOpen, Heart } from "lucide-react";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

export default async function BrowseBookDetailsPage({ params }) {
  const tokenData = await auth.api.getToken({
    headers: await headers(),
  });

  const token = tokenData?.token;

  const { browseBookId } = await params;

  const result = await getBrowseBookDetailsApi(browseBookId, token);

  if (!result.success) {
    return <div className="p-10 text-center text-xl">Book not found</div>;
  }

  const book = result.book;
  const user = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <main
      className="
      min-h-screen
      bg-linear-to-br
      from-slate-100
      via-white
      to-indigo-100
      p-5
      md:p-12
      "
    >
      <div
        className="
        max-w-6xl
        mx-auto
        bg-white/80
        backdrop-blur-xl
        rounded-[32px]
        shadow-2xl
        border
        p-6
        md:p-10
        grid
        md:grid-cols-2
        gap-10
        "
      >
        {/* Image */}

        <div className="relative">
          <img
            src={book.image}
            alt={book.title}
            className="
            w-full
            h-[450px]
            object-cover
            rounded-3xl
            shadow-lg
            "
          />

          <span
            className="
            absolute
            top-5
            left-5
            bg-green-500
            text-white
            px-4
            py-2
            rounded-full
            text-sm
            font-semibold
            "
          >
            Available
          </span>
        </div>

        {/* Details */}

        <div
          className="
          flex
          flex-col
          justify-center
          "
        >
          <div
            className="
            flex
            items-center
            gap-2
            text-indigo-600
            mb-3
            "
          >
            <BookOpen size={22} />

            <span className="font-semibold">Online Library</span>
          </div>

          <h1
            className="
            text-4xl
            md:text-5xl
            font-bold
            text-slate-900
            "
          >
            {book.title}
          </h1>

          <p
            className="
            mt-4
            text-lg
            text-gray-500
            "
          >
            By
            <span
              className="
              font-semibold
              text-gray-700
              "
            >
              {" "}
              {book.author}
            </span>
          </p>

          <p
            className="
            mt-6
            text-gray-600
            leading-relaxed
            "
          >
            {book.description}
          </p>

          <div
            className="
            grid
            grid-cols-2
            gap-4
            mt-8
            "
          >
            <div
              className="
              bg-indigo-50
              rounded-2xl
              p-4
              "
            >
              <p className="text-sm text-gray-500">Delivery Fee</p>

              <h3
                className="
                text-2xl
                font-bold
                text-indigo-700
                "
              >
                ৳{book.deliveryFee}
              </h3>
            </div>

            <div
              className="
              bg-green-50
              rounded-2xl
              p-4
              "
            >
              <p className="text-sm text-gray-500">Status</p>

              <h3
                className="
                text-xl
                font-bold
                text-green-700
                "
              >
                Available
              </h3>
            </div>
          </div>

          <div
            className="
            flex
            gap-4
            mt-8
            flex-wrap
            "
          >
            <DeliveryButton book={book} />

            <Button
              variant="bordered"
              className="
              h-12
              px-6
              rounded-xl
              border-indigo-300
              "
            >
              <Heart size={18} className="mr-2" />
              Wishlist
            </Button>
          </div>
        </div>
      </div>
      <div>
        <ShowComments user={user?.user} bookId={book._id}></ShowComments>
      </div>
      <div className="mt-5">
        <ReviewForm book={book} user={user.user}></ReviewForm>
      </div>
    </main>
  );
}
