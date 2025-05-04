import React from 'react';
import { Route, Outlet } from 'react-router-dom';
import StaySuite_Login from '../pages/Login';
import { Navigate } from '../pages/Navigate';
import { CheckAuth, RegisterAuth } from '@/lib/Auth';
import Hotel_Registration from '../pages/LastRegister';
import SignUp from '../pages/Register';
import OtpVerificationPage from '../pages/RegisterOTP';

const AuthRoutes = () => (
  <Route path="/auth/login" element={<Outlet />}>
    <Route index element={<CheckAuth><StaySuite_Login /></CheckAuth>} />
    <Route path="manager-check" element={<CheckAuth><Navigate /></CheckAuth>} />
    <Route path="register" element={<CheckAuth><SignUp /></CheckAuth>} />
    <Route path="register/verify" element={<RegisterAuth><OtpVerificationPage /></RegisterAuth>} />
    <Route path="registration" element={<RegisterAuth><Hotel_Registration /></RegisterAuth>} />
  </Route>
);

export default AuthRoutes;