import React, { createContext, useEffect, useReducer } from 'react';
import { LOGIN, LOGOUT } from 'contexts/auth-reducer/actions';
import authReducer from 'contexts/auth-reducer/auth';
import axios from 'utils/axios';
import { fetcher } from 'utils/axios';
import useSWR from 'swr';
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
  const { data, error, isLoading } = useSWR('/api/me', fetcher, {
    revalidateOnFocus: false,
    refreshInterval: 0
  });
  const [state, dispatch] = useReducer(authReducer, {
    isLoggedIn: false,
    isInitialized: false,
    user: null
  });

  useEffect(() => {
    if (data) {
      dispatch({ type: LOGIN, payload: { user: data } });
    } else if (error) {
      dispatch({ type: LOGOUT });
    }
  }, [data, error]);

  const login = async (email, password, remember_me = false) => {
    try {
      const response = await axios.post('/api/auth/login', { email, password, remember_me });
      const { access_token: accessToken, api_key: apiKey, ...userData } = response.data;
      setSession(accessToken, apiKey);
      dispatch({ type: LOGIN, payload: { isLoggedIn: true, userData } });
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      throw error;
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
