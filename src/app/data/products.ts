export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  unit: string;
  description: string;
  inStock: boolean;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  icon: string;
}

export const categories: Category[] = [
  {
    id: 'vegetables',
    name: 'Vegetables',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHZlZ2V0YWJsZXMlMjBncm9jZXJpZXN8ZW58MXx8fHwxNzgxMjU5NjQ5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    icon: 'Carrot'
  },
  {
    id: 'fruits',
    name: 'Fruits',
    image: 'https://images.unsplash.com/photo-1725208961101-4c28375bdee7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGZydWl0cyUyMG1hcmtldHxlbnwxfHx8fDE3ODEyNDkwNDJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    icon: 'Apple'
  },
  {
    id: 'bakery',
    name: 'Bakery',
    image: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWtlcnklMjBicmVhZCUyMHBhc3RyaWVzfGVufDF8fHx8MTc4MTE2MDc0M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    icon: 'Croissant'
  },
  {
    id: 'dairy',
    name: 'Dairy',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYWlyeSUyMG1pbGslMjBwcm9kdWN0c3xlbnwxfHx8fDE3ODExMjYzMjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    icon: 'Milk'
  },
  {
    id: 'meat',
    name: 'Meat & Seafood',
    image: 'https://images.unsplash.com/photo-1700478934617-75d2d4f01a04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWF0JTIwYnV0Y2hlciUyMHNob3B8ZW58MXx8fHwxNzgxMTI2MzI0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    icon: 'Beef'
  },
];

