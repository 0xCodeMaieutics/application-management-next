import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

export default async function ApplicationLayout({
  children,
}: PropsWithChildren) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.session) redirect("/login");

  return children;
}
