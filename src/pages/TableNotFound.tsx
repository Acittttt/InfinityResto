import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

const TableNotFound: React.FC = () => {
  const navigate = useNavigate();

  const handleGoToTable = (tableNumber: number) => {
    navigate(`/meja/${tableNumber}`);
  };

  return (
    <div className="table-not-found">
      <div className="error-container">
        <div className="error-icon">
          <AlertTriangle size={64} color="#e74c3c" />
        </div>
        
        <h1>Meja Tidak Ditemukan</h1>
        <p>Nomor meja yang Anda cari tidak tersedia.</p>
        <p>Silakan pilih salah satu meja yang tersedia di bawah ini:</p>
        
        <div className="available-tables">
          <h3>Meja Tersedia:</h3>
          <div className="table-buttons">
            {[1, 2, 3, 4, 5].map((tableNum) => (
              <button
                key={tableNum}
                onClick={() => handleGoToTable(tableNum)}
                className="table-button"
              >
                Meja {tableNum}
              </button>
            ))}
          </div>
        </div>
        
        <div className="help-text">
          <p><strong>Tip:</strong> Pastikan Anda memindai QR Code yang benar pada meja Anda.</p>
        </div>
      </div>
    </div>
  );
};

export default TableNotFound;