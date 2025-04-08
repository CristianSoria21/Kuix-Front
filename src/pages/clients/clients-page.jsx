// material-ui
import Typography from '@mui/material/Typography';
// project-imports
import MainCard from 'components/MainCard';
import ClientsContent from '../../sections/clients/ClientsContent';
import ClientsHeader from '../../sections/clients/ClientsHeader';
// ==============================|| SAMPLE PAGE ||============================== //

export default function clientsPage() {
  return (
    <MainCard title="Pagina de Clientes">
      <ClientsHeader />
      <ClientsContent />
    </MainCard>
  );
}
