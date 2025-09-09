import React from 'react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/menuData';
import { Plus, Minus, Trash2 } from 'lucide-react';

const CartDisplay: React.FC = () => {
  const { state, updateQuantity, removeItem } = useCart();

  if (state.items.length === 0) {
    return (
      <div className="cart-empty">
        <div className="empty-cart-icon">🛒</div>
        <h3>Keranjang Belanja Kosong</h3>
        <p>Silakan pilih item dari menu untuk mulai memesan.</p>
      </div>
    );
  }

  const getVariantText = (variant: Record<string, string>, category: string) => {
    if (category === 'makanan') {
      return variant.spicy || '';
    } else {
      return variant.temperature || '';
    }
  };

  const handleQuantityChange = (id: string, currentQuantity: number, delta: number) => {
    const newQuantity = currentQuantity + delta;
    if (newQuantity > 0) {
      updateQuantity(id, newQuantity);
    }
  };

  const handleRemoveItem = (id: string, itemName: string) => {
    if (confirm(`Hapus ${itemName} dari keranjang?`)) {
      removeItem(id);
    }
  };

  return (
    <div className="cart-display">
      <div className="cart-items">
        {state.items.map((cartItem) => (
          <div key={cartItem.id} className="cart-item">
            <div className="cart-item-info">
              <div className="item-image-placeholder">
                {cartItem.item.category === 'makanan' ? '🍽️' : '🥤'}
              </div>
              
              <div className="item-details">
                <h3>{cartItem.item.name}</h3>
                <p className="item-variant">
                  {getVariantText(cartItem.variant, cartItem.item.category)}
                </p>
                <p className="item-price-unit">
                  {formatPrice(cartItem.item.price)} per item
                </p>
              </div>
            </div>

            <div className="cart-item-controls">
              {/* Quantity Controls */}
              <div className="quantity-controls">
                <button
                  onClick={() => handleQuantityChange(cartItem.id, cartItem.quantity, -1)}
                  className="quantity-button"
                  disabled={cartItem.quantity <= 1}
                >
                  <Minus size={16} />
                </button>
                <span className="quantity-display">{cartItem.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(cartItem.id, cartItem.quantity, 1)}
                  className="quantity-button"
                >
                  <Plus size={16} />
                </button>
              </div>

              {/* Item Total Price */}
              <div className="item-total-price">
                {formatPrice(cartItem.item.price * cartItem.quantity)}
              </div>

              {/* Remove Button */}
              <button
                onClick={() => handleRemoveItem(cartItem.id, cartItem.item.name)}
                className="remove-button"
                title="Hapus item"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Summary */}
      <div className="cart-summary">
        <div className="summary-row">
          <span>Total Item:</span>
          <span>{state.totalItems}</span>
        </div>
        <div className="summary-row total">
          <span>Total Harga:</span>
          <span>{formatPrice(state.totalPrice)}</span>
        </div>
      </div>
    </div>
  );
};

export default CartDisplay;