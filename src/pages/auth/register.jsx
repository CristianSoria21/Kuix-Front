import { Link } from 'react-router-dom';

// material-ui
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project-imports
import Logo from 'components/logo';
import AuthWrapper from 'sections/auth/AuthWrapper';
import AuthRegister from 'sections/auth/auth-forms/AuthRegister';

// ================================|| REGISTER ||================================ //

export default function Register() {
  return (
    <AuthWrapper>
      <Grid container spacing={4}>
        <Grid sx={{ textAlign: 'center' }} size={12}>
          <Logo />
        </Grid>

        <Grid size={12}>
          <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'baseline', mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="h3">Registrate</Typography>
            <Typography component={Link} to={'auth/login'} variant="body1" sx={{ textDecoration: 'none' }} color="primary">
              ¿Ya tienes una cuenta? Inicia sesión
            </Typography>
          </Stack>
        </Grid>

        <Grid size={12}>
          <AuthRegister />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
}
