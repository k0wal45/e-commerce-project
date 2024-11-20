import FeaturedSection from "@/components/Featured/FeaturedSection";
import Hero from "@/components/Hero/Hero";
import OffersSection from "@/components/Offers/OffersSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedSection />
      <OffersSection />
      <div className="placeholder"></div>
    </main>
  );
}
