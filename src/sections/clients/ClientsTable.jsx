import PropTypes from 'prop-types';
import { useReactTable, getCoreRowModel, getPaginationRowModel, flexRender } from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Stack, Box, Button } from '@mui/material';

// project imports
import { TablePagination } from '../../components/Tables/TablePagination';
import MainCard from 'components/MainCard';

// ==============================|| TABLA DE CLIENTES ||============================== //

export function ClientsTable({ data }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  });

  return (
    <MainCard content={false}>
      <Stack>
        <TableContainer>
          <Table>
            <TableHead>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableCell key={header.id}>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </TableCell>
                  ))}
                  <TableCell>Acciones</TableCell>
                </TableRow>
              ))}
            </TableHead>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ p: 2 }}>
          <TablePagination
            setPageSize={table.setPageSize}
            setPageIndex={table.setPageIndex}
            getState={table.getState}
            getPageCount={table.getPageCount}
          />
        </Box>
      </Stack>
    </MainCard>
  );
}

ClientsTable.propTypes = {
  data: PropTypes.array.isRequired
};
