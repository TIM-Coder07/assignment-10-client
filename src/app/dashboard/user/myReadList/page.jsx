import { auth } from "@/lib/auth";
import { headers } from "next/headers";

import MyReadingListPage from "./MyReadList";
import { getDeliveredBooks } from "@/lib/UserAPI's/UserAPI";

const MyReadListMain = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.email) {
    return <div>User not found</div>;
  }

  const deliveredBooks = await getDeliveredBooks(session.user.email);

  console.log("deliveredBooks", deliveredBooks);

  return <MyReadingListPage deliveredBooks={deliveredBooks} />;
};

export default MyReadListMain;
