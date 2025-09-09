import React, { createContext, useContext, useReducer } from 'react';
import type { ReactNode } from 'react';
import type { CartItem, MenuItem, MenuVariant } from '../data/menuData';

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: { item: MenuItem; variant: MenuVariant['food'] | MenuVariant['beverage']; quantity: number } }
  | { type: 'REMOVE_ITEM'; payload: { id: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' };

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { item, variant, quantity } = action.payload;
      const cartItemId = `${item.id}-${JSON.stringify(variant)}`;
      
      const existingItemIndex = state.items.findIndex(cartItem => 
        cartItem.id === cartItemId
      );

      let newItems: CartItem[];
      
      if (existingItemIndex >= 0) {
        // Update existing item quantity
        newItems = state.items.map((cartItem, index) =>
          index === existingItemIndex
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
      } else {
        // Add new item
        const newCartItem: CartItem = {
          id: cartItemId,
          item,
          quantity,
          variant
        };
        newItems = [...state.items, newCartItem];
      }

      return calculateTotals({ ...state, items: newItems });
    }

    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.id !== action.payload.id);
      return calculateTotals({ ...state, items: newItems });
    }

    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      
      if (quantity <= 0) {
        // Remove item if quantity is 0 or less
        const newItems = state.items.filter(item => item.id !== id);
        return calculateTotals({ ...state, items: newItems });
      }

      const newItems = state.items.map(item =>
        item.id === id ? { ...item, quantity } : item
      );
      return calculateTotals({ ...state, items: newItems });
    }

    case 'CLEAR_CART': {
      return initialState;
    }

    default:
      return state;
  }
};

const calculateTotals = (state: CartState): CartState => {
  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = state.items.reduce((sum, item) => sum + (item.item.price * item.quantity), 0);
  
  return {
    ...state,
    totalItems,
    totalPrice
  };
};

interface CartContextType {
  state: CartState;
  addItem: (item: MenuItem, variant: MenuVariant['food'] | MenuVariant['beverage'], quantity: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItem = (item: MenuItem, variant: MenuVariant['food'] | MenuVariant['beverage'], quantity: number) => {
    dispatch({ type: 'ADD_ITEM', payload: { item, variant, quantity } });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } });
  };

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider value={{ state, addItem, removeItem, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};