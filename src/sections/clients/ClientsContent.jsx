import React, { useEffect, useState } from 'react';
import { TableComponent } from 'components/Tables/TableComponent';
import { Stack, Tooltip } from '@mui/material';
import IconButton from 'components/@extended/IconButton';
import { UserEdit, UserRemove } from 'iconsax-react';

import { deleteClient, editClient } from '../../hooks/api/useClients';
import { ConfirmationDialog } from 'components/ConfirmationDialog';

const ClientsContent = ({ clientsData, loading, tableRefresh }) => {
  const columns = [
    {
      header: 'ID',
      accessorKey: 'id',
      cell: (info) => info.getValue()
    },
    {
      header: 'Nombre Legal',
      accessorKey: 'legal_name',
      cell: (info) => info.getValue()
    },
    {
      header: 'RFC',
      accessorKey: 'tax_id',
      cell: (info) => info.getValue()
    },
    {
      header: 'Teléfono',
      accessorKey: 'phone',
      cell: (info) => info.getValue()
    },
    {
      header: 'Correo',
      accessorKey: 'email',
      cell: (info) => info.getValue()
    },
    {
      header: 'Dirección',
      accessorKey: 'address',
      cell: (info) => {
        const address = info.getValue();
        return (
          <div>
            {address.street} {address.exterior},<br />
            {address.city}, {address.state},<br />
            {address.country}, C.P. {address.zip}
          </div>
        );
      }
    },
    {
      header: 'Acciones',
      id: 'actions',
      cell: ({ row }) => {
        const client = row.original;
        return (
          <Stack direction="column" spacing={1}>
            <Tooltip title="Editar">
              <IconButton color="info" size="inherit" onClick={() => handleEdit(client)}>
                <UserEdit size="28" variant="Bulk" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Eliminar">
              <IconButton color="error" size="inherit" onClick={() => handleDelete(client)}>
                <UserRemove size="28" variant="Bulk" />
              </IconButton>
            </Tooltip>
          </Stack>
        );
      }
    }
  ];
  const [editDialog, setEditDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  const handleEdit = (client) => {
    console.log('Editar cliente:', client);
    // Tu lógica para editar aquí
  };
  const handleDelete = (client) => {
    setSelectedClient(client);
    setDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    console.log('Eliminar cliente:', selectedClient);
    deleteClient(selectedClient.id).then((status) => {
      if (status) {
        tableRefresh();
        setDeleteDialog(false);
        setSelectedClient(null);
      }
    });
  };

  return (
    <>
      {loading ? (
        <p>Cargando clientes...</p>
      ) : (
        <>
          <TableComponent data={clientsData} columns={columns} />
          <ConfirmationDialog
            open={deleteDialog}
            titleText="¿Eliminar cliente?"
            contentText={`¿Estás seguro de que deseas eliminar al cliente "${selectedClient?.legal_name}" ?`}
            confirmationText="Eliminar"
            onClose={() => {
              setDeleteDialog(false);
              setSelectedClient(null);
            }}
            onConfirm={handleConfirmDelete}
          />
        </>
      )}
    </>
  );
};

export default ClientsContent;
