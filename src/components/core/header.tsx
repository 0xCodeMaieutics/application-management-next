"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

import { ExternalLink } from "lucide-react";
import { Button } from "../ui/button";
import { TextLogo, Underline } from "./text-logo";
import {
  WHATSAPP_URL,
  WHATSAPP_TEXT,
  WHATSAPP_NUMBER,
  APP_NAME,
} from "@/utils/constants";
import { scrollSmoothlyToSection, SECTION_IDS } from "@/utils/landing-page";

const APP_TAGLINE = "Connecting Talent with the World.";

const NAV_LINKS = [
  {
    href: SECTION_IDS.aboutUs,
    label: "About",
  },
  {
    href: SECTION_IDS.contact,
    label: "Contact",
  },
];

export const Header = () => (
  <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background px-6 py-6">
    <div className="flex justify-between w-full mx-auto max-w-6xl">
      {/* <Image src="/logo.png" width={200} height={1081.06} alt="Logo" /> */}
      <TextLogo>{APP_NAME}</TextLogo>

      <div className="flex items-center gap-4">
        <nav className="hidden sm:flex items-center gap-4">
          {NAV_LINKS.map((link) => (
            <Button
              className="relative font-semibold group hover:no-underline text-lg"
              variant={"link"}
              key={link.href}
              onClick={() => {
                scrollSmoothlyToSection(link.href);
              }}
            >
              {link.label}
              <Underline />
            </Button>
          ))}
        </nav>
        <div className="hidden sm:block">
          <Button
            variant={"link"}
            asChild
            className="font-semibold text-lg relative group inline-flex items-center gap-1 hover:no-underline"
          >
            <a
              href={`${WHATSAPP_URL}/send/?phone=${WHATSAPP_NUMBER}&text=${WHATSAPP_TEXT}&type=phone_number&app_absent=0`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Whatsapp
              <ExternalLink
                className="ml-1 size-4 opacity-70 group-hover:opacity-100 transition-opacity"
                aria-label="External link"
              />
              <Underline />
            </a>
          </Button>
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
              {/* <WhatsappLink>Whatsapp</WhatsappLink> */}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  </header>
);
