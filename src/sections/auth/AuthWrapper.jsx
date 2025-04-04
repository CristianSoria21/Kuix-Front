import PropTypes from 'prop-types';

// material-ui
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';

// project-imports
import AuthCard from './AuthCard';

// assets
import AuthSideImg from 'assets/images/auth/img-auth-sideimg.png';

// ==============================|| AUTHENTICATION - WRAPPER ||============================== //

export default function AuthWrapper({ children }) {
  return (
    <Box sx={{ minHeight: '100vh' }}>
      <Grid container direction="column" sx={{ justifyContent: 'center', minHeight: '100vh', bgcolor: 'background.paper' }}>
        <Grid
          size={12}
          container
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: { xs: 'calc(100vh - 210px)', sm: 'calc(100vh - 134px)', md: 'calc(100vh - 112px)' }
          }}
        >
          <Grid sx={{ display: { xs: 'none', md: 'flex' }, alignSelf: 'center', justifyContent: 'flex-start' }} size={{ md: 6.5 }}>
            <CardMedia component="img" src={AuthSideImg} alt="Authimg" sx={{ height: '100vh', minHeight: 1 }} />
          </Grid>

          <Grid sx={{ display: 'flex', justifyContent: 'center' }} size={{ md: 5.5 }}>
            <AuthCard border={false}>{children}</AuthCard>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

AuthWrapper.propTypes = { children: PropTypes.node };
