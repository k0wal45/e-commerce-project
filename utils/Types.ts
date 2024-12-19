export interface Listing {
  type: string; // Możesz zezwolić na dowolny ciąg
  name: string;
  location: string;
  imageUrls: string[];
  discountedPrice?: number;
  regularPrice?: number;
  area?: number;
}
