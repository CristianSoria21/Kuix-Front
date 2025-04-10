import React, { useState, useRef } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  DialogContentText,
  MenuItem
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Formik, Form } from 'formik';
import useSWR from 'swr';

//project-imports
import { createClient, editClient } from '../../hooks/api/useClients';
import { PopupTransition } from 'components/@extended/Transitions';
import { clientValidationSchema } from 'utils/validations/clientValidation';
import { fetcher } from 'utils/axios';
import { validateRFC } from '../../hooks/api/useOthers';

const ClientsDialog = ({ open, onClose, tableRefresh, clientToEdit }) => {
  const formikRef = useRef();

  const { data: regimes } = useSWR('api/tools/regimes', fetcher, {
    revalidateOnFocus: false,
    refreshInterval: 0
  });

  return (
    <Dialog
      open={open}
      TransitionComponent={PopupTransition}
      keepMounted
      onClose={onClose}
      aria-describedby="dialog-create-client"
    >
      <Box sx={{ p: 1, py: 1.5 }}>
        <DialogTitle>{clientToEdit ? 'EDITAR CLIENTE' : 'CREAR NUEVO CLIENTE'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="dialog-create-client" sx={{ mb: 1.5 }}>
            {clientToEdit ? (
              <>
                Editar los datos del cliente <b>{clientToEdit?.legal_name}.</b>
              </>
            ) : (
              'Completa los datos del cliente correctamente.'
            )}
          </DialogContentText>

          <Formik
            enableReinitialize
            innerRef={formikRef}
            initialValues={{
              id: clientToEdit?.id || '',
              legal_name: clientToEdit?.legal_name || '',
              tax_id: clientToEdit?.tax_id || '',
              tax_system: clientToEdit?.tax_system || '',
              country: clientToEdit?.address.country || '',
              zip: clientToEdit?.address.zip || '',
              street: clientToEdit?.address.street || '',
              exterior: clientToEdit?.address.exterior || '',
              email: clientToEdit?.email || '',
              phone: clientToEdit?.phone || '',
              foreign: clientToEdit?.foreign || false
            }}
            validationSchema={clientValidationSchema}
            onSubmit={(values, { resetForm }) => {
              const action = clientToEdit ? editClient : createClient;
              action(values).then((status) => status && (onClose(), tableRefresh(), resetForm()));
            }}
          >
            {({ values, errors, touched, handleChange, handleBlur }) => (
              <Form autoComplete="on">
                <Grid container spacing={1}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      margin="dense"
                      name="legal_name"
                      label="Razón Social"
                      fullWidth
                      required
                      value={values.legal_name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.legal_name && Boolean(errors.legal_name)}
                      helperText={touched.legal_name && errors.legal_name}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      margin="dense"
                      name="tax_id"
                      label="RFC del cliente"
                      fullWidth
                      required
                      value={values.tax_id}
                      onChange={handleChange}
                      onBlur={async (e) => {
                        handleBlur(e);
                        const rfc = e.target.value;
                        if (!rfc || rfc.length < 12 || Boolean(errors.tax_id)) return;
                        validateRFC(rfc);
                      }}
                      error={touched.tax_id && Boolean(errors.tax_id)}
                      helperText={touched.tax_id && errors.tax_id}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 7 }}>
                    <TextField
                      select
                      margin="dense"
                      name="tax_system"
                      label="Régimen del cliente"
                      fullWidth
                      required
                      value={values.tax_system}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.tax_system && Boolean(errors.tax_system)}
                      helperText={touched.tax_system && errors.tax_system}
                    >
                      {regimes?.data.map((option) => (
                        <MenuItem key={option.id} value={option.code}>
                          {option.code} - {option.regimen}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  <Grid size={{ xs: 12, sm: 5 }}>
                    <TextField
                      margin="dense"
                      name="email"
                      label="Email"
                      fullWidth
                      required
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 3 }}>
                    <TextField
                      margin="dense"
                      name="phone"
                      label="Teléfono"
                      fullWidth
                      required
                      value={values.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.phone && Boolean(errors.phone)}
                      helperText={touched.phone && errors.phone}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 2.5 }}>
                    <TextField
                      margin="dense"
                      name="zip"
                      label="Código Postal"
                      fullWidth
                      required
                      value={values.zip}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.zip && Boolean(errors.zip)}
                      helperText={touched.zip && errors.zip}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 4 }}>
                    <TextField
                      margin="dense"
                      name="street"
                      label="Calle"
                      fullWidth
                      required
                      value={values.street}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.street && Boolean(errors.street)}
                      helperText={touched.street && errors.street}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 2.5 }}>
                    <TextField
                      margin="dense"
                      name="exterior"
                      label="#Número exterior"
                      fullWidth
                      required
                      value={values.exterior}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.exterior && Boolean(errors.exterior)}
                      helperText={touched.exterior && errors.exterior}
                    />
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="contained" onClick={() => formikRef.current?.submitForm()}>
            Guardar
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default ClientsDialog;
