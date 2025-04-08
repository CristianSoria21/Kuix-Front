import { enqueueSnackbar } from 'notistack';
import axiosServices from '../../utils/axios';

const key = localStorage.getItem('apiKey');

/**
 * Obtiene la lista de todos los regimes
 * @returns {Object} { data, columns, page, totalPages, error, success }
 */
export const getRegimes = async () => {
  try {
    const response = await axiosServices.get('api/tools/regimes');
    return response.data.data;
  } catch (error) {
    console.log('Error al consultarlos regimes', error);
    return null;
  }
};

export const validateRFC = async (rfc) => {
  try {
    const response = await axiosServices.post(`api/client/validateRfc/${rfc}`, { key });
    const { status, message } = response.data;

    enqueueSnackbar(message, {
      variant: status ? 'info' : 'warning',
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'center'
      }
    });
  } catch (error) {
    enqueueSnackbar('Error al validar el RFC', {
      variant: 'error',
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'center'
      }
    });
  }
};
