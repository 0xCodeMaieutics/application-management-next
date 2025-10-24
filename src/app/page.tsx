import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-full flex flex-col justify-center items-center space-y-10">
      <h1 className="text-muted-foreground">
        Please select the type of visa application you want to fill out:
      </h1>
      <div className="w-full flex flex-col items-center justify-center md:flex-row gap-2">
        <Button className="w-full sm:w-52" size={"lg"} asChild>
          <Link href={"/applications/student-visa"}>Student Visa</Link>
        </Button>
        <Button className="w-full sm:w-52" size={"lg"} asChild>
          <Link href={"/applications/kkb"}>KKB Visa</Link>
        </Button>
      </div>
    </div>
  );
}
