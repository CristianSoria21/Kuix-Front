import axiosServices from '../../utils/axios';
import { openSnackbar, handlerIconVariants } from 'api/snackbar';
import { enqueueSnackbar } from 'notistack';
import Grow from '@mui/material/Grow';

const key = localStorage.getItem('apiKey');

/**
 * Obtiene la lista de clientes paginados.
 * @param {number} page - Número de página.
 * @param {string} search - Filtro de búsqueda opcional.
 * @returns {Object} { data, columns, page, totalPages, error, success }
 */
export const getClients = async (page = 1, search = '') => {
  const url = search.length === 0 ? `/api/client/show-all-clients/${page}` : `/api/client/show/${page}/${search}`;

  try {
    const response = await axiosServices.post(url, { key });

    if (!response.data.status) {
      console.log(response.data.message);
      return null;
    }

    const { data } = response.data;

    return {
      data: data.data,
      columns: Object.keys(data.data[0] || {}).map((key) => ({
        accessorKey: key, // Asegúrate de incluir el id
        header: key // Puedes personalizar el texto del header aquí
      })),
      page: data.page,
      totalPages: data.total_pages
    };
  } catch (error) {
    console.log('Error en el servidor', error);
    return null;
  }
};

/**
 * CREATE CLIENT
 * @param {Object} values - datos del cliente a crear.
 * @returns {boolean} - con exito o error.
 */
export const createClientFacturaApi = async (values) => {
  try {
    const response = await axiosServices.post('api/client/create', { key, client: values });
    const { status, message } = response.data;

    enqueueSnackbar(message, {
      variant: status ? 'success' : 'warning',
      TransitionComponent: Grow,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'center'
      }
    });
    return status;
  } catch (error) {
    enqueueSnackbar(error.message, {
      variant: 'error',
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'center'
      }
    });
    return null;
  }
};
