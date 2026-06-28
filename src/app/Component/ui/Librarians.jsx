import Image from "next/image";
import { Mail, Phone } from "lucide-react";

const librarians = [
  {
    id: 1,
    name: "Emily Carter",
    role: "Head Librarian",
    email: "emily@library.com",
    phone: "+1 234 567 890",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600",
  },
  {
    id: 2,
    name: "James Wilson",
    role: "Senior Librarian",
    email: "james@library.com",
    phone: "+1 234 567 891",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600",
  },
  {
    id: 3,
    name: "Sophia Brown",
    role: "Assistant Librarian",
    email: "sophia@library.com",
    phone: "+1 234 567 892",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600",
  },
  {
    id: 4,
    name: "Daniel Lee",
    role: "Digital Library Manager",
    email: "daniel@library.com",
    phone: "+1 234 567 893",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600",
  },
];

const Librarians = () => {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold">Meet Our Librarians</h2>
        <p className="mt-2 text-gray-500">
          Friendly professionals dedicated to helping you discover your next
          favorite book.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {librarians.map((librarian) => (
          <div
            key={librarian.id}
            className="overflow-hidden rounded-3xl bg-white shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl"
          >
            <div className="relative h-72 w-full">
              <Image
                src={librarian.image}
                alt={librarian.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="space-y-3 p-5">
              <div>
                <h3 className="text-xl font-bold">{librarian.name}</h3>
                <p className="text-sm text-purple-600">{librarian.role}</p>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <p className="flex items-center gap-2">
                  <Mail size={16} />
                  {librarian.email}
                </p>

                <p className="flex items-center gap-2">
                  <Phone size={16} />
                  {librarian.phone}
                </p>
              </div>

              <button className="mt-2 w-full rounded-xl bg-purple-600 py-2 font-medium text-white transition hover:bg-purple-700">
                Contact
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Librarians;