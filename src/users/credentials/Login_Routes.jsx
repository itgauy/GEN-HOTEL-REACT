import React from 'react'
import { Route } from 'react-router-dom';
import StaySuite_Login_Layout from './Login_Layout';
import StaySuite_Login from './pages/Login';

const LoginRoutes = () => [
    <Route path="/login" element={<StaySuite_Login_Layout />}>
        <Route index element={<StaySuite_Login />} />
    </Route>
]

export default LoginRoutes;