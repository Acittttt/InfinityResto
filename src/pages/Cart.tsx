import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import CartDisplay from '../components/CartDisplay';
import SuccessPopup from '../components/SuccessPopup';
import { useCart } from '../context/CartContext';
import { createOrder } from '../services/orderService';
import { Loader2 } from 'lucide-react';

const Cart: React.FC = () => {
  const { tableNumber } = useParams<{ tableNumber: string }>();
  const navigate = useNavigate();
  const { state, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<{ orderId: string; totalItems: number } | null>(null);

  const handleSubmitOrder = async () => {
    if (state.items.length === 0) {
      alert('Keranjang belanja kosong! Silakan tambahkan item terlebih dahulu.');
      return;
    }

    if (!tableNumber) {
      alert('Nomor meja tidak valid!');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Check if Supabase is configured
      if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
        throw new Error('Supabase belum dikonfigurasi. Silakan setup environment variables.');
      }

      if (import.meta.env.VITE_SUPABASE_URL.includes('your-project') || 
          import.meta.env.VITE_SUPABASE_ANON_KEY.includes('your-anon-key')) {
        throw new Error('Silakan ganti nilai VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY dengan kredensial Supabase yang sebenarnya.');
      }

      // Create order in database
      const { order, error } = await createOrder(parseInt(tableNumber), state.items);
      
      if (error) {
        throw new Error(error);
      }

      // Store order ID for confirmation page
      sessionStorage.setItem('lastOrderId', order.id);
      
      // Show success popup
      setOrderSuccess({
        orderId: order.id,
        totalItems: state.totalItems
      });
      setShowSuccessPopup(true);
      
    } catch (error) {
      console.error('Error submitting order:', error);
      setSubmitError(
        error instanceof Error 
          ? error.message 
          : 'Gagal mengirim pesanan. Silakan coba lagi.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToMenu = () => {
    navigate(`/meja/${tableNumber}`);
  };

  const handleSuccessPopupClose = () => {
    setShowSuccessPopup(false);
    setOrderSuccess(null);
    // Navigate to confirmation page after popup closes
    navigate(`/meja/${tableNumber}/confirmation`);
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
        
        {submitError && (
          <div className="error-message">
            <p>❌ {submitError}</p>
            <button onClick={() => setSubmitError(null)} className="close-error">
              ✕
            </button>
          </div>
        )}
        
        <div className="cart-actions">
          <button 
            onClick={handleSubmitOrder}
            className="submit-order-button"
            disabled={state.items.length === 0 || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="spinning" size={20} />
                Mengirim Pesanan...
              </>
            ) : (
              `Kirim Pesanan (Total: ${state.totalItems} item)`
            )}
          </button>
          
          {state.items.length > 0 && !isSubmitting && (
            <button 
              onClick={clearCart}
              className="clear-cart-button"
            >
              Kosongkan Keranjang
            </button>
          )}
        </div>
      </div>
      
      {/* Success Popup */}
      <SuccessPopup
        isOpen={showSuccessPopup}
        title="Pesanan Berhasil!"
        message={`Pesanan Anda dengan ${orderSuccess?.totalItems || 0} item telah berhasil dikirim ke dapur. Silakan tunggu konfirmasi dari pelayan.`}
        onClose={handleSuccessPopupClose}
        autoCloseDelay={4000}
      />
    </Layout>
  );
};

export default Cart;