import { getBooksApi } from "@/lib/librarian/API";
import InventoryTable from "./InventoryTable";


export default async function ManageInventoryPage() {
  const books = await getBooksApi();

  return (
    <div
      className="
      p-5
      md:p-8
      "
    >
      <div className="mb-8">
        <h1
          className="
          text-3xl
          font-bold
          "
        >
          Manage Inventory
        </h1>

        <p
          className="
          text-gray-500
          mt-2
          "
        >
          Manage your added books
        </p>
      </div>

      <InventoryTable books={books} />
    </div>
  );
}
