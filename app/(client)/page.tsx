import ContactPanel from "@/components/Contact/Panel/ContactPanel";
import Hero from "@/components/Hero/Hero";
import LatestListing from "@/components/Listing/LatestListing";
import OffersSection from "@/components/Offers/OffersSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <OffersSection />
      <LatestListing />
      <ContactPanel />
    </main>
  );
}
