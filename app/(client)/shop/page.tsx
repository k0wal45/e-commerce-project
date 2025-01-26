import UniversalHero from "@/components/Hero/Universal/UniversalHero";
import FeaturedSection from "@/components/Listing/Slug/FeaturedSection";
import React from "react";

const page = () => {
  return (
    <main>
      <UniversalHero
        title="Shop"
        image="https://images.unsplash.com/photo-1495368427887-e88d33a44e0f?q=80&w=2053&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        position="center"
      />
      <FeaturedSection />
    </main>
  );
};

export default page;
