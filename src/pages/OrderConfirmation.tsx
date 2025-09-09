import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/menuData';
import Layout from '../components/Layout';

const OrderConfirmation: React.FC = () => {
  const { tableNumber } = useParams<{ tableNumber: string }>();
  const navigate = useNavigate();
  const { state, clearCart } = useCart();

  useEffect(() => {
    // If cart is empty, redirect back to menu
    if (state.items.length === 0) {
      navigate(`/meja/${tableNumber}`);
    }
  }, [state.items.length, navigate, tableNumber]);

  const handleNewOrder = () => {
    clearCart();
    navigate(`/meja/${tableNumber}`);
  };

  if (state.items.length === 0) {
    return null; // Will redirect in useEffect
  }

  const getVariantText = (variant: Record<string, string>, category: string) => {
    if (category === 'makanan') {
      return variant.spicy || '';
    } else {
      return variant.temperature || '';
    }
  };

  return (
    <Layout tableNumber={tableNumber || '1'}>
      <div className="confirmation-page">
        <div className="confirmation-header">
          <div className="success-icon">✅</div>
          <h1>Pesanan Berhasil!</h1>
          <p className="confirmation-message">
            Pesanan diterima, mohon tunggu hingga pesanan diantarkan ke meja Anda.
          </p>
        </div>

        <div className="order-summary">
          <h2>Ringkasan Pesanan</h2>
          <div className="order-details">
            <div className="table-info">
              <strong>Meja: {tableNumber}</strong>
            </div>
            
            <div className="items-list">
              {state.items.map((cartItem) => (
                <div key={cartItem.id} className="order-item">
                  <div className="item-info">
                    <h3>{cartItem.item.name}</h3>
                    <p className="item-variant">
                      {getVariantText(cartItem.variant, cartItem.item.category)}
                    </p>
                    <p className="item-quantity">Qty: {cartItem.quantity}</p>
                  </div>
                  <div className="item-price">
                    {formatPrice(cartItem.item.price * cartItem.quantity)}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="order-total">
              <div className="total-items">
                <strong>Total Item: {state.totalItems}</strong>
              </div>
              <div className="total-price">
                <strong>Total Harga: {formatPrice(state.totalPrice)}</strong>
              </div>
            </div>
          </div>
        </div>

        <div className="confirmation-actions">
          <button onClick={handleNewOrder} className="new-order-button">
            Pesan Lagi
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default OrderConfirmation;