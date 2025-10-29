import { signal } from '@angular/core';
import { ProductData } from '../models/productData.interface';

export const newArrivals = signal<ProductData[]>([
  {
    id: 1,
    name: 'T-SHIRT WITH TAPE DETAILS',
    rate: 4.5,
    price: 120,
    img: 'imgs/new-arrivals/Frame1.svg',
    description:
      'A stylish t-shirt with unique tape detailing. Perfect for casual outings.',
    category: 'T-Shirts',
  },
  {
    id: 2,
    name: 'COURAGE GRAPHIC T-SHIRT',
    rate: 4,
    price: 240,
    mainPrice: 260,
    img: 'imgs/new-arrivals/Frame2.svg',
    discount: 0,
    discountPricePrecntge: -20,
    description:
      'Graphic tee with bold “Courage” print. Comfortable and expressive.',
    category: 'Graphic Tees',
  },
  {
    id: 3,
    name: 'LOOSE FIT BERMUDA SHORTS',
    rate: 3,
    price: 180,
    img: 'imgs/new-arrivals/Frame3.svg',
    discount: 0,
    description:
      'Loose-fitting Bermuda shorts for maximum comfort on warm days.',
    category: 'Shorts',
  },
  {
    id: 4,
    name: 'FADED SKINNY JEANS',
    rate: 4.5,
    price: 130,
    mainPrice: 160,
    img: 'imgs/new-arrivals/Frame4.svg',
    discountPricePrecntge: -30,
    description:
      'Trendy faded skinny jeans that pair well with any top or jacket.',
    category: 'Jeans',
  },
]);
