import React, { useState } from 'react';
import { getMenuByCategory, formatPrice } from '../data/menuData';
import type { MenuItem } from '../data/menuData';

interface MenuDisplayProps {
  onItemSelect: (item: MenuItem) => void;
}

const MenuDisplay: React.FC<MenuDisplayProps> = ({ onItemSelect }) => {
  const [activeCategory, setActiveCategory] = useState<'makanan' | 'minuman'>('makanan');

  const menuItems = getMenuByCategory(activeCategory);

  return (
    <div className="menu-display">
      {/* Category Tabs */}
      <div className="category-tabs">
        <button
          className={`tab ${activeCategory === 'makanan' ? 'active' : ''}`}
          onClick={() => setActiveCategory('makanan')}
        >
          🍽️ Makanan
        </button>
        <button
          className={`tab ${activeCategory === 'minuman' ? 'active' : ''}`}
          onClick={() => setActiveCategory('minuman')}
        >
          🥤 Minuman
        </button>
      </div>

      {/* Menu Items Grid */}
      <div className="menu-grid">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className="menu-item-card"
            onClick={() => onItemSelect(item)}
          >
            <div className="menu-item-image">
              {/* Placeholder for item image */}
              <div className="image-placeholder">
                {activeCategory === 'makanan' ? '🍽️' : '🥤'}
              </div>
            </div>
            
            <div className="menu-item-info">
              <h3 className="item-name">{item.name}</h3>
              <p className="item-description">{item.description}</p>
              <div className="item-price">
                {formatPrice(item.price)}
              </div>
            </div>
            
            <div className="item-action">
              <button className="add-button">
                Pilih
              </button>
            </div>
          </div>
        ))}
      </div>

      {menuItems.length === 0 && (
        <div className="empty-menu">
          <p>Tidak ada item dalam kategori ini.</p>
        </div>
      )}
    </div>
  );
};

export default MenuDisplay;