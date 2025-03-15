import type { Metadata } from "next";
import "../globals.scss";
import { Figtree } from "next/font/google";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import TrackVisit from "@/components/TrackVisit";
import SessionWrapper from "@/components/auth/SessionWrapper";

export const metadata: Metadata = {
  title: "House Marketplace",
  description: "House Marketplace - Find your new home now!",
};

const font = Figtree({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <html lang="en">
        <body className={font.className}>
          <Navbar />
          {children}
          <Footer />
          <TrackVisit />
        </body>
      </html>
    </SessionWrapper>
  );
}
