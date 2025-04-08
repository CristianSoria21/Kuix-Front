import React, { useEffect, useState } from 'react';
import MainCard from 'components/MainCard';
import ClientsHeader from '../../sections/clients/ClientsHeader';
import ClientsContent from '../../sections/clients/ClientsContent';
import { getClients } from 'hooks/api/useClients';

export default function ClientsPage() {
  const [tableState, setTableState] = useState({
    data: [],
    columns: [],
    loading: true
  });

  const fetchData = async () => {
    setTableState((prev) => ({ ...prev, loading: true }));
    const response = await getClients();
    if (response) {
      setTableState({
        data: response.data,
        columns: response.columns,
        loading: false
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <MainCard title="Página de Clientes">
      <ClientsHeader tableRefresh={fetchData} />
      <ClientsContent tableState={tableState} />
    </MainCard>
  );
}
