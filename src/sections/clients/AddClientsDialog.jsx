import React from 'react';
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
import { createClientFacturaApi } from '../../hooks/api/useClients';
import { PopupTransition } from 'components/@extended/Transitions';
import { clientValidationSchema } from 'utils/validations/clientValidation';
import { fetcher } from 'utils/axios';
import { validateRFC } from '../../hooks/api/useOthers';

const AddClientsDialog = ({ open, onClose, tableRefresh }) => {
  const { data: regimes, error: regimesError } = useSWR('api/tools/regimes', fetcher, {
    revalidateOnFocus: false,
    refreshInterval: 0
  });

  return (
    <Formik
      initialValues={{
        legal_name: '',
        tax_id: '',
        tax_system: '',
        contry: '',
        zip: '',
        street: '',
        exterior: '',
        email: '',
        phone: '',
        foreign: false
      }}
      validationSchema={clientValidationSchema}
      onSubmit={(values, { resetForm }) => {
        createClientFacturaApi(values).then((status) => {
          if (status) {
            tableRefresh();
            resetForm();
            onClose();
          }
        });
      }}
    >
      {({ values, errors, touched, handleChange, handleBlur }) => (
        <Form autoComplete="on">
          <Dialog
            open={open}
            TransitionComponent={PopupTransition}
            keepMounted
            onClose={onClose}
            aria-describedby="dialog-create-client"
          >
            <Box sx={{ p: 1, py: 1.5 }}>
              <DialogTitle>CREAR NUEVO CLIENTE</DialogTitle>
              <DialogContent>
                <DialogContentText id="dialog-create-client">
                  Por favor completa los datos del cliente correctamente.
                </DialogContentText>

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
                      {regimesError ? (
                        <MenuItem disabled>Error al cargar regímenes</MenuItem>
                      ) : regimes?.data?.length > 0 ? (
                        regimes.data.map((option) => (
                          <MenuItem key={option.id} value={option.code}>
                            {option.code} - {option.regimen}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem disabled>Cargando regímenes...</MenuItem>
                      )}
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
              </DialogContent>

              <DialogActions>
                <Button color="error" onClick={onClose}>
                  Cancelar
                </Button>
                <Button variant="contained" type="submit">
                  Guardar
                </Button>
              </DialogActions>
            </Box>
          </Dialog>
        </Form>
      )}
    </Formik>
  );
};

export default AddClientsDialog;
