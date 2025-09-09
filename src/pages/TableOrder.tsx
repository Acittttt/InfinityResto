import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import MenuDisplay from '../components/MenuDisplay';
import ItemCustomizationModal from '../components/ItemCustomizationModal';
import type { MenuItem } from '../data/menuData';

const TableOrder: React.FC = () => {
  const { tableNumber } = useParams<{ tableNumber: string }>();
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleItemSelect = (item: MenuItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <Layout tableNumber={tableNumber || '1'}>
      <MenuDisplay onItemSelect={handleItemSelect} />
      
      {selectedItem && (
        <ItemCustomizationModal
          item={selectedItem}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </Layout>
  );
};

export default TableOrder;