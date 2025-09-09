import React, { useState } from 'react';
import { formatPrice } from '../data/menuData';
import type { MenuItem } from '../data/menuData';
import { useCart } from '../context/CartContext';
import SuccessPopup from './SuccessPopup';
import { X, Plus, Minus } from 'lucide-react';

interface ItemCustomizationModalProps {
  item: MenuItem;
  isOpen: boolean;
  onClose: () => void;
}

const ItemCustomizationModal: React.FC<ItemCustomizationModalProps> = ({
  item,
  isOpen,
  onClose
}) => {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<string>('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [addedItemDetails, setAddedItemDetails] = useState<{ name: string; variant: string; quantity: number } | null>(null);

  if (!isOpen) return null;

  const isFoodItem = item.category === 'makanan';
  const defaultVariantOptions = isFoodItem 
    ? ['Pedas', 'Tidak Pedas']
    : ['Dingin', 'Panas'];
  
  // Use custom allowed variants if specified, otherwise use default
  const variantOptions = item.allowedVariants || defaultVariantOptions;

  const handleVariantChange = (variant: string) => {
    setSelectedVariant(variant);
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (!selectedVariant) {
      alert('Silakan pilih varian terlebih dahulu!');
      return;
    }

    const variant = isFoodItem
      ? { spicy: selectedVariant as 'Pedas' | 'Tidak Pedas' }
      : { temperature: selectedVariant as 'Dingin' | 'Panas' };

    addItem(item, variant, quantity);
    
    // Store details for success popup
    setAddedItemDetails({
      name: item.name,
      variant: selectedVariant,
      quantity: quantity
    });
    
    // Show success popup
    setShowSuccessPopup(true);
  };

  const handleClose = () => {
    setQuantity(1);
    setSelectedVariant('');
    onClose();
  };

  const handleSuccessPopupClose = () => {
    setShowSuccessPopup(false);
    setAddedItemDetails(null);
    // Reset form and close modal after success popup
    setQuantity(1);
    setSelectedVariant('');
    onClose();
  };

  const totalPrice = item.price * quantity;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Kustomisasi Pesanan</h2>
          <button onClick={handleClose} className="close-button">
            <X size={24} />
          </button>
        </div>

        <div className="modal-body">
          {/* Item Info */}
          <div className="item-info">
            <div className="item-image-placeholder">
              {isFoodItem ? '🍽️' : '🥤'}
            </div>
            <div className="item-details">
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <div className="item-price">{formatPrice(item.price)}</div>
            </div>
          </div>

          {/* Variant Selection */}
          <div className="variant-selection">
            <h4>Pilih Varian: <span className="required">*</span></h4>
            <div className="variant-options">
              {variantOptions.map((variant) => (
                <label key={variant} className="variant-option">
                  <input
                    type="radio"
                    name="variant"
                    value={variant}
                    checked={selectedVariant === variant}
                    onChange={() => handleVariantChange(variant)}
                  />
                  <span className="variant-label">{variant}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Quantity Selection */}
          <div className="quantity-selection">
            <h4>Jumlah:</h4>
            <div className="quantity-controls">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                className="quantity-button"
                disabled={quantity <= 1}
              >
                <Minus size={20} />
              </button>
              <span className="quantity-display">{quantity}</span>
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                className="quantity-button"
              >
                <Plus size={20} />
              </button>
            </div>
          </div>

          {/* Total Price */}
          <div className="total-price">
            <h3>Total: {formatPrice(totalPrice)}</h3>
          </div>
        </div>

        <div className="modal-footer">
          <button onClick={handleClose} className="cancel-button">
            Batal
          </button>
          <button
            onClick={handleAddToCart}
            className="add-to-cart-button"
            disabled={!selectedVariant}
          >
            Tambahkan ke Keranjang
          </button>
        </div>
      </div>
      
      {/* Success Popup */}
      <SuccessPopup
        isOpen={showSuccessPopup}
        title="Ditambahkan ke Keranjang!"
        message={addedItemDetails ? 
          `${addedItemDetails.name} (${addedItemDetails.variant}) x${addedItemDetails.quantity} berhasil ditambahkan ke keranjang!` :
          'Item berhasil ditambahkan ke keranjang!'
        }
        onClose={handleSuccessPopupClose}
        autoCloseDelay={2500}
      />
    </div>
  );
};

export default ItemCustomizationModal;