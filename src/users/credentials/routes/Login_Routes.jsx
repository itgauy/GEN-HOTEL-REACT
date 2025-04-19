import React from 'react';
import { Route, Outlet } from 'react-router-dom';
import StaySuite_Login from '../pages/Login';
import { Navigate } from '../pages/Navigate';
import { CheckAuth } from '@/lib/Auth';
import Hotel_Registration from '../pages/LastRegister';
import SignUp from '../pages/Register';
import OtpVerificationPage from '../pages/RegisterOTP';

const AuthRoutes = () => [
  <Route path="/auth/login" element={<Outlet />}>
    <Route index element={<StaySuite_Login />} />
    <Route path="/auth/login/manager-check" element={<CheckAuth><Navigate /></CheckAuth>} />
    <Route path="/auth/login/register" element={<CheckAuth><SignUp /></CheckAuth>} />
    <Route path="/auth/login/register/verify" element={<CheckAuth><OtpVerificationPage /></CheckAuth>} />
    <Route path="/auth/login/registration" element={<CheckAuth><Hotel_Registration /></CheckAuth>} />
  </Route>
];

export default AuthRoutes;