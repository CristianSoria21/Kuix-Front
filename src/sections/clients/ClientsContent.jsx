import React, { useEffect, useState } from 'react';
import { TableComponent } from '../../components/Tables/TableComponent';

const ClientsContent = ({ tableState }) => {
  return (
    <>
      {tableState?.loading ? (
        <p>Cargando clientes...</p>
      ) : (
        <TableComponent data={tableState?.data} columns={tableState?.columns} />
      )}
    </>
  );
};

export default ClientsContent;
