export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  category: 'makanan' | 'minuman';
  subcategory: string;
  image?: string;
  allowedVariants?: string[]; // For custom variant restrictions
}

export interface MenuVariant {
  food: {
    spicy: 'Pedas' | 'Tidak Pedas';
  };
  beverage: {
    temperature: 'Dingin' | 'Panas';
  };
}

export interface CartItem {
  id: string;
  item: MenuItem;
  quantity: number;
  variant: MenuVariant['food'] | MenuVariant['beverage'];
}

export const menuData: MenuItem[] = [
  // MAKANAN - Makanan Utama
  {
    id: 'makan-001',
    name: 'Nasi Goreng Spesial',
    price: 25000,
    description: 'Nasi goreng dengan telur, ayam, dan sayuran segar',
    category: 'makanan',
    subcategory: 'Makanan Utama'
  },
  {
    id: 'makan-002',
    name: 'Mie Ayam',
    price: 20000,
    description: 'Mie dengan potongan ayam dan pangsit goreng',
    category: 'makanan',
    subcategory: 'Makanan Utama'
  },
  {
    id: 'makan-003',
    name: 'Ayam Bakar',
    price: 30000,
    description: 'Ayam bakar bumbu kecap dengan nasi putih',
    category: 'makanan',
    subcategory: 'Makanan Utama'
  },
  {
    id: 'makan-004',
    name: 'Rendang Daging',
    price: 35000,
    description: 'Daging sapi rendang dengan nasi putih',
    category: 'makanan',
    subcategory: 'Makanan Utama'
  },
  {
    id: 'makan-005',
    name: 'Ikan Bakar',
    price: 32000,
    description: 'Ikan kakap bakar dengan bumbu kecap dan sambal',
    category: 'makanan',
    subcategory: 'Makanan Utama'
  },
  {
    id: 'makan-006',
    name: 'Bebek Goreng',
    price: 38000,
    description: 'Bebek goreng kremes dengan nasi dan lalapan',
    category: 'makanan',
    subcategory: 'Makanan Utama'
  },
  {
    id: 'makan-007',
    name: 'Nasi Padang',
    price: 28000,
    description: 'Nasi dengan rendang, ayam pop, dan sayur nangka',
    category: 'makanan',
    subcategory: 'Makanan Utama'
  },
  {
    id: 'makan-008',
    name: 'Sate Ayam',
    price: 25000,
    description: 'Sate ayam dengan bumbu kacang dan lontong',
    category: 'makanan',
    subcategory: 'Makanan Utama'
  },

  // MAKANAN - Sup & Soto
  {
    id: 'sup-001',
    name: 'Soto Ayam',
    price: 22000,
    description: 'Sup ayam dengan kuah kuning dan ketupat',
    category: 'makanan',
    subcategory: 'Sup & Soto'
  },
  {
    id: 'sup-002',
    name: 'Soto Betawi',
    price: 26000,
    description: 'Soto khas Betawi dengan daging sapi dan santan',
    category: 'makanan',
    subcategory: 'Sup & Soto'
  },
  {
    id: 'sup-003',
    name: 'Bakso Malang',
    price: 18000,
    description: 'Bakso dengan mie, tahu, dan pangsit goreng',
    category: 'makanan',
    subcategory: 'Sup & Soto'
  },
  {
    id: 'sup-004',
    name: 'Sup Iga',
    price: 32000,
    description: 'Sup iga sapi dengan wortel dan kentang',
    category: 'makanan',
    subcategory: 'Sup & Soto'
  },

  // MAKANAN - Salad & Sayuran
  {
    id: 'salad-001',
    name: 'Gado-Gado',
    price: 18000,
    description: 'Sayuran segar dengan bumbu kacang',
    category: 'makanan',
    subcategory: 'Salad & Sayuran'
  },
  {
    id: 'salad-002',
    name: 'Pecel',
    price: 15000,
    description: 'Sayuran rebus dengan bumbu pecel pedas',
    category: 'makanan',
    subcategory: 'Salad & Sayuran'
  },
  {
    id: 'salad-003',
    name: 'Salad Buah',
    price: 20000,
    description: 'Mix buah segar dengan dressing yogurt',
    category: 'makanan',
    subcategory: 'Salad & Sayuran'
  },
  {
    id: 'salad-004',
    name: 'Caesar Salad',
    price: 28000,
    description: 'Salad romaine dengan dressing caesar dan crouton',
    category: 'makanan',
    subcategory: 'Salad & Sayuran'
  },

  // MAKANAN - Dessert
  {
    id: 'dessert-001',
    name: 'Es Krim Vanilla',
    price: 15000,
    description: 'Es krim vanilla premium dengan topping coklat',
    category: 'makanan',
    subcategory: 'Dessert'
  },
  {
    id: 'dessert-002',
    name: 'Pudding Coklat',
    price: 12000,
    description: 'Pudding coklat lembut dengan whipped cream',
    category: 'makanan',
    subcategory: 'Dessert'
  },
  {
    id: 'dessert-003',
    name: 'Tiramisu',
    price: 25000,
    description: 'Tiramisu Italia dengan ladyfinger dan mascarpone',
    category: 'makanan',
    subcategory: 'Dessert'
  },
  {
    id: 'dessert-004',
    name: 'Cendol',
    price: 10000,
    description: 'Cendol tradisional dengan santan dan gula merah',
    category: 'makanan',
    subcategory: 'Dessert'
  },
  {
    id: 'dessert-005',
    name: 'Klepon',
    price: 8000,
    description: 'Klepon isi gula merah dengan kelapa parut',
    category: 'makanan',
    subcategory: 'Dessert'
  },

  // MAKANAN - Snack
  {
    id: 'snack-001',
    name: 'Pisang Goreng',
    price: 8000,
    description: 'Pisang goreng crispy dengan madu',
    category: 'makanan',
    subcategory: 'Snack'
  },
  {
    id: 'snack-002',
    name: 'Tahu Isi',
    price: 10000,
    description: 'Tahu goreng isi sayuran dengan saus kacang',
    category: 'makanan',
    subcategory: 'Snack'
  },
  {
    id: 'snack-003',
    name: 'Keripik Tempe',
    price: 12000,
    description: 'Keripik tempe renyah dengan bumbu balado',
    category: 'makanan',
    subcategory: 'Snack'
  },
  {
    id: 'snack-004',
    name: 'French Fries',
    price: 15000,
    description: 'Kentang goreng crispy dengan saus sambal',
    category: 'makanan',
    subcategory: 'Snack'
  },

  // MINUMAN - Kopi
  {
    id: 'kopi-001',
    name: 'Kopi Hitam',
    price: 12000,
    description: 'Kopi hitam robusta asli tanpa gula',
    category: 'minuman',
    subcategory: 'Kopi'
  },
  {
    id: 'kopi-002',
    name: 'Cappuccino',
    price: 20000,
    description: 'Kopi cappuccino dengan foam susu lembut',
    category: 'minuman',
    subcategory: 'Kopi'
  },
  {
    id: 'kopi-003',
    name: 'Latte',
    price: 22000,
    description: 'Espresso dengan susu steamed dan foam tipis',
    category: 'minuman',
    subcategory: 'Kopi'
  },
  {
    id: 'kopi-004',
    name: 'Americano',
    price: 18000,
    description: 'Espresso dengan air panas, rasa kopi murni',
    category: 'minuman',
    subcategory: 'Kopi'
  },
  {
    id: 'kopi-005',
    name: 'Mocha',
    price: 25000,
    description: 'Espresso dengan coklat dan whipped cream',
    category: 'minuman',
    subcategory: 'Kopi'
  },
  {
    id: 'kopi-006',
    name: 'Kopi Susu',
    price: 15000,
    description: 'Kopi hitam dengan susu kental manis',
    category: 'minuman',
    subcategory: 'Kopi'
  },

  // MINUMAN - Susu & Milk Based
  {
    id: 'susu-001',
    name: 'Susu Murni',
    price: 10000,
    description: 'Susu sapi murni segar tanpa pemanis',
    category: 'minuman',
    subcategory: 'Susu',
    allowedVariants: ['Dingin']
  },
  {
    id: 'susu-002',
    name: 'Milkshake Vanilla',
    price: 20000,
    description: 'Milkshake vanilla dengan es krim',
    category: 'minuman',
    subcategory: 'Susu',
    allowedVariants: ['Dingin']
  },
  {
    id: 'susu-003',
    name: 'Milkshake Coklat',
    price: 22000,
    description: 'Milkshake coklat premium dengan whipped cream',
    category: 'minuman',
    subcategory: 'Susu',
    allowedVariants: ['Dingin']
  },
  {
    id: 'susu-004',
    name: 'Susu Strawberry',
    price: 18000,
    description: 'Susu dengan sirup strawberry segar',
    category: 'minuman',
    subcategory: 'Susu',
    allowedVariants: ['Dingin']
  },
  {
    id: 'susu-005',
    name: 'Teh Susu',
    price: 15000,
    description: 'Teh hitam dengan susu dan gula aren',
    category: 'minuman',
    subcategory: 'Susu'
  },

  // MINUMAN - Teh & Herbal
  {
    id: 'teh-001',
    name: 'Teh Manis',
    price: 8000,
    description: 'Teh manis segar - tersedia dingin atau panas',
    category: 'minuman',
    subcategory: 'Teh'
  },
  {
    id: 'teh-002',
    name: 'Teh Tarik',
    price: 12000,
    description: 'Teh tarik Malaysia dengan susu kental',
    category: 'minuman',
    subcategory: 'Teh'
  },
  {
    id: 'teh-003',
    name: 'Green Tea',
    price: 15000,
    description: 'Teh hijau premium Jepang',
    category: 'minuman',
    subcategory: 'Teh'
  },
  {
    id: 'teh-004',
    name: 'Teh Lemon',
    price: 12000,
    description: 'Teh hitam dengan perasan lemon segar',
    category: 'minuman',
    subcategory: 'Teh'
  },
  {
    id: 'teh-005',
    name: 'Earl Grey',
    price: 18000,
    description: 'Teh Earl Grey dengan aroma bergamot',
    category: 'minuman',
    subcategory: 'Teh'
  },

  // MINUMAN - Jus & Smoothie
  {
    id: 'jus-001',
    name: 'Jus Jeruk',
    price: 15000,
    description: 'Jus jeruk segar tanpa gula tambahan',
    category: 'minuman',
    subcategory: 'Jus',
    allowedVariants: ['Dingin']
  },
  {
    id: 'jus-002',
    name: 'Jus Mangga',
    price: 18000,
    description: 'Jus mangga harum manis tanpa es',
    category: 'minuman',
    subcategory: 'Jus',
    allowedVariants: ['Dingin']
  },
  {
    id: 'jus-003',
    name: 'Jus Alpukat',
    price: 20000,
    description: 'Jus alpukat dengan susu kental manis',
    category: 'minuman',
    subcategory: 'Jus',
    allowedVariants: ['Dingin']
  },
  {
    id: 'jus-004',
    name: 'Smoothie Berry',
    price: 25000,
    description: 'Smoothie mix berry dengan yogurt',
    category: 'minuman',
    subcategory: 'Jus',
    allowedVariants: ['Dingin']
  },
  {
    id: 'jus-005',
    name: 'Jus Tomat',
    price: 12000,
    description: 'Jus tomat segar dengan sedikit garam',
    category: 'minuman',
    subcategory: 'Jus',
    allowedVariants: ['Dingin']
  },

  // MINUMAN - Minuman Tradisional
  {
    id: 'tradisional-001',
    name: 'Campur Segar',
    price: 18000,
    description: 'Minuman campur dengan berbagai topping segar',
    category: 'minuman',
    subcategory: 'Tradisional',
    allowedVariants: ['Dingin']
  },
  {
    id: 'tradisional-002',
    name: 'Es Dawet',
    price: 12000,
    description: 'Dawet dengan santan dan gula merah',
    category: 'minuman',
    subcategory: 'Tradisional',
    allowedVariants: ['Dingin']
  },
  {
    id: 'tradisional-003',
    name: 'Bajigur',
    price: 15000,
    description: 'Minuman hangat dengan santan dan gula merah',
    category: 'minuman',
    subcategory: 'Tradisional',
    allowedVariants: ['Panas']
  },
  {
    id: 'tradisional-004',
    name: 'Wedang Jahe',
    price: 10000,
    description: 'Wedang jahe hangat dengan gula batu',
    category: 'minuman',
    subcategory: 'Tradisional',
    allowedVariants: ['Panas']
  },

  // MINUMAN - Soft Drink
  {
    id: 'softdrink-001',
    name: 'Air Mineral',
    price: 5000,
    description: 'Air mineral kemasan 600ml',
    category: 'minuman',
    subcategory: 'Soft Drink',
    allowedVariants: ['Dingin']
  },
  {
    id: 'softdrink-002',
    name: 'Coca Cola',
    price: 8000,
    description: 'Coca Cola original 330ml',
    category: 'minuman',
    subcategory: 'Soft Drink',
    allowedVariants: ['Dingin']
  },
  {
    id: 'softdrink-003',
    name: 'Sprite',
    price: 8000,
    description: 'Sprite lemon lime 330ml',
    category: 'minuman',
    subcategory: 'Soft Drink',
    allowedVariants: ['Dingin']
  },
  {
    id: 'softdrink-004',
    name: 'Fanta',
    price: 8000,
    description: 'Fanta orange 330ml',
    category: 'minuman',
    subcategory: 'Soft Drink',
    allowedVariants: ['Dingin']
  }
];

export const getMenuByCategory = (category: 'makanan' | 'minuman'): MenuItem[] => {
  return menuData.filter(item => item.category === category);
};

export const getSubcategoriesByCategory = (category: 'makanan' | 'minuman'): string[] => {
  const items = getMenuByCategory(category);
  const subcategories = [...new Set(items.map(item => item.subcategory))];
  return subcategories;
};

export const getMenuBySubcategory = (category: 'makanan' | 'minuman', subcategory: string): MenuItem[] => {
  return menuData.filter(item => item.category === category && item.subcategory === subcategory);
};

export const getMenuItemById = (id: string): MenuItem | undefined => {
  return menuData.find(item => item.id === id);
};

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(price);
};