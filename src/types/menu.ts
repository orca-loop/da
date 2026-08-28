export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string | null;
  category: string;
  is_available: boolean;
  is_veg: boolean;
  created_at?: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: number;
  order_id: string;
  customer_name: string;
  mobile_number: string;
  table_number: string;
  date_of_birth: string;
  ordered_items: OrderItem[];
  total_amount: number;
  order_status: 'NEW' | 'PREPARING' | 'READY' | 'COMPLETED' | 'CANCELLED';
  created_at: string;
}

export interface CustomerDetails {
  fullName: string;
  mobileNumber: string;
  tableNumber: string;
  dateOfBirth: string;
}

export type MenuCategory = 
  | 'Breakfast'
  | 'Starters'
  | 'Main Course'
  | 'Indian Breads'
  | 'Rice & Biryani'
  | 'Chinese'
  | 'Snacks'
  | 'Beverages';

export const MENU_CATEGORIES: MenuCategory[] = [
  'Breakfast',
  'Starters',
  'Main Course',
  'Indian Breads',
  'Rice & Biryani',
  'Chinese',
  'Snacks',
  'Beverages'
];
