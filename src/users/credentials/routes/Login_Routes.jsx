import React from 'react';
import { Route, Outlet } from 'react-router-dom';
import StaySuite_Login from '../pages/Login';
import { Navigate } from '../pages/Navigate';
import { CheckAuth, RegisterAuth } from '@/lib/Auth';
import Hotel_Registration from '../pages/LastRegister';
import SignUp from '../pages/Register';
import OtpVerificationPage from '../pages/RegisterOTP';

const AuthRoutes = () => [
  <Route path="/auth/login" element={<Outlet />}>
    <Route index element={<StaySuite_Login />} />
    <Route path="/auth/login/manager-check" element={<CheckAuth><Navigate /></CheckAuth>} />
    <Route path="/auth/login/register" element={<CheckAuth><SignUp /></CheckAuth>} />
    <Route path="/auth/login/register/verify" element={<RegisterAuth><OtpVerificationPage /></RegisterAuth>} />
    <Route path="/auth/login/registration" element={<RegisterAuth><Hotel_Registration /></RegisterAuth>} />
  </Route>
];

export default AuthRoutes;