"use client";

import { useState } from "react";

import {
  Button,
  Input,
  Label,
  Modal,
  TextField,
  TextArea,
  Select,
  ListBox,
} from "@heroui/react";

import { Edit } from "lucide-react";

import toast from "react-hot-toast";
import { editBookApi } from "@/lib/librarian/API";

const categories = [
  "Fiction",
  "Sci-Fi",
  "Academic",
  "Programming",
  "Biography",
  "History",
];

export function EditModal({ book, setBooks }) {
  const [category, setCategory] = useState(book.category);

  const [isOpen, setIsOpen] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const updatedBook = {
      title: formData.get("title"),

      author: formData.get("author"),

      description: formData.get("description"),

      deliveryFee: Number(formData.get("deliveryFee")),

      category,
    };

    try {
      const result = await editBookApi(book._id, updatedBook);

      if (result.success) {
        setBooks((prev) =>
          prev.map((item) =>
            item._id === book._id
              ? {
                  ...item,
                  ...updatedBook,
                }
              : item,
          ),
        );

        toast.success("Book updated");

        // modal close
        setIsOpen(false);

        // form refresh
        e.currentTarget.reset();
      }
    } catch (error) {
      console.log(error);

      toast.error("Update failed");
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
      <Button
        onPress={() => setIsOpen(true)}
        className="
        p-2
        rounded-lg
        bg-blue-100
        text-blue-600
        "
      >
        <Edit size={18} />
      </Button>

      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-lg">
            <Modal.CloseTrigger />

            <Modal.Header>
              <Modal.Heading>Edit Book</Modal.Heading>
            </Modal.Header>

            <Modal.Body>
              <form
                onSubmit={handleUpdate}
                className="
                flex
                flex-col
                gap-5
                "
              >
                <TextField name="title" defaultValue={book.title}>
                  <Label>Book Title</Label>

                  <Input />
                </TextField>

                <TextField name="author" defaultValue={book.author}>
                  <Label>Author</Label>

                  <Input />
                </TextField>

                <TextField name="description" defaultValue={book.description}>
                  <Label>Description</Label>

                  <TextArea />
                </TextField>

                <TextField name="deliveryFee" defaultValue={book.deliveryFee}>
                  <Label>Delivery Fee</Label>

                  <Input type="number" />
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

                <Button type="submit">Update Book</Button>
              </form>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
