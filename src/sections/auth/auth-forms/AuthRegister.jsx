import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

// material-ui
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid2';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

// third-party
import { Formik } from 'formik';
import * as Yup from 'yup';

// project-imports
import { openSnackbar } from 'api/snackbar';
import IconButton from 'components/@extended/IconButton';
import AnimateButton from 'components/@extended/AnimateButton';
import useAuth from 'hooks/useAuth';
import useScriptRef from 'hooks/useScriptRef';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

// assets
import { Eye, EyeSlash } from 'iconsax-react';

// ============================|| JWT - REGISTER ||============================ //

export default function AuthRegister() {
  const { register } = useAuth();
  const scriptedRef = useScriptRef();
  const navigate = useNavigate();

  const [level, setLevel] = useState();
  const [showPassword, setShowPassword] = useState({ password: false, repeatPassword: false });

  const handleClickShowPassword = (name) => {
    setShowPassword((prev) => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp));
  };

  useEffect(() => {
    changePassword('');
  }, []);

  return (
    <Formik
      initialValues={{
        name: '',
        legal_name: '',
        email: '',
        country_code: '52',
        phone: '',
        password: '',
        repeatPassword: '',
        submit: null
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().max(255).required('Nombre del usario es requerido'),
        legal_name: Yup.string().max(255).required('Razon Social es requerido'),
        email: Yup.string().email('Debe de ser un correo valido').max(255).required('Correo electronico requerido'),
        phone: Yup.string().matches(/^\d+$/, 'Debe ser unnnumero de telefono valido').required('Telefono es requerido'),
        password: Yup.string()
          .required('Contraseña es requerida')
          .min(8, 'La contraseña debe tener al menos 8 caracteres')
          .matches(/[A-Z]/, 'La contraseña debe contener al menos una mayúscula')
          .matches(/\d/, 'La contraseña debe contener al menos un número'),
        repeatPassword: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Las contraseñas no coiciden')
          .required('Debes de repetir la contraseña')
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          await register(
            values.name,
            values.legal_name,
            values.email,
            values.country_code,
            values.phone,
            values.password,
            values.repeatPassword
          );
          if (scriptedRef.current) {
            setStatus({ success: true });
            setSubmitting(false);
            openSnackbar({
              open: true,
              message: 'Su registro se ha completado exitosamente.',
              variant: 'alert',
              alert: { color: 'success' }
            });

            setTimeout(() => {
              navigate('/dashboard/default', { replace: true });
            }, 1500);
          }
        } catch (err) {
          console.error(err);
          if (scriptedRef.current) {
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
        }
      }}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form noValidate onSubmit={handleSubmit}>
          <Grid container spacing={1}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Stack sx={{ gap: 1 }}>
                <InputLabel htmlFor="name-signup">Nombre</InputLabel>
                <OutlinedInput
                  id="name-signup"
                  type="text"
                  value={values.name}
                  name="name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Nombre del usuario"
                  fullWidth
                  error={Boolean(touched.name && errors.name)}
                />
              </Stack>
              {touched.name && errors.name && <FormHelperText error>{errors.name}</FormHelperText>}
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Stack sx={{ gap: 1 }}>
                <InputLabel htmlFor="legal_name-signup">Razón Social</InputLabel>
                <OutlinedInput
                  fullWidth
                  error={Boolean(touched.legal_name && errors.legal_name)}
                  id="legal_name-signup"
                  type="text"
                  value={values.legal_name}
                  name="legal_name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Razón social."
                />
              </Stack>
              {touched.legal_name && errors.legal_name && <FormHelperText error>{errors.legal_name}</FormHelperText>}
            </Grid>
            <Grid size={12}>
              <Stack sx={{ gap: 1 }}>
                <InputLabel htmlFor="email-signup">Correo Electronico</InputLabel>
                <OutlinedInput
                  fullWidth
                  error={Boolean(touched.email && errors.email)}
                  id="email-signup"
                  type="email"
                  value={values.email}
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Correo electronico"
                />
              </Stack>
              {touched.email && errors.email && <FormHelperText error>{errors.email}</FormHelperText>}
            </Grid>

            <Grid size={12}>
              <InputLabel htmlFor="phone-signup">Telefono</InputLabel>
              <Stack direction={'row'} sx={{ gap: 1, mt: 1 }}>
                <FormControl sx={{ minWidth: 120 }}>
                  <Select
                    labelId="country-code-label"
                    id="country-code"
                    value={values.country_code}
                    onChange={handleChange}
                    name="country_code"
                  >
                    <MenuItem value="52">🇲🇽 +52</MenuItem>
                    <MenuItem value="1">🇺🇸 +1</MenuItem>
                    <MenuItem value="44">🇬🇧 +44</MenuItem>
                    <MenuItem value="33">🇫🇷 +33</MenuItem>
                    <MenuItem value="49">🇩🇪 +49</MenuItem>
                    <MenuItem value="34">🇪🇸 +34</MenuItem>
                  </Select>
                </FormControl>

                <OutlinedInput
                  fullWidth
                  error={Boolean(touched.phone && errors.phone)}
                  id="phone-signup"
                  type="tel"
                  value={values.phone}
                  name="phone"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Numero de telefono"
                />
              </Stack>
              {touched.phone && errors.phone && <FormHelperText error>{errors.phone}</FormHelperText>}
            </Grid>

            <Grid size={12}>
              <Stack sx={{ gap: 1 }}>
                <InputLabel htmlFor="password-signup">Contraseña</InputLabel>
                <OutlinedInput
                  fullWidth
                  error={Boolean(touched.password && errors.password)}
                  id="password-signup"
                  type={showPassword.password ? 'text' : 'password'}
                  value={values.password}
                  name="password"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    handleChange(e);
                    changePassword(e.target.value);
                  }}
                  placeholder="******"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => handleClickShowPassword('password')}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        color="secondary"
                      >
                        {showPassword.password ? <Eye /> : <EyeSlash />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </Stack>
              {touched.password && errors.password && <FormHelperText error>{errors.password}</FormHelperText>}
            </Grid>
            <Grid size={12}>
              <Stack sx={{ gap: 1 }}>
                <InputLabel htmlFor="repeatPassword-signup">Cofirmar Contraseña</InputLabel>
                <OutlinedInput
                  fullWidth
                  error={Boolean(touched.repeatPassword && errors.repeatPassword)}
                  type={showPassword.repeatPassword ? 'text' : 'password'}
                  id="repeatPassword-signup"
                  value={values.repeatPassword}
                  name="repeatPassword"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="******"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle repeat password visibility"
                        onClick={() => handleClickShowPassword('repeatPassword')}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        color="secondary"
                      >
                        {showPassword.repeatPassword ? <Eye /> : <EyeSlash />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </Stack>
              {touched.repeatPassword && errors.repeatPassword && <FormHelperText error>{errors.repeatPassword}</FormHelperText>}
            </Grid>

            <Grid size={12}>
              <FormControl fullWidth sx={{ mt: 0 }}>
                <Grid container spacing={2} sx={{ alignItems: 'center' }}>
                  <Grid>
                    <Box sx={{ bgcolor: level?.color, width: 85, height: 8, borderRadius: '7px' }} />
                  </Grid>
                  <Grid>
                    <Typography variant="subtitle1" sx={{ fontSize: '0.75rem' }}>
                      {level?.label}
                    </Typography>
                  </Grid>
                </Grid>
              </FormControl>
            </Grid>

            <Grid size={12}>
              <Typography variant="body2">
                Al registrarte, aceptas nuestros, &nbsp;
                <Link variant="subtitle2" component={RouterLink} to="#">
                  Terminos y codiciones
                </Link>
                &nbsp; y &nbsp;
                <Link variant="subtitle2" component={RouterLink} to="#">
                  Política de privacidad
                </Link>
              </Typography>
            </Grid>
            {errors.submit && (
              <Grid size={12}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Grid>
            )}
            <Grid size={12}>
              <AnimateButton>
                <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                  Crear Cuenta
                </Button>
              </AnimateButton>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
}
