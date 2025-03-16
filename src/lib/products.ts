
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

export const products: Product[] = [
  {
    id: "kam-1s",
    name: "KAM 1s",
    price: 15000,
    description: "Classic design with premium comfort. Perfect for any occasion.",
    image: "https://images.unsplash.com/photo-1597045566677-8cf032ed6634?q=80&w=1000&auto=format&fit=crop",
    category: "running"
  },
  {
    id: "kam-1-2s",
    name: "KAM 1.2s",
    price: 18000,
    description: "Upgraded for better durability and style. A must-have for shoe enthusiasts.",
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1000&auto=format&fit=crop",
    category: "running"
  },
  {
    id: "kam-2s",
    name: "KAM 2s",
    price: 20000,
    description: "Next-generation performance shoes built for ultimate support and style.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop",
    category: "sport"
  },
  {
    id: "kam-air",
    name: "KAM Air",
    price: 22000,
    description: "Lightweight with maximum cushioning for all-day comfort.",
    image: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?q=80&w=1000&auto=format&fit=crop",
    category: "lifestyle"
  },
  {
    id: "kam-lite",
    name: "KAM Lite",
    price: 17500,
    description: "Minimalist design with maximum comfort for everyday wear.",
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1000&auto=format&fit=crop",
    category: "lifestyle"
  },
  {
    id: "kam-pro",
    name: "KAM Pro",
    price: 25000,
    description: "Professional grade athletic shoes designed for peak performance.",
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=1000&auto=format&fit=crop",
    category: "sport"
  }
];

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
  }).format(price);
};
