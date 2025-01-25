'use server'
import { authOptions } from "@/constans/auth-options";
import { getServerSession } from "next-auth";

export const getUserSession = async () => {
  const session = await getServerSession(authOptions);

  return session?.user ?? null;
}
