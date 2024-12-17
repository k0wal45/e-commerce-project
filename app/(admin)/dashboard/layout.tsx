import type { Metadata } from "next";
import "../../globals.scss";
import { Figtree } from "next/font/google";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Add listings, analize data and more",
};

const font = Figtree({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  );
}
