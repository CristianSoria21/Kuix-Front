import React from 'react';

const ClientsHeader = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', backgroundColor: '#f5f5f5' }}>
      <button
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
        onClick={() => alert('Crear cliente')}
      >
        Crear Cliente
      </button>
      <input
        type="text"
        placeholder="Buscar clientes..."
        style={{ padding: '0.5rem', width: '300px', border: '1px solid #ccc', borderRadius: '4px' }}
        onChange={(e) => console.log('Buscando:', e.target.value)}
      />
    </div>
  );
};

export default ClientsHeader;
