import AdminManageAllBooks from "./AdminManageAllBooks";
import { getAllBooks } from "@/lib/AdminAPI's/fetchAPI";

export default async function Page() {
  const initialBooks = await getAllBooks();

  return <AdminManageAllBooks initialBooks={initialBooks} />;
}