import React, { useEffect, useState } from 'react';
import MainCard from 'components/MainCard';
import ClientsHeader from '../../sections/clients/ClientsHeader';
import ClientsContent from '../../sections/clients/ClientsContent';
import { getClients } from 'hooks/api/useClients';

export default function ClientsPage() {
  const [clientsData, setClientsData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => getClients(setClientsData, setLoading);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <MainCard title="Página de Clientes">
      <ClientsHeader tableRefresh={fetchData} />
      <ClientsContent clientsData={clientsData} loading={loading} tableRefresh={fetchData} />
    </MainCard>
  );
}
