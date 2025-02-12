import React from "react";
import LatestListing from "@/components/Listing/LatestListing";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main style={{ marginTop: "6rem" }}>
      {children}
      {/* <LatestListing /> */}
    </main>
  );
};

export default layout;
