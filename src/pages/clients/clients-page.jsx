// material-ui
import Typography from '@mui/material/Typography';

// project-imports
import MainCard from 'components/MainCard';
import ClientsList from '../../sections/clients/ClientsList';
// ==============================|| SAMPLE PAGE ||============================== //

export default function clientsPage() {
  return (
    <MainCard title="Pagina de Clientes">
      <Typography variant="body1">PAGINA PARA LOS CLIENTES</Typography>
      <ClientsList />
    </MainCard>
  );
}




