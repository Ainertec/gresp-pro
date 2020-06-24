import React from 'react';
import { AppLoading } from 'expo';

import { useAuth } from '../contexts/auth';

import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';

const Routes = () => {
  const { loading, signed } = useAuth();

  if (loading) {
    return <AppLoading />;
  }

  return signed ? <AppRoutes /> : <AuthRoutes />;
  // return  <AppRoutes /> ;
};

export default Routes;
