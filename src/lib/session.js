import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const getUserToken = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  console.log('session', session);
  

  return session?.token;
};

export const authHeader = async () => {
  const token = await getUserToken();

  return token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : {};
};