// src/data/mockOrders.ts

export type OrderItem = {
  name: string;
  image: string;
  quantity: number;
  price: number;
};

export type OrderType = {
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Returned' | 'All' | string;
  items: OrderItem[];
  total: string;
  subtotal: string;
  shippingFee: string;
  date: string;
  deliveryDate: string;
  id: string;
  carrier: string;
  trackingNumber: string;
  paymentMethod: string;
  statusHistory: string[];
};

const mockOrders: OrderType[] = [
  {
    status: 'Shipped',
    items: [
      { name: 'Laptop', image: '/products/laptop.png', quantity: 1, price: 1200 },
      { name: 'Bag', image: '/products/bag.png', quantity: 1, price: 708 }
    ],
    total: '1,908',
    subtotal: '1,808',
    shippingFee: '100',
    date: 'June 10, 2025',
    deliveryDate: 'June 13, 2025',
    id: 'PO-12121',
    carrier: 'DHL Express',
    trackingNumber: '123456789',
    paymentMethod: 'Visa ending in 1234',
    statusHistory: [
      '✔ Order Placed – June 10, 2025',
      '✔ Packed – June 11, 2025',
      '⏳ Out for Delivery – ETA June 13, 2025',
    ]
  },
  {
    status: 'Processing',
    items: [
      { name: 'Phone', image: '/products/phone.png', quantity: 1, price: 899 }
    ],
    total: '899',
    subtotal: '899',
    shippingFee: '0',
    date: 'June 15, 2025',
    deliveryDate: 'June 20, 2025',
    id: 'PO-12122',
    carrier: 'UPS',
    trackingNumber: '987654321',
    paymentMethod: 'Mastercard ending in 9876',
    statusHistory: [
      '✔ Order Placed – June 15, 2025',
      '⌛ Processing',
    ]
  },
  {
    status: 'Delivered',
    items: [
      { name: 'Headphones', image: '/products/headphones.png', quantity: 1, price: 199 }
    ],
    total: '199',
    subtotal: '199',
    shippingFee: '0',
    date: 'June 18, 2025',
    deliveryDate: 'June 20, 2025',
    id: 'PO-12123',
    carrier: 'FedEx',
    trackingNumber: '1122334455',
    paymentMethod: 'American Express ending in 5555',
    statusHistory: [
      '✔ Order Placed – June 18, 2025',
      '✔ Delivered – June 20, 2025',
    ]
  },        
  {
    status: 'Returned',
    items: [
      { name: 'Smartwatch', image: '/products/smartwatch.png', quantity: 1, price: 299 }
    ],
    total: '299',
    subtotal: '299',
    shippingFee: '0',
    date: 'June 22, 2025',
    deliveryDate: 'N/A',
    id: 'PO-12124',
    carrier: 'N/A',
    trackingNumber: 'N/A',
    paymentMethod: 'PayPal',
    statusHistory: [
      '✔ Order Placed – June 22, 2025',
      '✔ Returned – June 23, 2025',
    ]
  }
];

export default mockOrders;