import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOrdersByTable } from '../services/orderService';
import type { OrderWithItems } from '../services/orderService';
import { formatPrice } from '../data/menuData';
import Layout from '../components/Layout';
import { Loader2, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const OrderHistory: React.FC = () => {
  const { tableNumber } = useParams<{ tableNumber: string }>();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<OrderWithItems[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!tableNumber) return;

      try {
        const { orders: fetchedOrders, error: fetchError } = await getOrdersByTable(parseInt(tableNumber));
        
        if (fetchError) {
          throw new Error(fetchError);
        }

        setOrders(fetchedOrders);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError(err instanceof Error ? err.message : 'Failed to load orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [tableNumber]);

  const handleBackToMenu = () => {
    navigate(`/meja/${tableNumber}`);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock size={20} color="#f39c12" />;
      case 'confirmed':
      case 'preparing':
        return <AlertCircle size={20} color="#3498db" />;
      case 'ready':
      case 'completed':
        return <CheckCircle size={20} color="#27ae60" />;
      default:
        return <Clock size={20} color="#999" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Menunggu Konfirmasi';
      case 'confirmed':
        return 'Dikonfirmasi';
      case 'preparing':
        return 'Sedang Diproses';
      case 'ready':
        return 'Siap Disajikan';
      case 'completed':
        return 'Selesai';
      default:
        return status;
    }
  };

  const formatOrderId = (id: string) => {
    return id.substring(0, 8).toUpperCase();
  };

  const getVariantText = (variant: Record<string, string>) => {
    if (variant.spicy) {
      return variant.spicy;
    } else if (variant.temperature) {
      return variant.temperature;
    }
    return '';
  };

  if (loading) {
    return (
      <Layout tableNumber={tableNumber || '1'}>
        <div className="history-loading">
          <Loader2 className="spinning" size={48} />
          <p>Memuat riwayat pesanan...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout tableNumber={tableNumber || '1'}>
      <div className="order-history-page">
        <div className="history-header">
          <h2>Riwayat Pesanan</h2>
          <button onClick={handleBackToMenu} className="back-button">
            &larr; Kembali ke Menu
          </button>
        </div>

        {error && (
          <div className="error-message">
            <p>&times; {error}</p>
          </div>
        )}

        {orders.length === 0 && !error ? (
          <div className="no-orders">
            <p>Belum ada pesanan untuk meja ini.</p>
            <button onClick={handleBackToMenu} className="start-ordering-button">
              Mulai Pesan
            </button>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <div className="order-info">
                    <h3>#{formatOrderId(order.id)}</h3>
                    <p className="order-date">
                      {new Date(order.created_at).toLocaleString('id-ID')}
                    </p>
                  </div>
                  <div className="order-status">
                    {getStatusIcon(order.status)}
                    <span>{getStatusText(order.status)}</span>
                  </div>
                </div>

                <div className="order-items">
                  {order.order_items.map((item) => (
                    <div key={item.id} className="order-item">
                      <div className="item-details">
                        <span className="item-name">{item.menu_item_name}</span>
                        {getVariantText(item.variant) && (
                          <span className="item-variant">({getVariantText(item.variant)})</span>
                        )}
                        <span className="item-quantity">x{item.quantity}</span>
                      </div>
                      <div className="item-price">
                        {formatPrice(item.subtotal)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="order-total">
                  <strong>
                    Total: {formatPrice(order.total_amount)} ({order.total_items} item)
                  </strong>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default OrderHistory;