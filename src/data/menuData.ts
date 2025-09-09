export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  category: 'makanan' | 'minuman';
  image?: string;
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
  // Makanan
  {
    id: 'makan-001',
    name: 'Nasi Goreng Spesial',
    price: 25000,
    description: 'Nasi goreng dengan telur, ayam, dan sayuran segar',
    category: 'makanan'
  },
  {
    id: 'makan-002',
    name: 'Mie Ayam',
    price: 20000,
    description: 'Mie dengan potongan ayam dan pangsit goreng',
    category: 'makanan'
  },
  {
    id: 'makan-003',
    name: 'Ayam Bakar',
    price: 30000,
    description: 'Ayam bakar bumbu kecap dengan nasi putih',
    category: 'makanan'
  },
  {
    id: 'makan-004',
    name: 'Gado-Gado',
    price: 18000,
    description: 'Sayuran segar dengan bumbu kacang',
    category: 'makanan'
  },
  {
    id: 'makan-005',
    name: 'Soto Ayam',
    price: 22000,
    description: 'Sup ayam dengan kuah kuning dan ketupat',
    category: 'makanan'
  },
  {
    id: 'makan-006',
    name: 'Rendang Daging',
    price: 35000,
    description: 'Daging sapi rendang dengan nasi putih',
    category: 'makanan'
  },

  // Minuman
  {
    id: 'minum-001',
    name: 'Es Teh Manis',
    price: 8000,
    description: 'Teh manis segar dengan es batu',
    category: 'minuman'
  },
  {
    id: 'minum-002',
    name: 'Kopi Hitam',
    price: 12000,
    description: 'Kopi hitam robusta asli',
    category: 'minuman'
  },
  {
    id: 'minum-003',
    name: 'Jus Jeruk',
    price: 15000,
    description: 'Jus jeruk segar tanpa gula tambahan',
    category: 'minuman'
  },
  {
    id: 'minum-004',
    name: 'Es Campur',
    price: 18000,
    description: 'Es campur dengan berbagai topping',
    category: 'minuman'
  },
  {
    id: 'minum-005',
    name: 'Cappuccino',
    price: 20000,
    description: 'Kopi cappuccino dengan foam susu',
    category: 'minuman'
  },
  {
    id: 'minum-006',
    name: 'Air Mineral',
    price: 5000,
    description: 'Air mineral kemasan 600ml',
    category: 'minuman'
  }
];

export const getMenuByCategory = (category: 'makanan' | 'minuman'): MenuItem[] => {
  return menuData.filter(item => item.category === category);
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