import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import TableOrder from './pages/TableOrder';
import Cart from './pages/Cart';
import OrderConfirmation from './pages/OrderConfirmation';
import OrderHistory from './pages/OrderHistory';
import TableNotFound from './pages/TableNotFound';
import './App.css';

// Valid table numbers (1-5)
const VALID_TABLES = [1, 2, 3, 4, 5];

// Component to validate table number
const ValidatedTableRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const tableNumber = window.location.pathname.split('/')[2];
  const tableNum = parseInt(tableNumber);
  
  if (!tableNumber || isNaN(tableNum) || !VALID_TABLES.includes(tableNum)) {
    return <TableNotFound />;
  }
  
  return children;
};

const App: React.FC = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Navigate to="/meja/1" replace />} />
        <Route 
          path="/meja/:tableNumber" 
          element={
            <ValidatedTableRoute>
              <TableOrder />
            </ValidatedTableRoute>
          } 
        />
        <Route 
          path="/meja/:tableNumber/cart" 
          element={
            <ValidatedTableRoute>
              <Cart />
            </ValidatedTableRoute>
          } 
        />
        <Route 
          path="/meja/:tableNumber/confirmation" 
          element={
            <ValidatedTableRoute>
              <OrderConfirmation />
            </ValidatedTableRoute>
          } 
        />
        <Route 
          path="/meja/:tableNumber/history" 
          element={
            <ValidatedTableRoute>
              <OrderHistory />
            </ValidatedTableRoute>
          } 
        />
        <Route path="/table-not-found" element={<TableNotFound />} />
        <Route path="*" element={<Navigate to="/meja/1" replace />} />
      </Routes>
    </div>
  );
};

export default App;