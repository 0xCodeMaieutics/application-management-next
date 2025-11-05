import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import { ClientProviders } from "./layout.client";

export const metadata: Metadata = {
  title: "Lazary Ways",
  description: "Your gateway to international recruitment opportunities.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="">
      <body className={`flex flex-col h-dvh w-full antialiased`}>
        <ClientProviders>
          {children}
          <Toaster />
        </ClientProviders>
      </body>
    </html>
  );
}
