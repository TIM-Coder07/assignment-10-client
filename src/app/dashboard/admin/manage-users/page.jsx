import { getAllUsers } from "@/lib/AdminAPI's/fetchAPI";
import AdminManageUser from "./AdminManageUser";

export default async function Page() {
  const initialUsers = await getAllUsers();

  return <AdminManageUser initialUsers={initialUsers} />;
}