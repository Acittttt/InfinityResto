import { supabase } from '../lib/supabase';
import type { CartItem } from '../data/menuData';

export interface Order {
  id: string;
  table_number: number;
  total_amount: number;
  total_items: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'completed';
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  menu_item_id: string;
  menu_item_name: string;
  menu_item_price: number;
  quantity: number;
  variant: Record<string, string>;
  subtotal: number;
  created_at: string;
}

export interface OrderWithItems extends Order {
  order_items: OrderItem[];
}

// Create a new order
export const createOrder = async (
  tableNumber: number,
  cartItems: CartItem[]
): Promise<{ order: Order; error?: string }> => {
  try {
    // Calculate totals
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalAmount = cartItems.reduce((sum, item) => sum + (item.item.price * item.quantity), 0);

    // Create order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        table_number: tableNumber,
        total_amount: totalAmount,
        total_items: totalItems,
        status: 'pending'
      })
      .select()
      .single();

    if (orderError) {
      throw orderError;
    }

    // Create order items
    const orderItems = cartItems.map(cartItem => ({
      order_id: order.id,
      menu_item_id: cartItem.item.id,
      menu_item_name: cartItem.item.name,
      menu_item_price: cartItem.item.price,
      quantity: cartItem.quantity,
      variant: cartItem.variant,
      subtotal: cartItem.item.price * cartItem.quantity
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) {
      // If order items fail, delete the order to maintain consistency
      await supabase.from('orders').delete().eq('id', order.id);
      throw itemsError;
    }

    return { order };
  } catch (error) {
    console.error('Error creating order:', error);
    return { 
      order: {} as Order, 
      error: error instanceof Error ? error.message : 'Failed to create order' 
    };
  }
};

// Get order by ID with items
export const getOrderById = async (orderId: string): Promise<{ order?: OrderWithItems; error?: string }> => {
  try {
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (*)
      `)
      .eq('id', orderId)
      .single();

    if (orderError) {
      throw orderError;
    }

    return { order };
  } catch (error) {
    console.error('Error fetching order:', error);
    return { 
      error: error instanceof Error ? error.message : 'Failed to fetch order' 
    };
  }
};

// Get orders by table number
export const getOrdersByTable = async (tableNumber: number): Promise<{ orders: OrderWithItems[]; error?: string }> => {
  try {
    const { data: orders, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (*)
      `)
      .eq('table_number', tableNumber)
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return { orders: orders || [] };
  } catch (error) {
    console.error('Error fetching orders:', error);
    return { 
      orders: [],
      error: error instanceof Error ? error.message : 'Failed to fetch orders' 
    };
  }
};

// Update order status
export const updateOrderStatus = async (
  orderId: string, 
  status: Order['status']
): Promise<{ success: boolean; error?: string }> => {
  try {
    const { error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId);

    if (error) {
      throw error;
    }

    return { success: true };
  } catch (error) {
    console.error('Error updating order status:', error);
    return { 
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update order status' 
    };
  }
};

// Check if table exists and is valid
export const validateTable = async (tableNumber: number): Promise<{ isValid: boolean; error?: string }> => {
  try {
    const { data, error } = await supabase
      .from('tables')
      .select('table_number')
      .eq('table_number', tableNumber)
      .single();

    if (error) {
      return { isValid: false };
    }

    return { isValid: !!data };
  } catch (error) {
    console.error('Error validating table:', error);
    return { 
      isValid: false,
      error: error instanceof Error ? error.message : 'Failed to validate table' 
    };
  }
};

// Get all orders (for admin/kitchen view)
export const getAllOrders = async (): Promise<{ orders: OrderWithItems[]; error?: string }> => {
  try {
    const { data: orders, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (*)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return { orders: orders || [] };
  } catch (error) {
    console.error('Error fetching all orders:', error);
    return { 
      orders: [],
      error: error instanceof Error ? error.message : 'Failed to fetch orders' 
    };
  }
};