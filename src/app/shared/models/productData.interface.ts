export interface ProductData {
  id: number;
  name: string;
  rate: number;
  price: number;
  img: string;
  discount?: number;
  mainPrice?: number;
  discountPricePrecntge?: number;
  description?: string;
  category?: string;
}
