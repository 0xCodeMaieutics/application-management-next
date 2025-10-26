import { $Enums } from "@prisma/client";

export type VisaTypeEnum = $Enums.VisaType;

export const VisaTypeEnum = {
  STUDENT: $Enums.VisaType.STUDENT,
  KKB_3_MONTHS: $Enums.VisaType.KKB_3_MONTHS,
  KKB_8_MONTHS: $Enums.VisaType.KKB_8_MONTHS,
};
