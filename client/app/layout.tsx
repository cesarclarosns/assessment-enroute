import Providers from "@/components/providers";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "@/components/header-site";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ohm Value Calculator",
  description: "Ohm Value Calculator",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <NavBar></NavBar>
          {children}
          <Toaster></Toaster>
        </Providers>
      </body>
    </html>
  );
}
