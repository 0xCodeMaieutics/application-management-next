import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { PropsWithChildren } from "react";

const Underline = () => (
  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-current opacity-0 group-hover:opacity-100 transition-opacity duration-150 ease-in-out" />
);

const WHATSAPP_NUMBER = "+4917681376567";
const TEXT =
  "Hey, I found your contact on your website and would like to get in touch with you.";

const WhatsappLink = ({ children }: PropsWithChildren) => (
  <a
    href={`https://api.whatsapp.com/send/?phone=${WHATSAPP_NUMBER}&text=${TEXT}&type=phone_number&app_absent=0`}
    target="_blank"
    rel="noopener noreferrer"
    className="relative group font-semibold transition duration-300 ease-in-out"
  >
    {children}
    <Underline />
  </a>
);

const APP_NAME = "Lazari Ways";
const APP_TAGLINE = "Connecting Talent with the World.";

const TextLogo = () => {
  return (
    <div className="relative group text-primary text-2xl font-bold">
      {APP_NAME}
      <Underline />
    </div>
  );
};

export const Header = () => (
  <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background/50 backdrop-blur-sm px-6 py-8">
    <nav className="flex justify-between w-full mx-auto max-w-6xl">
      {/* <Image src="/logo.png" width={200} height={1081.06} alt="Logo" /> */}
      <TextLogo />
      <div className="hidden sm:block">
        <WhatsappLink>Whatsapp</WhatsappLink>
        {/* <Image src={"/whatsapp2.png"} width={32} height={32} alt="Whatsapp" /> */}
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <button className="sm:hidden p-2">
            <Menu size={24} />
          </button>
        </SheetTrigger>
        <SheetContent className="p-2">
          <SheetHeader>
            <SheetTitle>{APP_NAME}</SheetTitle>
            <SheetDescription>{APP_TAGLINE}</SheetDescription>
          </SheetHeader>
          <div className="mt-6 space-y-4">
            <WhatsappLink>Whatsapp</WhatsappLink>
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  </header>
);
