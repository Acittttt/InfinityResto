import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import CartDisplay from '../components/CartDisplay';
import { useCart } from '../context/CartContext';

const Cart: React.FC = () => {
  const { tableNumber } = useParams<{ tableNumber: string }>();
  const navigate = useNavigate();
  const { state, clearCart } = useCart();

  const handleSubmitOrder = () => {
    if (state.items.length === 0) {
      alert('Keranjang belanja kosong! Silakan tambahkan item terlebih dahulu.');
      return;
    }
    
    // Navigate to confirmation page
    navigate(`/meja/${tableNumber}/confirmation`);
  };

  const handleBackToMenu = () => {
    navigate(`/meja/${tableNumber}`);
  };

  return (
    <Layout tableNumber={tableNumber || '1'}>
      <div className="cart-page">
        <div className="cart-header">
          <h2>Keranjang Belanja</h2>
          <button onClick={handleBackToMenu} className="back-button">
            ← Kembali ke Menu
          </button>
        </div>
        
        <CartDisplay />
        
        <div className="cart-actions">
          <button 
            onClick={handleSubmitOrder}
            className="submit-order-button"
            disabled={state.items.length === 0}
          >
            Kirim Pesanan (Total: {state.totalItems} item)
          </button>
          
          {state.items.length > 0 && (
            <button 
              onClick={clearCart}
              className="clear-cart-button"
            >
              Kosongkan Keranjang
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Cart;