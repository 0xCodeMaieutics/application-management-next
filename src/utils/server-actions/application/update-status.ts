"use server";

import { prisma } from "@/lib/db/prisma-client";
import { ApplicationStatus } from "@/utils/models/applications/applications";

export async function updateApplicationStatus(
  applicationId: string,
  status: ApplicationStatus
) {
  try {
    await prisma.application.update({
      where: { id: applicationId },
      data: { status },
    });
    return { success: true };
  } catch (error) {
    console.error("Error updating application status:", error);
    return { success: false, error: "Failed to update status" };
  }
}
