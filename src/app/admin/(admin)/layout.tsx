import { prisma } from "@/lib/db/prisma-client";
import { verifyToken } from "@/lib/token";
import { ADMIN_SESSION_COOKIE } from "@/utils/constants";
import { UserRole } from "@/utils/models/user";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

export default async function Layout({ children }: PropsWithChildren) {
  const c = await cookies();
  const tokenSession = c.get(ADMIN_SESSION_COOKIE);

  if (tokenSession?.value === undefined) redirect("/admin/login");

  const session = await prisma.session.findUnique({
    where: {
      token: tokenSession.value,
    },
  });
  if (!session) {
    redirect("/admin/login");
  }
  const currentDate = new Date();
  if (session.expiresAt && session.expiresAt < currentDate) {
    redirect("/admin/login");
  }

  const tokenPayload = await verifyToken(tokenSession.value);
  if (tokenPayload.payload.userRole !== UserRole.ADMIN)
    redirect("/admin/login");

  const user = await prisma.user.findUnique({
    where: {
      id: tokenPayload.payload.userId,
    },
  });
  if (!user) redirect("/admin/login");
  if (tokenPayload.payload.userEmail !== user?.email) redirect("/admin/login");
  if (user?.role !== UserRole.ADMIN) redirect("/admin/login");

  return (
    <div className="w-full h-full mx-auto max-w-6xl px-4 md:px-0">
      {children}
    </div>
  );
}
