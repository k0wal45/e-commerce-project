export interface Listing {
  id: string;
  type: string; // Możesz zezwolić na dowolny ciąg
  name: string;
  location: string;
  imageUrls: string[] | File[];
  discountedPrice?: number;
  regularPrice: number;
  area: number;
}
