import FeaturedSection from "@/components/Featured/FeaturedSection";
import Hero from "@/components/Hero/Hero";
import LatestListing from "@/components/Listing/LatestListing";
import OffersSection from "@/components/Offers/OffersSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedSection />
      <OffersSection />
      <LatestListing />
      <div className="placeholder"></div>
    </main>
  );
}
