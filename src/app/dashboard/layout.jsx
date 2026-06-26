import Providers from "@/Providers/Provider";
import UserSideBar from "../Component/Navbar/UserSideBar";

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen">
      <UserSideBar />

      <div className="flex-1">
        <Providers>{children}</Providers>
      </div>
    </div>
  );
}