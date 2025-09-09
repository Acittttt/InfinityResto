import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Home, History } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  tableNumber: string;
}

const Layout: React.FC<LayoutProps> = ({ children, tableNumber }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = useCart();

  const handleGoToCart = () => {
    navigate(`/meja/${tableNumber}/cart`);
  };

  const handleGoToMenu = () => {
    navigate(`/meja/${tableNumber}`);
  };

  const handleGoToHistory = () => {
    navigate(`/meja/${tableNumber}/history`);
  };

  const isCartPage = location.pathname.includes('/cart');
  const isConfirmationPage = location.pathname.includes('/confirmation');
  const isHistoryPage = location.pathname.includes('/history');

  return (
    <div className="layout">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="restaurant-info">
            <h1>Infinity Resto</h1>
            <p>Pesanan untuk Meja {tableNumber}</p>
          </div>
          
          {!isConfirmationPage && (
            <div className="header-actions">
              {!isCartPage && !isHistoryPage && (
                <button onClick={handleGoToMenu} className="menu-button">
                  <Home size={20} />
                  Menu
                </button>
              )}
              
              {!isHistoryPage && (
                <button onClick={handleGoToHistory} className="history-button">
                  <History size={20} />
                  Riwayat
                </button>
              )}
              
              <button onClick={handleGoToCart} className="cart-button">
                <ShoppingCart size={20} />
                Keranjang
                {state.totalItems > 0 && (
                  <span className="cart-badge">{state.totalItems}</span>
                )}
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {children}
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 Infinity Resto. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;