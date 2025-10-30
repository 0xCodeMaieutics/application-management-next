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
import { Prisma } from "@prisma/client";
import { SearchInput } from "./search-input";

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

const getPaginationSearchParams = (searchParams: URLSearchParams) => {
  const page = parseInt(searchParams.get("page") ?? "1");
  if (isNaN(page) || page < 1) {
    searchParams.set("page", DEFAULT_PAGE);
    return redirect("?" + searchParams.toString());
  }

  const pageSize = parseInt(searchParams.get("pageSize") ?? "1");
  if (isNaN(pageSize) || !DEFAULT_PAGES.includes(pageSize)) {
    searchParams.set("pageSize", DEFAULT_PAGE_SIZE);
    return redirect("?" + searchParams.toString());
  }

  return {
    pageSize,
    page,
  };
};

const buildApplicationSearchWhereClause = (search?: string) => {
  if (search === undefined || search.trim() === "") {
    return {};
  }
  return {
    OR: [
      {
        firstName: {
          startsWith: search,
          mode: "insensitive",
        },
      },
      {
        lastName: {
          startsWith: search,
          mode: "insensitive",
        },
      },
      {
        email: {
          startsWith: search,
          mode: "insensitive",
        },
      },
      {
        instagram: {
          startsWith: search,
          mode: "insensitive",
        },
      },
    ],
  } as Prisma.ApplicationWhereInput;
};

export default async function DashboardPage({
  searchParams: searchParamsPromise,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await searchParamsPromise;
  const search =
    typeof searchParams.search === "string" ? searchParams.search : undefined;

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

  const { page, pageSize } = getPaginationSearchParams(currentSearchParams);

  const where = buildApplicationSearchWhereClause(search);

  const skip = (page - 1) * pageSize;
  const [totalApplications, applications] = await Promise.all([
    prisma.application.count({
      where,
    }),
    prisma.application.findMany({
      where,
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
      take: pageSize,
      skip,
      orderBy: {
        createdAt: "asc",
      },
    }),
  ]);
  console.log({ page, pageSize, skip, search, applications });
  console.log({ totalApplications, skip, take: pageSize });
  return (
    <div className="w-full mx-auto space-y-6 pt-40 pb-10">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Applications</h1>
        <div>
          <SearchInput defaultValue={search} />
        </div>
      </div>
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
              <DashboardTableContent
                applications={applications}
                currentPage={page}
                pageSize={pageSize}
                totalApplications={totalApplications}
              />
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
