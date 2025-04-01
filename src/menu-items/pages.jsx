// assets
import { Book1, I24Support, Security, MessageProgramming } from 'iconsax-react';

// icons
const icons = {
  page: Book1,
  authentication: Security,
  maintenance: MessageProgramming,
  contactus: I24Support
};

// ==============================|| MENU ITEMS - PAGES ||============================== //

const pages = {
  id: 'group-pages',
  title: 'pages',
  type: 'group',
  children: [
    {
      id: 'authentication',
      title: 'authentication',
      type: 'collapse',
      icon: icons.authentication,
      children: [
        {
          id: 'login',
          title: 'login',
          type: 'item',
          url: '/auth/login',
          target: true
        },
        {
          id: 'register',
          title: 'register',
          type: 'item',
          url: '/auth/register',
          target: true
        },
        {
          id: 'forgot-password',
          title: 'forgot-password',
          type: 'item',
          url: '/auth/forgot-password',
          target: true
        },
        {
          id: 'reset-password',
          title: 'reset-password',
          type: 'item',
          url: '/auth/reset-password',
          target: true
        },
        {
          id: 'check-mail',
          title: 'check-mail',
          type: 'item',
          url: '/auth/check-mail',
          target: true
        },
        {
          id: 'code-verification',
          title: 'code-verification',
          type: 'item',
          url: '/auth/code-verification',
          target: true
        }
      ]
    },
    {
      id: 'maintenance',
      title: 'maintenance',
      type: 'collapse',
      icon: icons.maintenance,
      children: [
        {
          id: 'error-404',
          title: 'error-404',
          type: 'item',
          url: '/maintenance/404',
          target: true
        },
        {
          id: 'error-500',
          title: 'error-500',
          type: 'item',
          url: '/maintenance/500',
          target: true
        },
        {
          id: 'coming-soon',
          title: 'coming-soon',
          type: 'item',
          url: '/maintenance/coming-soon',
          target: true
        },
        {
          id: 'coming-soon-2',
          title: 'coming-soon-2',
          type: 'item',
          url: '/maintenance/coming-soon-2',
          target: true
        },
        {
          id: 'under-construction',
          title: 'under-construction',
          type: 'item',
          url: '/maintenance/under-construction',
          target: true
        }
      ]
    },
    {
      id: 'contact-us',
      title: 'contact-us',
      type: 'item',
      url: '/contact-us',
      icon: icons.contactus,
      target: true
    }
  ]
};

export default pages;
