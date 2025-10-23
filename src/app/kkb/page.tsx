import { ApplicationForm } from "@/components/forms/application-form/application-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const KKBPage = () => {
  return (
    <div className="w-full h-dvh">
      <div className="w-full mx-auto max-w-2xl space-y-6 py-10">
        <Button variant={"ghost"} className="flex max-w-max" asChild>
          <Link href={"/"}>
            <ArrowLeft className="mr-2" />
            Back
          </Link>
        </Button>
        <ApplicationForm />
      </div>
    </div>
  );
};

export default KKBPage;
