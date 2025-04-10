import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { UserAdd } from 'iconsax-react';
import Grid from '@mui/material/Grid2';
import ClientsDialog from './ClientsDialog';

const ClientsHeader = ({ tableRefresh }) => {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <>
      <Grid container spacing={2} mb={2} alignItems="center" justifyContent="space-between">
        <Grid size={8}>
          <TextField id="outlined-basic-fullwidth" label="Buscar Clientes" fullWidth disabled={true} />
        </Grid>
        <Grid size={4} display="flex" justifyContent="flex-end">
          <Button variant="shadow" startIcon={<UserAdd />} onClick={() => setOpenDialog(true)}>
            Agregar Cliente
          </Button>
        </Grid>
      </Grid>

      <ClientsDialog open={openDialog} onClose={() => setOpenDialog(false)} tableRefresh={tableRefresh} />
    </>
  );
};

export default ClientsHeader;
