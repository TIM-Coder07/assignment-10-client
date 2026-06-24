"use client";

import { useState } from "react";

import {
  Form,
  Input,
  TextArea,
  Button,
  Label,
  TextField,
  Select,
  ListBox,
} from "@heroui/react";

import toast from "react-hot-toast";

import { Loader2, Upload, BookPlus, ImageIcon } from "lucide-react";
import { addBookApi } from "@/lib/librarian/API";
import { authClient } from "@/lib/auth-client";

export default function AddBookPage() {
  const [loading, setLoading] = useState(false);

  const [image, setImage] = useState(null);

  const [category, setCategory] = useState("Fiction");

  const categories = [
    "Fiction",
    "Sci-Fi",
    "Academic",
    "Programming",
    "Biography",
    "History",
  ];

  // =========================
  // Upload Image To imgBB
  // =========================

  const uploadImage = async () => {
    const formData = new FormData();

    formData.append("image", image);

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`,
      {
        method: "POST",

        body: formData,
      },
    );

    const data = await res.json();

    return data.data.url;
  };

  // =========================
  // Submit Book
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      toast.error("Please select a book cover image");
      return;
    }

    setLoading(true);

    try {
      const { data: session } = await authClient.getSession();

      if (!session?.user) {
        toast.error("Please login first");
        return;
      }

      // Image Upload
      const imageUrl = await uploadImage();

      const form = e.target;

      const bookData = {
        title: form.title.value,
        author: form.author.value,
        description: form.description.value,
        deliveryFee: Number(form.deliveryFee.value),

        category,
        image: imageUrl,

        librarianId: session.user.id,
        librarianName: session.user.name,
        librarianEmail: session.user.email,

        status: "Pending Approval",

        createdAt: new Date(),
      };

      console.log("BOOK DATA:", bookData);

      const result = await addBookApi(bookData);

      if (result.insertedId) {
        toast.success("Book submitted for approval");

        form.reset();

        setImage(null);
        setCategory("Fiction");
      } else {
        toast.error("Failed to add book");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
min-h-screen
bg-gradient-to-br
from-slate-100
via-white
to-purple-100
p-5
md:p-10
"
    >
      <div
        className="
max-w-xl
w-full
mx-auto
"
      >
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div
              className="
p-3
rounded-2xl
bg-purple-600
text-white
"
            >
              <BookPlus size={28} />
            </div>

            <div>
              <h1
                className="
text-3xl
font-bold
"
              >
                Add New Book
              </h1>

              <p className="text-gray-500">Submit book for admin approval</p>
            </div>
          </div>
        </div>

        <div
          className="
rounded-3xl
bg-white
shadow-xl
border
p-6
"
        >
          <Form
            onSubmit={handleSubmit}
            className="
flex
flex-col
gap-6
"
          >
            <TextField name="title" isRequired>
              <Label>Book Title</Label>

              <Input placeholder="Atomic Habits" />
            </TextField>

            <TextField name="author" isRequired>
              <Label>Author</Label>

              <Input placeholder="James Clear" />
            </TextField>

            <TextField name="description" isRequired>
              <Label>Description</Label>

              <TextArea
                placeholder="Write book description"
                className="min-h-32"
              />
            </TextField>

            <TextField name="deliveryFee" isRequired>
              <Label>Delivery Fee</Label>

              <Input type="number" placeholder="100" />
            </TextField>

            <Select
              selectedKey={category}
              onSelectionChange={(key) => setCategory(String(key))}
            >
              <Label>Category</Label>

              <Select.Trigger>
                <Select.Value />

                <Select.Indicator />
              </Select.Trigger>

              <Select.Popover>
                <ListBox>
                  {categories.map((item) => (
                    <ListBox.Item key={item} id={item}>
                      {item}
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>

            <div>
              <Label>Book Cover Image</Label>

              <label
                className="
mt-3
flex
flex-col
items-center
justify-center
h-40
border-2
border-dashed
rounded-2xl
cursor-pointer
hover:bg-purple-50
"
              >
                <ImageIcon size={35} className="text-purple-500" />

                <p className="text-sm text-gray-500">
                  {image ? image.name : "Click upload image"}
                </p>

                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </label>
            </div>

            <Button
              type="submit"
              isDisabled={loading}
              className="
h-12
rounded-xl
bg-purple-600
text-white
"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin mr-2" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="mr-2" />
                  Add Book
                </>
              )}
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}
