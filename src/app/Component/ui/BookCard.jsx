import Image from "next/image";
import Link from "next/link";
import { Badge, Button, Card, CardBody, CardFooter } from "@heroui/react";
import { Star, Truck } from "lucide-react";

const BookCard = ({ book }) => {
  return (
    <Card className="w-full overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">
      <div className="relative h-72 w-full">
        <Image
          src={book.coverImage}
          alt={book.title}
          fill
          className="object-cover"
        />
      </div>

      <CardBody className="space-y-3">
        <div className="flex items-center justify-between">
          <Badge color="primary" variant="flat">
            {book.category}
          </Badge>

          <div className="flex items-center gap-1 text-yellow-500">
            <Star size={16} fill="currentColor" />
            <span className="text-sm font-medium">
              {book.rating || 0}
            </span>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold line-clamp-1">
            {book.title}
          </h2>

          <p className="text-sm text-default-500">
            By {book.author}
          </p>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-1">
            <Truck size={16} />
            ৳ {book.deliveryFee}
          </span>

          <Badge
            color={book.available ? "success" : "danger"}
            variant="flat"
          >
            {book.available ? "Available" : "Unavailable"}
          </Badge>
        </div>
      </CardBody>

      <CardFooter>
        <Button
          as={Link}
          href={`/browseBook/${book._id}`}
          color="primary"
          className="w-full"
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BookCard;