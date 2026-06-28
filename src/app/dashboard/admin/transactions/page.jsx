import AdminTransactions from "./AdminTransactions";
import { getAllTransactions } from "@/lib/AdminAPI's/fetchAPI";

export default async function Page() {
  const transactions = await getAllTransactions();

  return <AdminTransactions initialTransactions={transactions} />;
}