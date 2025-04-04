import React, { createContext, useEffect, useReducer } from 'react';
import { LOGIN, LOGOUT } from 'contexts/auth-reducer/actions';
import authReducer from 'contexts/auth-reducer/auth';
import axios from 'utils/axios';
import Loader from 'components/Loader';
const AuthContext = createContext(null);

const setSession = (accessToken, apiKey) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('apiKey', apiKey);

    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('apiKey', apiKey);
    delete axios.defaults.headers.common.Authorization;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    isLoggedIn: false,
    isInitialized: false,
    user: null
  });

  useEffect(() => {
    const init = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
          setSession(accessToken);

          // * AQUI DEBE DE IR UNA API QUE RECIBA EL TOKEN Y CORROBORE QUE ESTE CON SESION ACTIVA PARA REGRSAR SU INFORMACION Y MOSTARLA
          // const response = await axios.get('account/me');
          // dispatch({ type: LOGIN, payload: { isLoggedIn: true, user: response.data.user } });
          dispatch({
            type: LOGIN,
            payload: { isLoggedIn: true, user: { name: 'CRISTIAN SORIA', email: 'cristiansora2009@gmail.com', phone: '3531682550' } }
          });
        } else {
          dispatch({ type: LOGOUT });
        }
      } catch (err) {
        console.error('Error en la autenticación:', err);
        dispatch({ type: LOGOUT });
      }
    };
    init();
  }, []);

  const login = async (email, password, remember_me = false) => {
    try {
      const response = await axios.post('/api/auth/login', { email, password, remember_me });
      const { access_token: accessToken, api_key: apiKey, ...userData } = response.data;
      setSession(accessToken, apiKey);
      dispatch({ type: LOGIN, payload: { isLoggedIn: true, userData } });
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      throw error;
      s;
    }
  };

  const register = async (name, legal_name, email, country_code, phone, password, repeatPassword) => {
    try {
      const response = await axios.post('api/register-basic-data', {
        name,
        legal_name,
        email,
        country_code,
        phone,
        password,
        repeatPassword
      });
      const { access_token: accessToken, api_key: apiKey, ...userData } = response.data;
      setSession(accessToken, apiKey);
      dispatch({ type: LOGIN, payload: { isLoggedIn: true, userData } });
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await axios.post('logout');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
    setSession(null);
    dispatch({ type: LOGOUT });
  };

  if (!state.isInitialized) {
    return <Loader />;
  }

  return <AuthContext.Provider value={{ ...state, login, logout, register }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
