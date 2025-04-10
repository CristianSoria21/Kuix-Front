import React, { useEffect, useState } from 'react';
import { TableComponent } from 'components/Tables/TableComponent';
import { Stack, Tooltip } from '@mui/material';
import IconButton from 'components/@extended/IconButton';
import { UserEdit, UserRemove } from 'iconsax-react';

import { deleteClient, editClient } from '../../hooks/api/useClients';
import { ConfirmationDialog } from 'components/ConfirmationDialog';
import ClientsDialog from './ClientsDialog';
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
              <IconButton color="info" size="inherit" onClick={() => hanndleAction('edit', client)}>
                <UserEdit size="28" variant="Bulk" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Eliminar">
              <IconButton color="error" size="inherit" onClick={() => hanndleAction('delete', client)}>
                <UserRemove size="28" variant="Bulk" />
              </IconButton>
            </Tooltip>
          </Stack>
        );
      }
    }
  ];
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  const hanndleAction = (action, client) => {
    console.log(client);
    action === 'edit' ? setOpenEditDialog(true) : setOpenDeleteDialog(true);
    setSelectedClient(client);
  };

  const handleConfirmDelete = () => {
    console.log('Eliminar cliente:', selectedClient);
    deleteClient(selectedClient.id).then((status) => {
      if (status) {
        tableRefresh();
        setOpenDeleteDialog(false);
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
            open={openDeleteDialog}
            titleText="¿Eliminar cliente?"
            contentText={`¿Estás seguro de que deseas eliminar al cliente "${selectedClient?.legal_name}" ?`}
            confirmationText="Eliminar"
            onClose={() => {
              setOpenDeleteDialog(false);
              setSelectedClient(null);
            }}
            onConfirm={handleConfirmDelete}
          />
          <ClientsDialog
            open={openEditDialog}
            onClose={() => {
              setOpenEditDialog(false);
              setSelectedClient(null);
            }}
            tableRefresh={tableRefresh}
            clientToEdit={selectedClient}
          />
        </>
      )}
    </>
  );
};

export default ClientsContent;
