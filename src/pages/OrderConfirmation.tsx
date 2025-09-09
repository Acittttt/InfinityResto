import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/menuData';
import { getOrderById } from '../services/orderService';
import type { OrderWithItems } from '../services/orderService';
import Layout from '../components/Layout';
import { Loader2, CheckCircle } from 'lucide-react';

const OrderConfirmation: React.FC = () => {
  const { tableNumber } = useParams<{ tableNumber: string }>();
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const [order, setOrder] = useState<OrderWithItems | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const orderId = sessionStorage.getItem('lastOrderId');
      
      if (!orderId) {
        // No order ID found, redirect to menu
        navigate(`/meja/${tableNumber}`);
        return;
      }

      try {
        const { order: fetchedOrder, error: fetchError } = await getOrderById(orderId);
        
        if (fetchError || !fetchedOrder) {
          throw new Error(fetchError || 'Order not found');
        }

        setOrder(fetchedOrder);
        
        // Clear cart after successful order fetch
        clearCart();
        
        // Clear the stored order ID
        sessionStorage.removeItem('lastOrderId');
      } catch (err) {
        console.error('Error fetching order:', err);
        setError(err instanceof Error ? err.message : 'Failed to load order');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [tableNumber, navigate, clearCart]);

  const handleNewOrder = () => {
    clearCart();
    navigate(`/meja/${tableNumber}`);
  };

  if (loading) {
    return (
      <Layout tableNumber={tableNumber || '1'}>
        <div className="confirmation-loading">
          <Loader2 className="spinning" size={48} />
          <p>Memuat data pesanan...</p>
        </div>
      </Layout>
    );
  }

  if (error || !order) {
    return (
      <Layout tableNumber={tableNumber || '1'}>
        <div className="confirmation-error">
          <p>❌ {error || 'Pesanan tidak ditemukan'}</p>
          <button onClick={handleNewOrder} className="new-order-button">
            Kembali ke Menu
          </button>
        </div>
      </Layout>
    );
  }

  const getVariantText = (variant: Record<string, string>) => {
    if (variant.spicy) {
      return variant.spicy;
    } else if (variant.temperature) {
      return variant.temperature;
    }
    return '';
  };

  const formatOrderId = (id: string) => {
    return id.substring(0, 8).toUpperCase();
  };

  return (
    <Layout tableNumber={tableNumber || '1'}>
      <div className="confirmation-page">
        <div className="confirmation-header">
          <div className="success-icon">
            <CheckCircle size={64} color="#27ae60" />
          </div>
          <h1>Pesanan Berhasil!</h1>
          <p className="confirmation-message">
            Pesanan diterima, mohon tunggu hingga pesanan diantarkan ke meja Anda.
          </p>
          <div className="order-id">
            <strong>ID Pesanan: #{formatOrderId(order.id)}</strong>
          </div>
        </div>

        <div className="order-summary">
          <h2>Ringkasan Pesanan</h2>
          <div className="order-details">
            <div className="table-info">
              <strong>Meja: {order.table_number}</strong>
              <span className="order-status status-{order.status}">
                Status: {order.status === 'pending' ? 'Menunggu Konfirmasi' : order.status}
              </span>
            </div>
            
            <div className="items-list">
              {order.order_items.map((orderItem) => (
                <div key={orderItem.id} className="order-item">
                  <div className="item-info">
                    <h3>{orderItem.menu_item_name}</h3>
                    <p className="item-variant">
                      {getVariantText(orderItem.variant)}
                    </p>
                    <p className="item-quantity">Qty: {orderItem.quantity}</p>
                  </div>
                  <div className="item-price">
                    {formatPrice(orderItem.subtotal)}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="order-total">
              <div className="total-items">
                <strong>Total Item: {order.total_items}</strong>
              </div>
              <div className="total-price">
                <strong>Total Harga: {formatPrice(order.total_amount)}</strong>
              </div>
            </div>
          </div>
        </div>

        <div className="order-info">
          <div className="info-card">
            <h3>📋 Informasi Pesanan</h3>
            <p><strong>Waktu Pesan:</strong> {new Date(order.created_at).toLocaleString('id-ID')}</p>
            <p><strong>Estimasi:</strong> 15-20 menit</p>
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