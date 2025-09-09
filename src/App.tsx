import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import TableOrder from './pages/TableOrder';
import Cart from './pages/Cart';
import OrderConfirmation from './pages/OrderConfirmation';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Navigate to="/meja/1" replace />} />
        <Route path="/meja/:tableNumber" element={<TableOrder />} />
        <Route path="/meja/:tableNumber/cart" element={<Cart />} />
        <Route path="/meja/:tableNumber/confirmation" element={<OrderConfirmation />} />
        <Route path="*" element={<Navigate to="/meja/1" replace />} />
      </Routes>
    </div>
  );
};

export default App;