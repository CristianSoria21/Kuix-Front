import axiosServices from './../utils/axios';

/**
 * Obtiene la lista de clientes paginados.
 * @param {number} page - Número de página.
 * @param {string} search - Filtro de búsqueda opcional.
 * @returns {Object} { data, columns, page, totalPages, error, success }
 */
export const getClients = async (page = 1, search = '') => {
  const url = search.length === 0 ? `/api/client/show-all-clients/${page}` : `/api/client/show/${page}/${search}`;

  try {
    const response = await axiosServices.post(url, { key: localStorage.getItem('apiKey') });

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
