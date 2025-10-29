import { prisma } from "@/lib/db/prisma-client";
import { DashboardTableContent } from "./page.client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LoaderCircle } from "lucide-react";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

const TABLE_HEADERS = [
  "Name",
  "Email",
  "Instagram",
  "Phone",
  "Visa type",
  "Status",
];

const DashboardPage = async () => {
  const applications = await prisma.application.findMany({
    where: {},
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      instagram: true,
      phone: true,
      status: true,
      visa: {
        select: {
          id: true,
          type: true,
        },
      },
    },
  });

  return (
    <div className="w-full mx-auto space-y-6 pt-40 pb-10">
      <h1 className="text-2xl font-bold">Applications</h1>
      <div className="space-y-2">
        <Table className="w-full z-0">
          <TableHeader className="h-14 ssticky top-0 z-10 pb-1">
            <TableRow>
              {TABLE_HEADERS.map((header) => (
                <TableHead className="text-xs" key={header}>
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody className="overflow-y-auto">
            <Suspense
              fallback={
                <TableRow>
                  <TableCell
                    colSpan={TABLE_HEADERS.length}
                    className="text-center text-muted-foreground"
                  >
                    <LoaderCircle className="mr-2 inline-block size-4 animate-spin" />
                    Loading...
                  </TableCell>
                </TableRow>
              }
            >
              <DashboardTableContent applications={applications} />
            </Suspense>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
export default DashboardPage;
