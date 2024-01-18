import type {Metadata} from "next";

import {Toaster} from "@/components/ui/sonner";

import "./globals.css";

export const metadata: Metadata = {
  title: "teamcy",
  description: "Generated by appncy",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className="dark  min-h-screen  bg-background px-2 font-sans antialiased">
        <header className="fade text-center text-xl font-bold leading-[4rem]">Teamcy</header>
        <main className="py-8">{children}</main>
        <Toaster />
        <footer className="text-center leading-[4rem] opacity-70">
          © {new Date().getFullYear()} teamcy
        </footer>
      </body>
    </html>
  );
}
