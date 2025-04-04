import axiosServices from './../utils/axios';


/**
 * Obtiene la lista de clientes paginados.
 * @param {number} page - Número de página.
 * @param {string} search - Filtro de búsqueda opcional.
 * @returns {Object} { data, columns, page, totalPages, error, success }
 */
export const getClients = async (page = 1, search = '') => {
  const url = search.length === 0 ? `/api/client/show/${page}` : `/api/client/show/${page}/${search}`;

  try {
    const response = await axiosServices.post(url);

    if (!response.data.status) {
      console.log(response.data.message);
      return null;
    }

    const { data } = response.data;

    return {
      data: data.data,
      columns: Object.keys(data.data[0] || {}),
      page: data.page,
      totalPages: data.total_pages
    };
  } catch (error) {
    console.log('Error en el servidor', error);
    return null;
  }
};
