type Location = {
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
};

type Features = {
  bedrooms: number;
  bathrooms: number;
  area: number; // in square feet or meters
  parkingSpaces?: number; // optional
  hasPool?: boolean;
  hasGarage?: boolean;
  hasGarden?: boolean;
};

type Seller = {
  name: string;
  email: string;
  phone?: string; // optional
};

type Promotion = {
  isActive: boolean;
  discountType: "percentage" | "fixed" | ""; // percentage or fixed or none amount
  discountValue: number;
};

export type Listing = {
  _id?: string;
  title: string;
  description: string;
  price: number;
  category:
    | "apartments"
    | "studios"
    | "houses"
    | "investments"
    | "rooms"
    | "plots"
    | "commercial_units"
    | "warehouses"
    | "garages";
  location: Location;
  imageUrls: string[];
  features: Features;
  seller: Seller;
  status: "available" | "sold" | "pending";
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  promotion: Promotion; // optional for listings without a specific promotion
};

/* Example Listing Data
const listing = {
  _id: "unique_house_id",
  title: "Modern 3-Bedroom House with Pool",
  description: "Beautiful 3-bedroom house with a swimming pool, located in a quiet neighborhood.",
  price: 500000,
  category: "houses", // apartments, studios, houses, investments, rooms, plots, commercial_units, warehouses, garages
  location: {
    address: "123 Main Street",
    city: "Los Angeles",
    state: "California",
    zipCode: "90001",
    country: "USA",
    coordinates: {
      latitude: 34.052235,
      longitude: -118.243683
    }
  },
  images: [
    "https://your-s3-bucket-url.com/image1.jpg",
    "https://your-s3-bucket-url.com/image2.jpg"
  ],
  features: {
    bedrooms: 3,
    bathrooms: 2,
    area: 2000,
    yearBuilt: 2015,
    parkingSpaces: 2,
    hasPool: true,
    hasGarage: true,
    hasGarden: true
  },
  seller: {
    userId: "unique_seller_id",
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+123456789",
    verified: true
  },
  status: "available", // available, sold, pending
  createdAt: "2025-01-26T12:00:00Z",
  updatedAt: "2025-01-26T12:00:00Z",
  promotion: {
    isActive: true,
    discountType: "percentage",
    discountValue: 10,
    startDate: "2025-01-20T00:00:00Z",
    endDate: "2025-01-30T23:59:59Z"
  }
};

*/
