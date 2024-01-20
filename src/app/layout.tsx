import type {Metadata} from "next";

import {Toaster} from "@/components/ui/sonner";

import "./globals.css";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Teamcy - generador de equipos",
  description: "App para organizar equipos en base a su nivel, veni a jugar furvo los sabados.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className="dark  min-h-screen  overflow-x-hidden bg-background px-2 font-sans  antialiased ">
        <header className="fade text-center text-xl font-bold leading-[4rem]">Teamcy</header>
        <main className="py-8">{children}</main>
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
