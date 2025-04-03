// material-ui
import Typography from '@mui/material/Typography';

// project-imports
import MainCard from 'components/MainCard';
import { TableComponent } from '../../components/Tables/TableComponent';

// ==============================|| SAMPLE PAGE ||============================== //

export default function clientsPage() {
  return (
    <MainCard title="Pagina de Clientes">
      <Typography variant="body1">PAGINA PARA LOS CLIENTES</Typography>
      <TableComponent data={data} columns={columns} />
    </MainCard>
  );
}

const columns = [
  {
    header: 'ID',
    accessorKey: 'id'
  },
  {
    header: 'Nombre',
    accessorKey: 'name'
  },
  {
    header: 'Correo Electrónico',
    accessorKey: 'email'
  },
  {
    header: 'Edad',
    accessorKey: 'age'
  }
];

const data = [
  { id: 1, name: 'Juan Pérez', email: 'juan@example.com', age: 28 },
  { id: 2, name: 'María López', email: 'maria@example.com', age: 34 },
  { id: 3, name: 'Carlos Ramírez', email: 'carlos@example.com', age: 25 },
  { id: 1, name: 'Juan Pérez', email: 'juan@example.com', age: 28 },
  { id: 2, name: 'María López', email: 'maria@example.com', age: 34 },
  { id: 3, name: 'Carlos Ramírez', email: 'carlos@example.com', age: 25 },
  { id: 1, name: 'Juan Pérez', email: 'juan@example.com', age: 28 },
  { id: 2, name: 'María López', email: 'maria@example.com', age: 34 },
  { id: 3, name: 'Carlos Ramírez', email: 'carlos@example.com', age: 25 },
  { id: 1, name: 'Juan Pérez', email: 'juan@example.com', age: 28 },
  { id: 2, name: 'María López', email: 'maria@example.com', age: 34 },
  { id: 3, name: 'Carlos Ramírez', email: 'carlos@example.com', age: 25 },
  { id: 1, name: 'Juan Pérez', email: 'juan@example.com', age: 28 },
  { id: 2, name: 'María López', email: 'maria@example.com', age: 34 },
  { id: 3, name: 'Carlos Ramírez', email: 'carlos@example.com', age: 25 },
];
