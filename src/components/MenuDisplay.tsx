import React, { useState } from 'react';
import { getMenuByCategory, getSubcategoriesByCategory, getMenuBySubcategory, formatPrice } from '../data/menuData';
import type { MenuItem } from '../data/menuData';

interface MenuDisplayProps {
  onItemSelect: (item: MenuItem) => void;
}

const MenuDisplay: React.FC<MenuDisplayProps> = ({ onItemSelect }) => {
  const [activeCategory, setActiveCategory] = useState<'makanan' | 'minuman'>('makanan');
  const [activeSubcategory, setActiveSubcategory] = useState<string>('all');

  const subcategories = getSubcategoriesByCategory(activeCategory);
  
  const menuItems = activeSubcategory === 'all' 
    ? getMenuByCategory(activeCategory)
    : getMenuBySubcategory(activeCategory, activeSubcategory);

  const handleCategoryChange = (category: 'makanan' | 'minuman') => {
    setActiveCategory(category);
    setActiveSubcategory('all'); // Reset subcategory when changing main category
  };

  return (
    <div className="menu-display">
      {/* Category Tabs */}
      <div className="category-tabs">
        <button
          className={`tab ${activeCategory === 'makanan' ? 'active' : ''}`}
          onClick={() => handleCategoryChange('makanan')}
        >
          🍽️ Makanan
        </button>
        <button
          className={`tab ${activeCategory === 'minuman' ? 'active' : ''}`}
          onClick={() => handleCategoryChange('minuman')}
        >
          🥤 Minuman
        </button>
      </div>

      {/* Subcategory Filter */}
      <div className="subcategory-filters">
        <button
          className={`filter-button ${activeSubcategory === 'all' ? 'active' : ''}`}
          onClick={() => setActiveSubcategory('all')}
        >
          Semua
        </button>
        {subcategories.map((subcategory) => (
          <button
            key={subcategory}
            className={`filter-button ${activeSubcategory === subcategory ? 'active' : ''}`}
            onClick={() => setActiveSubcategory(subcategory)}
          >
            {subcategory}
          </button>
        ))}
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
              <p className="item-subcategory">{item.subcategory}</p>
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