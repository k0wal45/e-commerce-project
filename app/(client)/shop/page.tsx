import UniversalHero from "@/components/Hero/Universal/UniversalHero";
import DisplayListings from "@/components/Listing/Shop/DisplayListings";

async function getListings() {
  try {
    const response = await fetch(`/api/getData/getListing`);
    const data = await response.json();
    console.log(data);
    if (data.success) {
      return data;
    } else {
      console.error("Error fetching images:", data.error);
    }
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
}

const page = async () => {
  const listings = await getListings();

  console.log(listings);
  if (!listings) {
    return (
      <div
        style={{
          height: "60vh",
          display: "grid",
          placeItems: "center",
          marginTop: "5rem",
          fontSize: "1.5rem",
          fontWeight: "bold",
        }}
      >
        Error fetching listings
      </div>
    );
  }
  return (
    <main>
      <UniversalHero
        title="Shop"
        image="https://images.unsplash.com/photo-1495368427887-e88d33a44e0f?q=80&w=2053&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        position="center"
      />
      {/* <DisplayListings data={listings} /> */}
    </main>
  );
};

export default page;