export const products: Product[] = [
  // Vegetables
  {
    id: '1',
    name: 'Organic Broccoli',
    category: 'vegetables',
    price: 2.99,
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHZlZ2V0YWJsZXMlMjBncm9jZXJpZXN8ZW58MXx8fHwxNzgxMjU5NjQ5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    unit: 'per head',
    description: 'Fresh organic broccoli, rich in vitamins and minerals.',
    inStock: true
  },
  {
    id: '2',
    name: 'Red Bell Peppers',
    category: 'vegetables',
    price: 3.49,
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHZlZ2V0YWJsZXMlMjBncm9jZXJpZXN8ZW58MXx8fHwxNzgxMjU5NjQ5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    unit: 'per lb',
    description: 'Sweet and crunchy red bell peppers, perfect for salads.',
    inStock: true
  },
  {
    id: '3',
    name: 'Baby Carrots',
    category: 'vegetables',
    price: 2.49,
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHZlZ2V0YWJsZXMlMjBncm9jZXJpZXN8ZW58MXx8fHwxNzgxMjU5NjQ5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    unit: 'per bag',
    description: 'Pre-washed baby carrots, ready to eat.',
    inStock: true
  },
  {
    id: '4',
    name: 'Fresh Spinach',
    category: 'vegetables',
    price: 3.99,
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHZlZ2V0YWJsZXMlMjBncm9jZXJpZXN8ZW58MXx8fHwxNzgxMjU5NjQ5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    unit: 'per bunch',
    description: 'Tender fresh spinach leaves, perfect for salads or cooking.',
    inStock: true
  },

  // Fruits
  {
    id: '5',
    name: 'Honeycrisp Apples',
    category: 'fruits',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1725208961101-4c28375bdee7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGZydWl0cyUyMG1hcmtldHxlbnwxfHx8fDE3ODEyNDkwNDJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    unit: 'per lb',
    description: 'Crispy, sweet Honeycrisp apples.',
    inStock: true
  },
  {
    id: '6',
    name: 'Fresh Strawberries',
    category: 'fruits',
    price: 5.99,
    image: 'https://images.unsplash.com/photo-1725208961101-4c28375bdee7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGZydWl0cyUyMG1hcmtldHxlbnwxfHx8fDE3ODEyNDkwNDJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    unit: 'per pint',
    description: 'Sweet, juicy strawberries.',
    inStock: true
  },
  {
    id: '7',
    name: 'Organic Bananas',
    category: 'fruits',
    price: 0.79,
    image: 'https://images.unsplash.com/photo-1725208961101-4c28375bdee7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGZydWl0cyUyMG1hcmtldHxlbnwxfHx8fDE3ODEyNDkwNDJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    unit: 'each',
    description: 'Organic yellow bananas, perfect for snacking.',
    inStock: true
  },
  {
    id: '8',
    name: 'Blueberries',
    category: 'fruits',
    price: 6.99,
    image: 'https://images.unsplash.com/photo-1725208961101-4c28375bdee7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGZydWl0cyUyMG1hcmtldHxlbnwxfHx8fDE3ODEyNDkwNDJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    unit: 'per pint',
    description: 'Fresh, plump blueberries packed with antioxidants.',
    inStock: true
  },

  // Bakery
  {
    id: '9',
    name: 'Artisan Sourdough',
    category: 'bakery',
    price: 5.49,
    image: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWtlcnklMjBicmVhZCUyMHBhc3RyaWVzfGVufDF8fHx8MTc4MTE2MDc0M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    unit: 'per loaf',
    description: 'Handcrafted sourdough bread with a crispy crust.',
    inStock: true
  },
  {
    id: '10',
    name: 'Butter Croissants',
    category: 'bakery',
    price: 7.99,
    image: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWtlcnklMjBicmVhZCUyMHBhc3RyaWVzfGVufDF8fHx8MTc4MTE2MDc0M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    unit: 'pack of 6',
    description: 'Flaky, buttery croissants baked fresh daily.',
    inStock: true
  },
  {
    id: '11',
    name: 'Whole Wheat Bread',
    category: 'bakery',
    price: 3.99,
    image: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWtlcnklMjBicmVhZCUyMHBhc3RyaWVzfGVufDF8fHx8MTc4MTE2MDc0M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    unit: 'per loaf',
    description: 'Nutritious whole wheat sandwich bread.',
    inStock: true
  },
  {
    id: '12',
    name: 'Chocolate Chip Cookies',
    category: 'bakery',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWtlcnklMjBicmVhZCUyMHBhc3RyaWVzfGVufDF8fHx8MTc4MTE2MDc0M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    unit: 'pack of 12',
    description: 'Homemade-style chocolate chip cookies.',
    inStock: true
  },

  // Dairy
  {
    id: '13',
    name: 'Whole Milk',
    category: 'dairy',
    price: 4.49,
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYWlyeSUyMG1pbGslMjBwcm9kdWN0c3xlbnwxfHx8fDE3ODExMjYzMjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    unit: 'per gallon',
    description: 'Fresh whole milk from local farms.',
    inStock: true
  },
  {
    id: '14',
    name: 'Greek Yogurt',
    category: 'dairy',
    price: 5.99,
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYWlyeSUyMG1pbGslMjBwcm9kdWN0c3xlbnwxfHx8fDE3ODExMjYzMjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    unit: 'per 32oz',
    description: 'Thick and creamy Greek yogurt, high in protein.',
    inStock: true
  },
  {
    id: '15',
    name: 'Sharp Cheddar',
    category: 'dairy',
    price: 6.99,
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYWlyeSUyMG1pbGslMjBwcm9kdWN0c3xlbnwxfHx8fDE3ODExMjYzMjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    unit: 'per 8oz',
    description: 'Aged sharp cheddar cheese.',
    inStock: true
  },
  {
    id: '16',
    name: 'Organic Eggs',
    category: 'dairy',
    price: 5.49,
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYWlyeSUyMG1pbGslMjBwcm9kdWN0c3xlbnwxfHx8fDE3ODExMjYzMjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    unit: 'dozen',
    description: 'Cage-free organic eggs.',
    inStock: true
  },

  // Meat
  {
    id: '17',
    name: 'Chicken Breast',
    category: 'meat',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1700478934617-75d2d4f01a04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWF0JTIwYnV0Y2hlciUyMHNob3B8ZW58MXx8fHwxNzgxMTI2MzI0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    unit: 'per lb',
    description: 'Boneless, skinless chicken breast.',
    inStock: true
  },
  {
    id: '18',
    name: 'Ground Beef',
    category: 'meat',
    price: 7.99,
    image: 'https://images.unsplash.com/photo-1700478934617-75d2d4f01a04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWF0JTIwYnV0Y2hlciUyMHNob3B8ZW58MXx8fHwxNzgxMTI2MzI0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    unit: 'per lb',
    description: '85% lean ground beef.',
    inStock: true
  },
  {
    id: '19',
    name: 'Wild Salmon',
    category: 'meat',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1700478934617-75d2d4f01a04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWF0JTIwYnV0Y2hlciUyMHNob3B8ZW58MXx8fHwxNzgxMTI2MzI0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    unit: 'per lb',
    description: 'Fresh wild-caught salmon fillet.',
    inStock: true
  },
  {
    id: '20',
    name: 'Pork Chops',
    category: 'meat',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1700478934617-75d2d4f01a04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWF0JTIwYnV0Y2hlciUyMHNob3B8ZW58MXx8fHwxNzgxMTI2MzI0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    unit: 'per lb',
    description: 'Thick-cut bone-in pork chops.',
    inStock: true
  },
];
