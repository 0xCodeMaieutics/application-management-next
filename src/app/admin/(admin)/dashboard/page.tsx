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
import { redirect } from "next/navigation";
import { Pagination } from "@/components/shared/pagination";

export const dynamic = "force-dynamic";

const TABLE_HEADERS = [
  "Name",
  "Email",
  "Instagram",
  "Phone",
  "Visa type",
  "Status",
];

const DEFAULT_PAGE = "1";
const DEFAULT_PAGE_SIZE = "25";
const DEFAULT_PAGES = [10, 25, 50, 100];
const getPaginationSearchParams = (searchParams: {
  [key: string]: string | string[] | undefined;
}) => {
  const currentSearchParams = new URLSearchParams(
    Object.entries(searchParams)
      .map(([key, value]) =>
        value === undefined
          ? undefined
          : Array.isArray(value)
          ? undefined
          : [key, value]
      )
      .filter((entry) => entry !== undefined)
  );

  const page = parseInt(
    typeof searchParams.page === "string" ? searchParams.page : DEFAULT_PAGE
  );
  if (isNaN(page) || page < 1) {
    currentSearchParams.set("page", DEFAULT_PAGE);
    return redirect("?" + currentSearchParams.toString());
  }

  const pageSize = parseInt(
    typeof searchParams.pageSize === "string"
      ? searchParams.pageSize
      : DEFAULT_PAGE_SIZE
  );
  if (isNaN(pageSize) || !DEFAULT_PAGES.includes(pageSize)) {
    currentSearchParams.set("pageSize", DEFAULT_PAGE_SIZE);
    return redirect("?" + currentSearchParams.toString());
  }

  return {
    pageSize,
    page,
  };
};

export default async function DashboardPage({
  searchParams: searchParamsPromise,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await searchParamsPromise;
  console.log({ searchParams });

  // const search =
  // typeof searchParams.search === "string" ? searchParams.search : undefined;
  const { page, pageSize } = getPaginationSearchParams(searchParams);

  const [totalApplications, applications] = await Promise.all([
    prisma.application.count({
      where: {},
    }),
    prisma.application.findMany({
      where: {},
      orderBy: {
        createdAt: "desc",
      },
      take: pageSize,
      skip: page,
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
    }),
  ]);

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
        <Suspense fallback={null}>
          <Pagination
            pageSize={pageSize}
            currentPage={page}
            total={totalApplications}
          />
        </Suspense>
      </div>
    </div>
  );
}
