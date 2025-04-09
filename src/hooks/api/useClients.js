import axiosServices from '../../utils/axios';
import { openSnackbar, handlerIconVariants } from 'api/snackbar';
import { enqueueSnackbar } from 'notistack';
import Grow from '@mui/material/Grow';

const key = localStorage.getItem('apiKey');

export const getClients = async (setClientsData, setLoading) => {
  try {
    setLoading(true);
    const response = await axiosServices.post(`/api/client/show-all-clients/${1}`, { key });

    response.data.status
      ? setClientsData(response.data.data.data)
      : enqueueSnackbar(response.data.message, {
          variant: 'warning',
          TransitionComponent: Grow,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center'
          }
        });
  } catch (error) {
    enqueueSnackbar(error.message, {
      variant: 'error',
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'center'
      }
    });
  } finally {
    setLoading(false);
  }
};

export const createClient = async (values) => {
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

export const deleteClient = async (id) => {
  try {
    const response = await axiosServices.post(`/api/client/delete/${id}`, { key });
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

export const editClient = async (id) => {
  try {
    const response = await axiosServices.post(`/api/client/delete/${id}`, { key });
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
