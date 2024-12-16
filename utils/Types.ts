export interface Listing {
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
