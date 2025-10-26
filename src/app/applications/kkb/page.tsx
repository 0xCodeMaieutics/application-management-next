import { ApplicationForm } from "@/components/forms/application-form/application-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { VisaTypeEnum } from "@/utils/models/visa";

const KKBPage = async ({
  searchParams,
}: {
  // searchParams
  searchParams: Promise<{ visa_duration_in_months?: string | string[] }>;
}) => {
  const { visa_duration_in_months } = await searchParams;

  return (
    <div className="w-full h-dvh">
      <div className="w-full mx-auto max-w-2xl space-y-6 pt-32 pb-10">
        <Button variant={"ghost"} className="flex max-w-max" asChild>
          <Link href={"/"}>
            <ArrowLeft className="mr-2" />
            Back
          </Link>
        </Button>
        <ApplicationForm
          visaType={
            {
              "3": VisaTypeEnum.KKB_3_MONTHS,
              "8": VisaTypeEnum.KKB_8_MONTHS,
            }[visa_duration_in_months as string] || VisaTypeEnum.KKB_8_MONTHS
          }
        />
      </div>
    </div>
  );
};

export default KKBPage;
