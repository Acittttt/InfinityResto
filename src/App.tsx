import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import TableOrder from './pages/TableOrder';
import Cart from './pages/Cart';
import OrderConfirmation from './pages/OrderConfirmation';

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

export default App
