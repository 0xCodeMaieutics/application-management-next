import { $Enums } from "@prisma/client";

export type VisaTypeEnum = $Enums.VisaType;

export const VisaTypeEnum = {
  STUDENT: $Enums.VisaType.STUDENT,
  KKB_3_MONTHS: $Enums.VisaType.KKB_3_MONTHS,
  KKB_8_MONTHS: $Enums.VisaType.KKB_8_MONTHS,
};

export const visaTypeToLabelMap: Record<VisaTypeEnum, string> = {
  [VisaTypeEnum.STUDENT]: "Student Visa",
  [VisaTypeEnum.KKB_3_MONTHS]: "KKB Visa (3 Months)",
  [VisaTypeEnum.KKB_8_MONTHS]: "KKB Visa (8 Months)",
};
