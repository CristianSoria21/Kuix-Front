import React, { useEffect, useState } from 'react';
import { TableComponent } from '../../components/Tables/TableComponent';
import { getClients } from '../../api/clientApi';

const ClientsList = () => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await getClients();
      if (response) {
        setData(response.data);
        setColumns(response.columns);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return <>{loading ? <p>Cargando clientes...</p> : <TableComponent data={data} columns={columns} />}</>;
};

export default ClientsList;
