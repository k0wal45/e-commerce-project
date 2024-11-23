import ListingItem from "./Card/ListingCard";
import classes from "./latest.module.scss";

interface Listing {
  id: string;
  type: string; // Możesz zezwolić na dowolny ciąg
  name: string;
  location: string;
  imageUrls: string[];
  offer: boolean;
  discountedPrice?: number;
  regularPrice: number;
  area: number;
}

const LatestListing = () => {
  return (
    <section className={classes.latest}>
      <h3>Check latest offers</h3>
      <div>
        {dummyData.map((item) => (
          <ListingItem key={item.id} listing={item} id={item.id} />
        ))}
      </div>
    </section>
  );
};

export default LatestListing;

const dummyData: Listing[] = [
  {
    id: "1",
    type: "rent", // Poprawna wartość
    name: "Modern Apartment",
    location: "New York, NY",
    imageUrls: [
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    offer: true,
    discountedPrice: 1200,
    regularPrice: 1500,
    area: 120,
  },
  {
    id: "2",
    type: "sell", // Poprawna wartość
    name: "Luxury Villa",
    location: "Los Angeles, CA",
    imageUrls: [
      "https://images.unsplash.com/photo-1523688471150-efdd09f0f312?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    offer: false,
    regularPrice: 1200000,
    area: 97,
  },
  {
    id: "1",
    type: "rent", // Poprawna wartość
    name: "Modern Apartment",
    location: "New York, NY",
    imageUrls: [
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    offer: true,
    discountedPrice: 1200,
    regularPrice: 1500,
    area: 120,
  },
  {
    id: "2",
    type: "sell", // Poprawna wartość
    name: "Luxury Villa",
    location: "Los Angeles, CA",
    imageUrls: [
      "https://images.unsplash.com/photo-1523688471150-efdd09f0f312?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    offer: false,
    regularPrice: 1200000,
    area: 97,
  },
  {
    id: "1",
    type: "rent", // Poprawna wartość
    name: "Modern Apartment",
    location: "New York, NY",
    imageUrls: [
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    offer: true,
    discountedPrice: 1200,
    regularPrice: 1500,
    area: 120,
  },
];
