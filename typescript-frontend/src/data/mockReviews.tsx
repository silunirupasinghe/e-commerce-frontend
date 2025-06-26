export type Review = {
  id: number;
  product: string;
  image: string;
  rating: number;
  text: string;
  date: string;
  editedDate: string;
  productId: string;
  price: string;
  storeLink: string;
};

const mockReviews: Review[] = [
  {
    id: 1,
    product: 'Bag',
    image: '/products/bag.png',
    rating: 4,
    text: 'Great qualityGreat qualityGreat qualityGreat qualityGreat qualityGreat qualityGreat qualityGreat qualityGreat qualityGreat qualityGreat qualityGreat qualityGreat quality.',
    date: 'June 10, 2022',
    editedDate: 'June 12, 2025',
    productId: 'BAG-001',
    price: '$99.99',
    storeLink: 'https://example.com/store/bag',
  },
  {
    id: 2,
    product: 'Laptop',
    image: '/products/laptop.png',
    rating: 5,
    text: 'Great performance',
    date: 'May 12, 2024',
    editedDate: 'June 12, 2025',
    productId: 'BAG-001',
    price: '$99.99',
    storeLink: 'https://example.com/store/bag',
  },
  {
    id: 3,
    product: 'Bag',
    image: '/products/bag.png',
    rating: 5,
    text: 'Stylish',
    date: 'July 10, 2024',
    editedDate: 'June 12, 2025',
    productId: 'BAG-001',
    price: '$99.99',
    storeLink: 'https://example.com/store/bag',
  },
  {
    id: 4,
    product: 'Laptop',
    image: '/products/laptop.png',
    rating: 3,
    text: 'Poor delivery',
    date: 'February 9, 2023',
    editedDate: 'June 12, 2025',
    productId: 'BAG-001',
    price: '$99.99',
    storeLink: 'https://example.com/store/bag',
  },
];

export default mockReviews;
