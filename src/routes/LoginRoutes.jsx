import { lazy } from 'react';

// project-imports
import AuthLayout from 'layout/Auth';
import Loadable from 'components/Loadable';

// render - login
const AuthLogin = Loadable(lazy(() => import('pages/auth/login')));
const AuthRegister = Loadable(lazy(() => import('pages/auth/register')));
const AuthForgotPassword = Loadable(lazy(() => import('pages/auth/forgot-password')));
const AuthResetPassword = Loadable(lazy(() => import('pages/auth/reset-password')));
const AuthCheckMail = Loadable(lazy(() => import('pages/auth/check-mail')));
const AuthCodeVerification = Loadable(lazy(() => import('pages/auth/code-verification')));

// ==============================|| AUTH ROUTES ||============================== //

const LoginRoutes = {
  path: '/auth',
  element: <AuthLayout />,
  children: [
    {
      path: 'login',
      element: <AuthLogin />
    },
    {
      path: 'register',
      element: <AuthRegister />
    },
    {
      path: 'forgot-password',
      element: <AuthForgotPassword />
    },
    {
      path: 'reset-password',
      element: <AuthResetPassword />
    },
    {
      path: 'check-mail',
      element: <AuthCheckMail />
    },
    {
      path: 'code-verification',
      element: <AuthCodeVerification />
    }
  ]
};

export default LoginRoutes;
