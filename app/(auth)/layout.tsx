import type { Metadata } from "next";
import "../globals.scss";
import { Figtree } from "next/font/google";
import { Session } from "inspector/promises";
import SessionWrapper from "@/components/auth/SessionWrapper";

export const metadata: Metadata = {
  title: "Log-in",
  description: "Log into your account",
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
          <main>{children}</main>
        </body>
      </html>
    </SessionWrapper>
  );
}
