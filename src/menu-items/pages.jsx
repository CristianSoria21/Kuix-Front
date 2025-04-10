// assets
import { Profile2User, Home3, MenuBoard, Buildings2 } from 'iconsax-react';

// icons
const icons = {
  clients: Profile2User,
  dashboard: Home3,
  products: MenuBoard,
  companies: Buildings2
};

// ==============================|| MENU ITEMS - PAGES ||============================== //

const pages = {
  id: 'group-pages',
  title: 'pages',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      icon: icons.dashboard,
      url: '/dashboard',
      breadcrumbs: false
    },
    {
      id: 'companies',
      title: 'Compañias',
      type: 'item',
      icon: icons.companies,
      url: '/companies'
    },
    {
      id: 'clients',
      title: 'Clientes',
      type: 'item',
      icon: icons.clients,
      url: '/clients'
    },
    {
      id: 'products',
      title: 'Productos y Servicios',
      type: 'item',
      icon: icons.products,
      url: '/products'
    }
  ]
};

export default pages;
