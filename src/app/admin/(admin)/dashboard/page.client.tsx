"use client";
import { StatusSelect } from "@/components/ui/status-select";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  Application,
  ApplicationStatus,
} from "@/utils/models/applications/applications";
import { visaTypeToLabelMap } from "@/utils/models/visa";
import { VisaType } from "@prisma/client";
import { useRouter } from "next/navigation";

export const DashboardTableContent = ({
  applications,
}: {
  applications: Application[];
}) => {
  const router = useRouter();
  return applications.map((application) => (
    <TableRow
      onClick={() => {
        router.push(`/admin/dashboard/${application.id}`);
      }}
      key={application.id}
      className="h-14 cursor-pointer"
    >
      <TableCell className="font-semibold">
        {application.firstName} {application.lastName}
      </TableCell>
      <TableCell className="font-semibold">{application.email}</TableCell>
      <TableCell className="font-semibold">
        {application.instagram || "-"}
      </TableCell>
      <TableCell className="font-semibold">{application.phone}</TableCell>
      <TableCell className="font-semibold">
        {visaTypeToLabelMap[application.visa?.type as VisaType] || "-"}
      </TableCell>
      <TableCell onClick={(e) => e.stopPropagation()}>
        <StatusSelect
          applicationId={application.id}
          currentStatus={application.status || ApplicationStatus.PENDING}
        />
      </TableCell>
    </TableRow>
  ));
};
