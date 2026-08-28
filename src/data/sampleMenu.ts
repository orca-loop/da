import type { MenuItem } from '@/types/menu';

// Edit this list with your real menu items, prices, and descriptions.
// image_url can be a link to a photo, or null to show a placeholder icon.
export const sampleMenuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Masala Omelette',
    description: 'Fluffy eggs with onion, tomato, and green chili',
    price: 90,
    image_url: null,
    category: 'Breakfast',
    is_available: true,
    is_veg: false
  },
  {
    id: '2',
    name: 'Aloo Paratha',
    description: 'Stuffed potato flatbread served with curd and pickle',
    price: 80,
    image_url: null,
    category: 'Breakfast',
    is_available: true,
    is_veg: true
  },
  {
    id: '3',
    name: 'Veg Spring Rolls',
    description: 'Crispy rolls stuffed with mixed vegetables',
    price: 150,
    image_url: null,
    category: 'Starters',
    is_available: true,
    is_veg: true
  },
  {
    id: '4',
    name: 'Chicken Tikka',
    description: 'Char-grilled marinated chicken chunks',
    price: 260,
    image_url: null,
    category: 'Starters',
    is_available: true,
    is_veg: false
  },
  {
    id: '5',
    name: 'Paneer Butter Masala',
    description: 'Cottage cheese cubes in a rich tomato-butter gravy',
    price: 220,
    image_url: null,
    category: 'Main Course',
    is_available: true,
    is_veg: true
  },
  {
    id: '6',
    name: 'Dal Makhani',
    description: 'Slow-cooked black lentils finished with cream',
    price: 190,
    image_url: null,
    category: 'Main Course',
    is_available: true,
    is_veg: true
  },
  {
    id: '7',
    name: 'Butter Chicken',
    description: 'Tandoori chicken simmered in a creamy tomato sauce',
    price: 280,
    image_url: null,
    category: 'Main Course',
    is_available: true,
    is_veg: false
  },
  {
    id: '8',
    name: 'Tandoori Roti',
    description: 'Whole wheat bread baked in the tandoor',
    price: 25,
    image_url: null,
    category: 'Indian Breads',
    is_available: true,
    is_veg: true
  },
  {
    id: '9',
    name: 'Butter Naan',
    description: 'Soft leavened bread brushed with butter',
    price: 45,
    image_url: null,
    category: 'Indian Breads',
    is_available: true,
    is_veg: true
  },
  {
    id: '10',
    name: 'Veg Biryani',
    description: 'Fragrant basmati rice layered with spiced vegetables',
    price: 210,
    image_url: null,
    category: 'Rice & Biryani',
    is_available: true,
    is_veg: true
  },
  {
    id: '11',
    name: 'Chicken Biryani',
    description: 'Fragrant basmati rice layered with spiced chicken',
    price: 260,
    image_url: null,
    category: 'Rice & Biryani',
    is_available: true,
    is_veg: false
  },
  {
    id: '12',
    name: 'Veg Hakka Noodles',
    description: 'Stir-fried noodles with fresh vegetables',
    price: 170,
    image_url: null,
    category: 'Chinese',
    is_available: true,
    is_veg: true
  },
  {
    id: '13',
    name: 'Chilli Paneer',
    description: 'Crispy paneer tossed in a spicy Indo-Chinese sauce',
    price: 210,
    image_url: null,
    category: 'Chinese',
    is_available: true,
    is_veg: true
  },
  {
    id: '14',
    name: 'French Fries',
    description: 'Crispy salted potato fries',
    price: 120,
    image_url: null,
    category: 'Snacks',
    is_available: true,
    is_veg: true
  },
  {
    id: '15',
    name: 'Masala Chai',
    description: 'Classic Indian spiced tea',
    price: 40,
    image_url: null,
    category: 'Beverages',
    is_available: true,
    is_veg: true
  },
  {
    id: '16',
    name: 'Fresh Lime Soda',
    description: 'Sweet or salted, served chilled',
    price: 60,
    image_url: null,
    category: 'Beverages',
    is_available: true,
    is_veg: true
  }
];
