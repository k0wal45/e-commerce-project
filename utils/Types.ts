export type Location = {
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
};

export type Features = {
  rooms?: number;
  bedrooms?: number;
  bathrooms?: number;
  area?: number; // in square meters
  parkingSpaces?: number;
  hasPool?: boolean;
  hasGarage?: boolean;
  hasGarden?: boolean;
};

export type Seller = {
  name: string;
  email: string;
  phone?: string | number; // optional
};

export type Promotion = {
  isActive: boolean;
  discountType: "percentage" | "fixed" | ""; // percentage or fixed or none amount
  discountValue: number;
};

export type Listing = {
  _id: string;
  title: string;
  description: string;
  price: number;
  category:
    | "apartments"
    | "studios"
    | "houses"
    | "plots"
    | "warehouses"
    | "garages";
  location: Location;
  images: string[] | File[];
  features: Features;
  seller: Seller;
  status: "active" | "sold";
  createdAt?: string; // ISO date string
  promotion: Promotion; // optional for listings without a specific promotion
};

export type User = {
  _id: string;
  dailyVisits: number[];
  month: number;
  totalVisits: number;
  year: number;
};

export type DashBoardUser = {
  _id: string;
  username: string;
  email: string;
  password: string;
  role: "admin" | "editor";
};
